var express = require('express')
var router = express.Router()

/* GET sse listing. */
router.get('/test', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000')
  res.header('Access-Control-Allow-Headers', 'X-Requestd-With')
  res.header('Access-Control-Allow-Method', 'PUT, POST, GET, DELETE, OPTIONS')

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.write('retry: 5000\n') // 每 5s 推送一次更新
  res.end('data: The server time is' + new Date() + '\n\n')
})

module.exports = router
