//Messages with members and profile

import { Member, Message, Profile } from "@prisma/client";

export type MessageTypes = Message & {
    member: Member & {
        profile: Profile
    }
}