let io;
module.exports = {
  init: (httpServer, options) => {
    io = require("socket.io")(httpServer, options);
    return io;
  },
  getIO: () => {
    if (io) {
      throw new error("Socket.io not initialized");
    }

    return io;
  },
};
