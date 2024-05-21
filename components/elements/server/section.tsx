"use client";

import { ActionTooltip } from "@/components/actions/actionTooltip";
import { ServerTypes } from "@/types/serverTypes";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus } from "lucide-react";

interface ServerSectionProps {
    label: string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: ChannelType;
    server?: ServerTypes;
}

export const ServerSection = ({
    label,
    role,
    sectionType,
    channelType,
    server
}: ServerSectionProps) => {
    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionTooltip label="Create Channel" side="top">
                    <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                        <Plus className="h-4 w-4"/>
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}