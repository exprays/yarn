"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/actions/actionTooltip";

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

export const NavigationItem = ({
    id, imageUrl, name
}: NavigationItemProps) => {

    const params = useParams();
    const router = useRouter();

    return (
        <ActionTooltip side="right" align="center" label={name}>
            <button
                onClick={() => {}}
                className="group relative flex items-center"
            >
                {/**dynamic button checking for if inside the server or not */}

                <div className={cn(
                    "absoluteleft-0 bg-primary rounded-r-ful; transition-all w-[4px]",
                    params?.serverId !== id && "group-hover:h-[20px]",
                    params?.serverId === id ? "h-[36px]" : "h-[8px]"
                )} />
                <div className={cn(
                    "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                    params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
                )}>
                    <Image fill src={imageUrl} alt="channel"/>
                </div>
            </button>
        </ActionTooltip>
    )
}