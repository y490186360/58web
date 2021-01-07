const express = require('express')

const app = express()

app.get('/',(req,res)=>{
    res.end('home')
})

app.get('/news',(req,res)=>{
    res.end('homes')
})

app.listen(777,()=> console.log('Server running on http://localhost:777'))