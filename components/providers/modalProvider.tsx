"use client";

import { useEffect, useState } from "react";

import { CreateServerModal } from "@/components/modules/createServerModal";
import { InviteModal } from "@/components/modules/inviteModal";
import { ServerSettingsModal } from "@/components/modules/serverSettingsModal";
import { MembersModal } from "@/components/modules/membersModal";
import { CreateChannelModal } from "@/components/modules/createChannelModal";
import { LeaveServerModal } from "@/components/modules/leaveServerModal";
import { DeleteServerModal } from "@/components/modules/deleteServerModal";
import { DeleteChannelModal } from "@/components/modules/deleteChannelModal";
import { EditChannelModal } from "@/components/modules/editChannelModal";

export const ModalProvider = () => {

    //prevents server side rendering of modals
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <ServerSettingsModal />
            <MembersModal />
            <CreateChannelModal />
            <LeaveServerModal />
            <DeleteServerModal />
            <DeleteChannelModal />
            <EditChannelModal />
        </>
    )
}