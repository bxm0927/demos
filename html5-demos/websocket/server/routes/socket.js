const WebSocket = require('ws')

const socketRouter = (req, res, next) => {
  const WebSocketServer = new WebSocket.Server({
    port: '8080',
    path: '/WebSocket/test',
  })

  WebSocketServer.on('connection', (socket, request) => {
    console.info('WebSocket 连接已建立.')

    // 心跳
    setInterval(() => socket.send('heartbeat'), 1000)

    // 每 3s 更新一次
    setInterval(() => {
      const sendData = JSON.stringify({ date: new Date() })
      socket.send(sendData)
    }, 3000)

    socket.on('message', (data) => {
      console.log('WebSocket 收到来自客户端的数据: ', JSON.parse(data))
    })

    socket.on('error', (e) => {
      console.info('WebSocket 连接发生错误', e)
    })

    socket.on('close', (e) => {
      console.log('WebSocket 连接已关闭.', e)
    })
  })
}

module.exports = socketRouter
