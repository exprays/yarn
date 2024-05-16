import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";

import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ServerSidebarProps {
    serverId: string;
}

export const ServerSidebar = async ({
    serverId
}: ServerSidebarProps) => {

    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    };

    // fetch server
    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                }
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                }
            }
        }
    });

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);

    const members = server?.members.filter((member) => member.profileId !== profile.id);

    if (!server) {
        return redirect("/");
    }

    // find users role
    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            Server sidebar
        </div>
    )
}