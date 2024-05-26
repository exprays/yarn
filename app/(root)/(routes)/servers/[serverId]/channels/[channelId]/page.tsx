import ChatHeader from "@/components/chat/header";
import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}


const ChannelIdPage = async ({
    params
}: ChannelIdPageProps) => {

    const profile = await currentProfile();

    if(!profile) {
        return redirectToSignIn();
    }

    //fetch respective channel
    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId
        }
    });

    //find the members in the server
    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id
        }
    });

    if(!channel || !member) {
        redirect("/");
    }

    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
        </div>
     );
}
 
export default ChannelIdPage;