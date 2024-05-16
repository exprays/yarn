import { Server, Member, Profile } from "@prisma/client";

export type ServerTypes = Server & {
    members: (Member & { profile: Profile })[];
}