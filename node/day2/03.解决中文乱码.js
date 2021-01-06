const http = require('http')
// 创建服务器实例对象
const server = http.createServer()

server.on('request',(req,res)=>{
    const str = `您请求的 URL 地址是${req.url}，请求的 method 类型为${req.method}`
    // 解决了中文乱码、不能完全解析 HTML 标签
    // res.setHeader 必须写到 res.end 之前
    // 服务端设置的响应头中的内容类型和内容编码
    res.setHeader('Content-Type', 'text/html; charset=utf8')
    res.end(str)
})
// 启动服务器
server.listen(80,()=>{
    console.log('sever running at http://127.0.0.1');
})