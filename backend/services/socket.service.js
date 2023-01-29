//? Services
const logger = require('./logger.service')
//? Global Variables
var gIo = null

module.exports = {
  // set up the sockets service and define the API
  setupSocketAPI,
  // emit to everyone / everyone in a specific room (label)
  emitTo,
  // emit to a specific board (if currently active in system)
  emitToBoard,
  // Send to all sockets BUT not the current socket - if found
  // (otherwise broadcast to a room / to all)
  broadcast,
}

function setupSocketAPI(http) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
  })
  gIo.on('connection', (socket) => {
    logger.info(`New connected socket [id: ${socket.id}]`)
    socket.on('disconnect', (socket) => {
      logger.info(`Socket disconnected [id: ${socket.id}]`)
    })
    socket.on('chat-set-topic', (topic) => {
      if (socket.myTopic === topic) return
      if (socket.myTopic) {
        socket.leave(socket.myTopic)
        logger.info(
          `Socket is leaving topic ${socket.myTopic} [id: ${socket.id}]`
        )
      }
      socket.join(topic)
      socket.myTopic = topic
    })
    socket.on('chat-send-msg', (msg) => {
      logger.info(
        `New chat msg from socket [id: ${socket.id}], emitting to topic ${socket.myTopic}`
      )
      // emits to all sockets:
      // gIo.emit('chat addMsg', msg)
      // emits only to sockets in the same room
      gIo.to(socket.myTopic).emit('chat-add-msg', msg)
    })
    socket.on('board-watch', (boardId) => {
      logger.info(
        `board-watch from socket [id: ${socket.id}], on board ${boardId}`
      )
      socket.join('watching:' + boardId)
    })
    socket.on('set-board-socket', (boardId) => {
      logger.info(
        `Setting socket.boardId = ${boardId} for socket [id: ${socket.id}]`
      )
      socket.boardId = boardId
    })
    socket.on('unset-board-socket', () => {
      logger.info(`Removing socket.boardId for socket [id: ${socket.id}]`)
      delete socket.boardId
    })
      socket.on('board-updated', (board) => {
      console.log('Server got board: ' + board)
      })

  })
}

function emitTo({ type, data, label }) {
  if (label) gIo.to('watching:' + label.toString()).emit(type, data)
  else gIo.emit(type, data)
}

async function emitToBoard({ type, data, boardId }) {
  boardId = boardId.toString()
  const socket = await _getBoardSocket(boardId)

  if (socket) {
    logger.info(
      `Emiting event: ${type} to board: ${boardId} socket [id: ${socket.id}]`
    )
    socket.emit(type, data)
  } else {
    logger.info(`No active socket for board: ${boardId}`)
    // _printSockets()
  }
}

// If possible, send to all sockets BUT not the current socket
// Optionally, broadcast to a room / to all
async function broadcast({ type, data, room = null, boardId }) {
  boardId = boardId.toString()

  logger.info(`Broadcasting event: ${type}`)
  const excludedSocket = await _getBoardSocket(boardId)
  if (room && excludedSocket) {
    logger.info(`Broadcast to room ${room} excluding board: ${boardId}`)
    excludedSocket.broadcast.to(room).emit(type, data)
  } else if (excludedSocket) {
    logger.info(`Broadcast to all excluding board: ${boardId}`)
    excludedSocket.broadcast.emit(type, data)
  } else if (room) {
    logger.info(`Emit to room: ${room}`)
    gIo.to(room).emit(type, data)
  } else {
    logger.info(`Emit to all`)
    gIo.emit(type, data)
  }
}

async function _getBoardSocket(boardId) {
  const sockets = await _getAllSockets()
  const socket = sockets.find((s) => s.boardId === boardId)
  return socket
}
async function _getAllSockets() {
  // return all Socket instances
  const sockets = await gIo.fetchSockets()
  return sockets
}

async function _printSockets() {
  const sockets = await _getAllSockets()
  console.log(`Sockets: (count: ${sockets.length}):`)
  sockets.forEach(_printSocket)
}
function _printSocket(socket) {
  console.log(`Socket - socketId: ${socket.id} boardId: ${socket.boardId}`)
}
