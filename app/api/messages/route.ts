import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";

const BATCH_MESSAGES = 10; //how many messages to fetch in batches

export async function GET(req: Request) {
    try {
        
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        //destincts when to load next batch of messages in infinite loading
        const cursor = searchParams.get("cursor"); 
        const channelId = searchParams.get("channelId");

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        };

        if(!channelId) {
            return new NextResponse("Channel ID missing", { status: 400 });
        }

        //fetch
        let messages: Message[] = [];

        if(cursor) {
            messages = await db.message.findMany({
                take: BATCH_MESSAGES,
                skip: 1, //avoid repeat
                cursor: {
                    id: cursor,
                },
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        } else {
            messages = await db.message.findMany({
                take: BATCH_MESSAGES,
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
        }

        let nextCursor = null;

        if(messages.length === BATCH_MESSAGES) {
            nextCursor = messages[BATCH_MESSAGES - 1].id;
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        })

    } catch (error) {
        console.log("MESSAGES_GET_ERROR", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}