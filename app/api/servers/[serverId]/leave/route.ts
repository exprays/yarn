import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string }}
) {
    try {
        
        const profile = await currentProfile();

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: {
                    not: profile.id, // Leaving entity shouldn't be admin
                },
                members: {
                    some: {
                        profileId: profile.id, // check in members
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id, // delete the profile
                    }
                }
            }
        });

        return NextResponse.json(server);

    } catch (error) {
        console.log("SERVER_LEAVE_PATCH", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}