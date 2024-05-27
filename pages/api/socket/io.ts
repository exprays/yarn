import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { NextApiRequest } from "next";

import { NextApiResponseXServerIo } from "@/types/responseTypes";

export const config = {
    api: {
        bodyParser: false,
    }
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseXServerIo) => {
    if(!res.socket.server.io) {
        const path = "/api/socket/io";
        const httpServer: NetServer = res.socket.server as any;

        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false
        });

        res.socket.server.io = io;
    }
    res.end();
}

export default ioHandler;