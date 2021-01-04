// 导入 fs 文件系统模块
const fs = require('fs')
// fs.readFile() 读取文件
// 路径、编码(文件采用的编码格式)、回调函数
fs.readFile('./files/1.txt', 'utf8', (err, data) => {
    if (err) return console.log('读取失败', err)
    console.log(data)
})
