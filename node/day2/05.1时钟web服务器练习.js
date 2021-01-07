// 1.导入模块
const fs = require('fs')
const path = require('path')
// http专门创建服务器的模块
const http = require('http')
// 2.创建服务器
const souse = http.createServer()
// 3.给服务器绑定请求监听事件
souse.on('request', (req, res) => {
    const url = req.url
    let fpath = ''
    if (url === '/') {
        fpath = path.join(__dirname, 'col/red.html')
    } else {
        fpath = path.join(__dirname, 'col', url)
    }
    // 读取路径并返回给客户端
    fs.readFile(fpath,'utf8',(err,dataStr)=>{
        if(err) return res.end('404 Not found!')
        res.end(dataStr)
    })
})
// 4.启用客户端 (启动的端口，成功的回调函数 提示用户) 
souse.listen(80, () => console.log('Server running on http://127.0.0.1'))
