import ChatHeader from "@/components/chat/header";
import { fetchXcreateConversation } from "@/lib/conversation";
import { db } from "@/lib/db";
import { currentProfile } from "@/utils/currentProfile";

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: {
        memberId: string;
        serverId: string;
    }
}

const MemberIdPage = async ({
    params
}: MemberIdPageProps) => {

    const profile = await currentProfile();

    if(!profile) {
        redirectToSignIn();
    }

    const currentMember = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile?.id
        },
        include: {
            profile: true,
        }
    });

    if(!currentMember) {
        return redirect("/");
    }

    const conversation = await fetchXcreateConversation(currentMember.id, params.memberId);

    if(!conversation) {
        return redirect(`/servers/${params.serverId}`);
    }

    const { memberAlpha, memberBeta } = conversation;

    //compare
    const otherMember = memberAlpha.profileId === profile?.id ? memberBeta: memberAlpha;

    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
                name={otherMember.profile.name}
                serverId={params.serverId}
                imageUrl={otherMember.profile.imageUrl}
                type="conversation"
            />
        </div>
     );
}
 
export default MemberIdPage;