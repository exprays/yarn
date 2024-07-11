"use client";

import { ActionTooltip } from "@/components/actions/actionTooltip";
import { useModal } from "@/hooks/useModalStore";
import { Plus } from "lucide-react";

export const NavigationAction = () => {

    const { onOpen } = useModal();

    return (
        <div>
            <ActionTooltip side="right" align="center" label="Add a server">
                <button className="group flex items-center" onClick={() => onOpen("createServer")}>
                    <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-indigo-500">
                        <Plus className="group-hover:text-white transition text-indigo-500" size={25}/>
                    </div>
                </button>
            </ActionTooltip>
        </div>
    )
}