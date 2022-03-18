import { io } from "socket.io-client";

export default {
      install: (app) => {
            const socket = io("http://localhost:3000", {
                  // withCredentials: true,
                  autoConnect: false,
                  auth: {},
                  path: "/",
            });

            app.config.globalProperties.$socket = socket;

            app.provide("socket", socket);
      },
};
