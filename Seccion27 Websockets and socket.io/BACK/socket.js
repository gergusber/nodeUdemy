let io;
let options = {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
};
module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });
    return io;
  },
  getIO: () => {
    if (io) {
      throw new error("Socket.io not initialized");
    }

    return io;
  },
};
