import { db } from "@/lib/db";
import { NextApiResponseXServerIo } from "@/types/responseTypes";
import { currentProfileForPages } from "@/utils/currentProfileForPages";
import { NextApiRequest } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseXServerIo,
) {
    if(req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed!"
        });
    }

    try {
        
        const profile = await currentProfileForPages(req);
        const { content, fileUrl } = req.body;
        const { conversationId } = req.query;

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

        //message
        const message = await db.directMessage.create({
            data: {
                content,
                fileUrl,
                conversationId: conversationId as string,
                memberId: member.id,
            },
            include: {
                member: {
                    include: {
                        profile: true
                    }
                }
            }
        });

        //channelkey 1.0
        //emit socketIO to all active connections
        const channelKey = `chat:${conversationId}:messages`;

        res?.socket?.server?.io?.emit(channelKey, message);

        return res.status(200).json(message);


    } catch (error) {
        console.log("DIRECT_MESSAGES_POST_PAGES", error);
        return res.status(500).json({
            message: "Internal Error"
        });
    }
}