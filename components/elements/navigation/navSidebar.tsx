import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile"

import { redirect } from "next/navigation";
import { NavigationAction } from "./navAction";

export const NavigationSidebar = async () => {

    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }

    // find server
    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });


    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
            <NavigationAction />
        </div>
    )
}