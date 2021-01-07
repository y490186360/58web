// 导入模块
const fs = require('fs')
const path = require('path')
const http = require('http')
// 创建web服务器
const server = http.createServer()
// 监听客户端请求事件
server.on('request', (req, res) => {
    const url = req.url
    let fpath = ''

    // 优化请求路径
    if (url === '/') {
        fpath = path.join(__dirname, 'col', 'red.html')
    } else {
        fpath = path.join(__dirname, 'col', url)
    }
    // 读取路径并响应给客户端
    fs.readFile(fpath, 'utf8', (err, dataStr) => {
        if (err) return res.end('404 Not found!')
        res.end(dataStr)
    })
})
// 启动服务器
server.listen(80, () => {
    console.log('Server running on http://127.0.0.1')
})
