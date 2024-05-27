// conversation v1.0

import { db } from "@/lib/db";

export const fetchXcreateConversation = async (memberAlphaId: string, memberBetaId: string) => {
    // find existing conversations
    
    let conversation = await findConversation(memberAlphaId, memberBetaId) || await findConversation(memberBetaId, memberAlphaId);

    if(!conversation) {
        conversation = await createNewConversation(memberAlphaId, memberBetaId);
    }

    return conversation;
}

const findConversation = async (memberAlphaId: string, memberBetaId: string) => {
    try {
        return await db.conversation.findFirst({
            where: {
                AND: [
                    {memberAlphaId: memberAlphaId},
                    {memberBetaId: memberBetaId}
                ]
            },
            include: {
                memberAlpha: {
                    include: {
                        profile: true,
                    }
                },
                memberBeta: {
                    include: {
                        profile: true,
                    }
                }
            }
        });
    } catch {
        return null;
    }
}

const createNewConversation = async (memberAlphaId: string, memberBetaId: string) => {
    try {
        return await db.conversation.create({
            data: {
                memberAlphaId,
                memberBetaId,
            },
            include: {
                memberAlpha: {
                    include: {
                        profile: true,
                    }
                },
                memberBeta: {
                    include: {
                        profile: true,
                    }
                }
            }
        })
    } catch {
        return null;
    }
}