let socketServer = null
module.exports = function (server) {
  if (socketServer) {
    return socketServer
  }
  socketServer = require('socket.io')(server, {
    cors: {
      origin: true,
      credentials: true,
    },
  })
  return socketServer
}
