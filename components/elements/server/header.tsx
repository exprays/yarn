"use client";

import { ServerTypes } from "@/types/serverTypes";
import { MemberRole } from "@prisma/client";

interface ServerHeaderProps {
    server: ServerTypes;
    role?: MemberRole;
}

export const ServerHeader = ({
    server, role
}: ServerHeaderProps) => {
    return (
        <div>
            Server Header
        </div>
    )
}