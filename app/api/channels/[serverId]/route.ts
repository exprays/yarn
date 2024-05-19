import { currentProfile } from "@/utils/currentProfile";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        
        const profile = await currentProfile();
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");

        if(!profile) {
                return new NextResponse("Unauthorized", { status: 401 });
        };

        if(!serverId) {
                return new NextResponse("Server ID missing", { status: 400 });
        }

        if (name === "general") {
            return new NextResponse("Name can't be 'general'", { status: 400 });
        }

    } catch (error) {
        console.log("CHANNELS_POST_ERROR", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}