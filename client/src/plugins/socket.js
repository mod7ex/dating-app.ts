import { io } from "socket.io-client";

export default {
      install: (app) => {
            const socket = io("http://localhost:3000", {
                  // withCredentials: true,
                  autoConnect: false,
            });

            app.config.globalProperties.$socket = socket;

            app.provide("socket", socket);
      },
};
