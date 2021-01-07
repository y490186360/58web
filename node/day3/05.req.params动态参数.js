// 引入 express
const express = require('express');

// 创建服务器对象
const app = express();

// TODO:
// 注意：这里的 :id 是一个动态的参数
app.get('/:ids/:usname',(req,res)=>{
    console.log(req.params)
    res.send(req.params)
})

// 监听端口
app.listen(3000, () => console.log('Server running on http://localhost:3000'));