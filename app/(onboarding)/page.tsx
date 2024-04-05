import { db } from "@/lib/db";
import { initProfile } from "@/utils/initProfile";
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
    const profile = await initProfile();

    const server =  await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return ( 
        <div>
            Create a Server
        </div>
     );
}
 
export default OnboardingPage;