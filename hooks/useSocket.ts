import { SocketContext } from "@/components/providers/socketProvider"
import { useContext } from "react"

export const useSocket = () => {
    return useContext(SocketContext);
}