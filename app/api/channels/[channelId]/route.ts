import { NextResponse } from "next/server";

import { currentProfile } from "@/utils/currentProfile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

// update
export async function PATCH(
    req: Request,
    { params }: { params: { channelId: string }}
) {
    try {
        
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const { name, type } = await req.json();

        const serverId = searchParams.get("serverId");

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        };

        if(!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if(!params.channelId) {
            return new NextResponse("Channel ID Missing", { status: 400 });
        }

        if (name === "general") {
            return new NextResponse("Name can't be 'general'", { status: 400 });
        }

        //delete channel
         const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id: params.channelId,
                            NOT: {
                                name: "general",
                            }
                        },
                        data: {
                            name,
                            type,
                        }
                    }
                }
            }
         });

         return NextResponse.json(server);

    } catch (error) {
        console.log("CHANNEL_UPDATE", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function DELETE(
    req: Request,
    { params }: { params: { channelId: string }}
) {
    try {
        
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        };

        if(!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if(!params.channelId) {
            return new NextResponse("Channel ID Missing", { status: 400 });
        }

        //delete channel
         const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general"
                        }
                    }
                }
            }
         });

         return NextResponse.json(server);

    } catch (error) {
        console.log("CHANNEL_DELETE", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}