const fs = require('fs')
// 1. 读文件
fs.readFile('./考试成绩/成绩.txt', 'utf8', function (err, dataStr) {
    if (err) {
        return console.log('读取文件失败' + err.message)
    }
    // 2. 加工
    const arrOld = dataStr.split(' ')
    const arrNew = []
    arrOld.forEach((item) => {
        arrNew.push(item.replace('=', '：'))
    })
    const newStr = arrNew.join('\r\n')

    // 或者
    // const newStr = dataStr.replace(/=/g,':').replace(/\s/g,'\n')
    // 3. 把加工好的结果写入新文件
    fs.writeFile('./files/成绩-ok.txt', newStr, function (err) {
        if (err) return console.log('写入文件失败！' + err.message)
        console.log('成绩写入成功！')
    })
})
