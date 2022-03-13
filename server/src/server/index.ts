import { createServer } from "http";
import express from "express";
import { Server, Socket } from "socket.io";
import { CLIENT } from "../config/config";

import { verifyAccessToken, getUserRefreshToken } from "../services/auth";
import { UnauthorizedError, ForbiddenError } from "../errors";

export const app = express();

export const httpServer = createServer(app);

export const io = new Server(httpServer, {
      cors: {
            origin: [`http://${CLIENT.hostname}:${CLIENT.port}`],
            credentials: true,
      },
});

io.use(async (socket: Socket, next) => {
      console.log(socket.handshake);

      let { accessToken } = socket.handshake.auth as {
            [key: string]: string | null | undefined;
      };

      if (!accessToken) return next(new UnauthorizedError("Unauthenticated"));

      let { decoded, expired } = verifyAccessToken(accessToken);

      if (!decoded) return next(new ForbiddenError());

      let refreshToken = await getUserRefreshToken(decoded._id.toString());

      // check if refresh token is still valide
      if (!refreshToken) return next(new UnauthorizedError("Unauthenticated"));

      // if (expired) throw new ForbiddenError(); // refresh it
      if (expired) return next(new UnauthorizedError("Unauthenticated"));

      // it would be better to put decoded in req, work on request
      socket.request = { _id: decoded._id, username: decoded.username };
      next();
});
