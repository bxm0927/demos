// Web Workers
// 注意: Web Workers 通常不用于如此简单的脚本，而是用于更耗费 CPU 资源的任务。

var i = 0
setInterval(() => {
  // 向页面回传数据
  postMessage({
    count: ++i,
  })
}, 1000)

this.onmessage = (event) => {
  console.log('event: ', event)
  this.postMessage('You said: ' + event.data)
}

// console.log(window); // Uncaught ReferenceError: window is not defined
// console.log(document) // Uncaught ReferenceError: document is not defined
