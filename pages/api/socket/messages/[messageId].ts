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
        const { messageId, serverId, channelId } = req.query;
        const { content } = req.body;

        if(!profile) {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }

        if (!messageId || !serverId || !channelId || (req.method === "PATCH" && !content)) {
            console.log("Missing parameters", { messageId, serverId, channelId, content });
            return res.status(400).json({ error: "Missing required parameters" });
        }

        if(!serverId) {
            return res.status(400).json({
                error: "Server ID missing"
            });
        }

        if(!channelId) {
            return res.status(400).json({
                error: "Channel ID missing"
            });
        }

        if(!content) {
            return res.status(400).json({
                error: "Content missing"
            });
        }

        //retrieve server
        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile.id,
                    }
                }
            },
            include: {
                members: true,
            }
        });

        if(!server) {
            return res.status(404).json({
                message: "Server not found"
            });
        }

        //retreive channel
        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string,
            }
        });

        if(!channel) {
            return res.status(404).json({
                message: "Channel not found"
            });
        }

        const member = server.members.find((member) => member.profileId === profile.id);

        if(!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        let message = await db.message.findFirst({
            where: {
                id: messageId as string,
                channelId: channelId as string,
            },
            include: {
                member: {
                    include: {
                        profile: true,
                    }
                }
            }
        });

        if(!message || message.deleted) {
            return res.status(404).json({
                message: "Message not found"
            });
        };

        const isMessageOwner = message.memberId === member.id;
        const isAdmin = member.role === MemberRole.ADMIN;
        const isModerator = member.role === MemberRole.MODERATOR;
        const canModify = isAdmin || isModerator || isMessageOwner;

        if(!canModify) {
            return res.status(401).json({
                message: "Unauthorized Action!"
            });
        };

        if(req.method === "DELETE") {
            
            message = await db.message.update({
                where: {
                    id: messageId as string,
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

            message = await db.message.update({
                where: {
                    id: messageId as string,
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

        const updateKey = `chat:${channelId}:messages:update`;

        res?.socket?.server?.io?.emit(updateKey, message);

        return res.status(200).json(message);
        
    } catch (error) {
        console.log("MESSAGE_ID_PAGES_ROUTE", error);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
    
}