import ChatHeader from "@/components/chat/header";
import { ChatInput } from "@/components/chat/input";
import { ChatMessages } from "@/components/chat/messages";
import { MediaRoom } from "@/components/media/mediaRoom";
import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
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
            {channel.type === ChannelType.TEXT && (
                <>
                    <ChatMessages 
                        member={member}
                        name={channel.name}
                        chatId={channel.id}
                        type="channel"
                        apiUrl="/api/messages"
                        socketUrl="/api/socket/messages"
                        socketQuery={{
                            channelId: channel.id,
                            serverId: channel.serverId
                        }}
                        paramKey="channelId"
                        paramValue={channel.id}
                    />
                    <ChatInput 
                        name={channel.name}
                        type="channel"
                        apiUrl="/api/socket/messages"
                        query={{
                            channelId: channel.id,
                            serverId: channel.serverId
                        }}
                    />
                </>
            )}
            {channel.type === ChannelType.AUDIO && (
                <MediaRoom 
                    chatId={channel.id}
                    video={false}
                    audio={true}
                />
            )} 
            {channel.type === ChannelType.VIDEO && (
                <MediaRoom 
                    chatId={channel.id}
                    video={true}
                    audio={true}
                />
            )} 
        </div>
     );
}
 
export default ChannelIdPage;