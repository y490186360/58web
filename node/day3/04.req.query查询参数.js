// 引入 express
const express = require('express');

// 创建服务器对象
const app = express();

// TODO:
app.get('/',(req,res)=>{
    console.log(req.query)
    res.send(req.query)
})

// 监听端口
app.listen(3000, () => console.log('Server running on http://localhost:3000'));