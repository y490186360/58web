const fs = require('fs')
fs.readFile('./成绩.txt', 'utf8', function (err, dataStr) {
    if (err) return console.log('读取信息失败！' + err.message)
    console.log('读取文件成功')

    // 2. 加工
    // split() 方法用于把一个字符串分割成字符串数组
    // 吧传进来的字符串变成字符串数组
    const arrOld = dataStr.split(' ')
    // 新的 空数组
    const arrNew = []
    // 遍历字符串数组
    arrOld.forEach((item) => {
        // 把传进来的 添加替换= 变成 ：到新数组里
        arrNew.push(item.replace('=', '：'))
    })
    // join把数组转换成字符串 用正泽换行
    // \r\n  匹配回车 和 换行符
    const newStr = arrNew.join('\r\n')

    // 或者
    // const newStr = dataStr.replace(/=/g,':').replace(/\s/g,'\n')
    // 3. 把加工好的结果写入新文件
    fs.writeFile('../files/3.txt', newStr, function (err) {
        if (err) return console.log('写入文件失败！' + err.message)
        console.log('成绩写入成功！')
    })
})
