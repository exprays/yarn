import { useEffect } from "react";
import { useQueryClient, QueryClient } from "@tanstack/react-query";
import { Member, Message, Profile } from "@prisma/client";

import { useSocket } from "@/components/providers/socketProvider";

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
}

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  }
}

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const updateQueryData = (queryClient: QueryClient, queryKey: string, message: MessageWithMemberWithProfile, isNew: boolean) => {
    queryClient.setQueryData([queryKey], (oldData: any) => {
      if (!oldData || !oldData.pages) {
        return {
          pages: [{
            items: [message],
          }],
          pageParams: [undefined],
        };
      }

      const newData = oldData.pages.map((page: any) => {
        return {
          ...page,
          items: isNew
            ? [message, ...page.items]
            : page.items.map((item: MessageWithMemberWithProfile) =>
                item.id === message.id ? message : item
              )
        };
      });

      if (isNew && newData[0] && !newData[0].items.some((item: MessageWithMemberWithProfile) => item.id === message.id)) {
        newData[0].items.unshift(message);
      }

      return {
        ...oldData,
        pages: newData,
      };
    });
  };

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (message: MessageWithMemberWithProfile) => {
      updateQueryData(queryClient, queryKey, message, false);
    };

    const handleAdd = (message: MessageWithMemberWithProfile) => {
      updateQueryData(queryClient, queryKey, message, true);
    };

    socket.on(updateKey, handleUpdate);
    socket.on(addKey, handleAdd);

    return () => {
      socket.off(updateKey, handleUpdate);
      socket.off(addKey, handleAdd);
    };
  }, [socket, queryClient, addKey, updateKey, queryKey]);
};
