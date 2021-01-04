const fs = require('fs')
const path = require('path')
// 1. 读文件
// path.join(__dirname,'./考试成绩/成绩.txt') 路径
fs.readFile(path.join(__dirname,'./考试成绩/成绩.txt'), 'utf8', function (err, dataStr) {
    if (err) {
        return console.log('读取文件失败' + err.message)
    }
    // 2. 加工
    
    const newStr = dataStr.replace(/=/g,':').replace(/\s/g,'\n')
    // 3. 把加工好的结果写入新文件
    fs.writeFile(path.join(__dirname,'./files/成绩-ok.txt'), newStr, function (err) {
        if (err) return console.log('写入文件失败！' + err.message)
        console.log('成绩写入成功！')
    })
})