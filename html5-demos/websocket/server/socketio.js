const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/socketio.html');
});

// 监听 WebSocket 连接
io.on('connection', (socket) => {
  console.log('a user connected')

  // This will emit the event to all connected sockets
  io.emit('some event', {
    someProperty: 'some value',
    otherProperty: 'other value',
  })

  socket.on('chat message', (msg) => {
    console.log('Got a message: ' + msg)
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
