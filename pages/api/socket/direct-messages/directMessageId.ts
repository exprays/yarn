// Message update and delete API route
//v1.0

import { db } from "@/lib/db";
import { NextApiResponseXServerIo } from "@/types/responseTypes";
import { currentProfileForPages } from "@/utils/currentProfileForPages";
import { MemberRole } from "@prisma/client";

import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseXServerIo) {
    if (req.method !== "DELETE" && req.method !== "PATCH") {
        return res.status(405).json({ error: "Method not allowed!" });
    }

    try {

        const profile = await currentProfileForPages(req);
        const { directMessageId, conversationId } = req.query;
        const { content } = req.body;

        if(!profile) {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }

        if(!conversationId) {
            return res.status(400).json({
                error: "Conversation ID missing"
            });
        }

        if(!content) {
            return res.status(400).json({
                error: "Content missing"
            });
        }

        const conversation = await db.conversation.findFirst({
            where: {
                id: conversationId as string,
                OR: [
                    {
                        memberAlpha: {
                            profileId: profile.id,
                        }
                    },
                    {
                        memberBeta: {
                            profileId: profile.id,
                        }
                    }
                ]
            },
            include: {
                memberAlpha: {
                    include: {
                        profile: true,
                    }
                },
                memberBeta: {
                    include: {
                        profile: true,
                    }
                }
            }
        });

        if(!conversation) {
            return res.status(404).json({
                message: "Conversation not found"
            });
        }

        const member = conversation.memberAlpha.profileId === profile.id ? conversation.memberAlpha : conversation.memberBeta; 

        if(!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        let directMessage = await db.directMessage.findFirst({
            where: {
                id: directMessageId as string,
                conversationId: conversationId as string,
            },
            include: {
                member: {
                    include: {
                        profile: true,
                    }
                }
            }
        });

        if(!directMessage || directMessage.deleted) {
            return res.status(404).json({
                message: "Message not found"
            });
        };

        const isMessageOwner = directMessage.memberId === member.id;
        const isAdmin = member.role === MemberRole.ADMIN;
        const isModerator = member.role === MemberRole.MODERATOR;
        const canModify = isAdmin || isModerator || isMessageOwner;

        if(!canModify) {
            return res.status(401).json({
                message: "Unauthorized Action!"
            });
        };

        if(req.method === "DELETE") {
            
            directMessage = await db.directMessage.update({
                where: {
                    id: directMessageId as string,
                },
                data: {
                    fileUrl: null,
                    content: "This message has been deleted.", //soft-delete
                    deleted: true,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                }
            })
        }

        if(req.method === "PATCH") {

            if(!isMessageOwner) {
                return res.status(401).json({ error: "Unauthorized!" })
            }

            directMessage = await db.directMessage.update({
                where: {
                    id: directMessageId as string,
                },
                data: {
                    content,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                }
            })
        };

        const updateKey = `chat:${conversation.id}:messages:update`;

        res?.socket?.server?.io?.emit(updateKey, directMessage);

        return res.status(200).json(directMessage);
        
    } catch (error) {
        console.log("DIRECT_MESSAGE_ID_PAGES_ROUTE", error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
    
}