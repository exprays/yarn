import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";
import { NextResponse } from "next/server";

//delete

export async function DELETE(
    req: Request,
    { params }: { params: { serverId: string }}
) {
    try {
        
        const profile = await currentProfile();

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // update server
        const server = await db.server.delete({
            where: {
                id: params.serverId,
                profileId: profile.id,
            }
        });

        return NextResponse.json(server);

    } catch (error) {
        console.log("SERVER_PATCH_DELETE", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

//patch

export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string }}
) {
    try {
        
        const profile = await currentProfile();
        const { name, imageUrl } = await req.json();

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // update server
        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id,
            },
            data: {
                name, imageUrl,
            }
        });

        return NextResponse.json(server);

    } catch (error) {
        console.log("SERVER_PATCH_EDIT", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}