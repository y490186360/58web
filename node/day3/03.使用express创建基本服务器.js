const express = require('express')
// 创建服务器
const app = express()
// 监听请求
app.get('/',(req,res)=>{
    res.send({
        name:'yuki',
        age:18
    })
})

app.get('/html', (req, res) => {
    res.send('<h1>h</h1>')
})

app.post('/',(req,res)=>{
    res.send('POST请求成功')
})
// 开启服务器
app.listen(3000,()=>{console.log('Server running on http://localhost:3000');})
