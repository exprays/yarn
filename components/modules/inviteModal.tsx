"use client";    

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useModal } from "@/hooks/useModalStore";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/useOrigin";
import { useState } from "react";
import axios from "axios";

export const InviteModal = () => {

    const { onOpen, isOpen, onClose, type, data } = useModal();
    const origin = useOrigin();
    
    const isModalOpen = isOpen && type === "invite";

    const { server } = data;

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // url
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    // copy the link 
    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    //regenerate link
    const onRegenerate = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

            onOpen("invite", { server: response.data });

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center font-bold text-black text-2xl">
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server Invite Link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input disabled={isLoading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" value={inviteUrl} />
                        <Button disabled={isLoading} size="icon" onClick={onCopy}>
                            {copied ? <Check className="h-4 w-4 text-emerald-500"/> : <Copy className="w-4 h-4"/>}
                        </Button>
                    </div>
                    <Button onClick={onRegenerate} disabled={isLoading} variant="link" size="sm" className="text-xs text-zinc-500 mt-4">
                        Generate a new link
                        <RefreshCw className="w-3 h-3 ml-1"/>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
     );
};