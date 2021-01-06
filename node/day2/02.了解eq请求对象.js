// 1. 引入HTTP 模块
const http = require('http')
// 2.创建服务器实例对象
const server = http.createServer()
// 3. 监听客户端请求 绑定 request 事件
server.on('request', (req, res) => {
    // req.url 是客户端请求的 URL 地址
    const url = req.url
    // req.method 是客户端请求的 method 类型
    const method = req.method
    const str = `Your request url is ${url}, and request method is ${method}`
    console.log(str)
    // 调用 res.end() 方法，向客户端响应一些内容
    // 向客户端发送指定内容，并结束这次请求
    res.end(str)
})

server.listen(3000, () => console.log('Server running on http://127.0.0.1:3000'))
