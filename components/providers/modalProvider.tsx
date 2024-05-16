"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "../modules/createServerModal";
import { InviteModal } from "../modules/inviteModal";

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
        </>
    )
}