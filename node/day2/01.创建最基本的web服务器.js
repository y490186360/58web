// 1.引入 HTTP 模块
const http = require('http')
// 2.创建服务器对象
const server = http.createServer()
// 3.监听客户端请求
server.on('request', (request, response) => {
    // request 请求对象
    // response 响应对象
    console.log('Someone visit our web server.')
})
// 4.启动服务器
server.listen(80, () => console.log('Server running on http://127.0.0.1'))
