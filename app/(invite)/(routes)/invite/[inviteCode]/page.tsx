import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: {
        inviteCode: string
    }
};

const InviteCodePage = async ({
    params
}: InviteCodePageProps) => {

    const profile = await currentProfile();

    if(!profile) {
        return redirectToSignIn();
    }

    if(!params.inviteCode) {
        return redirect("/"); //TODO: Easteregg page
    }

    //check for user already in server
    const existingUserInServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (existingUserInServer) {
        return redirect(`/servers/${existingUserInServer.id}`);
    }

    // Join server
    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode,
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id,
                    }
                ]
            }
        }
    });

    //redirect after joining
    if(server) {
        return redirect(`/servers/${server.id}`);
    }

    return null; //TODO: joining page
}
 
export default InviteCodePage;