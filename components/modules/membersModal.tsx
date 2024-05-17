"use client";    

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useModal } from "@/hooks/useModalStore";
import { ServerTypes } from "@/types/serverTypes";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../userAvatar";
import { ShieldAlert, ShieldCheck } from "lucide-react";

//role-Icons
const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-600"/>,
    "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-600"/>
}

export const MembersModal = () => {

    const { onOpen, isOpen, onClose, type, data } = useModal();
    
    const isModalOpen = isOpen && type === "members";

    const { server } = data as { server: ServerTypes};

    return ( 
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center font-bold text-black text-2xl">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map((member) => (
                        <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={member.profile.imageUrl} />
                            <div className="flex flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center">
                                    {member.profile.name}
                                    {roleIconMap[member.role]}
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
     );
};