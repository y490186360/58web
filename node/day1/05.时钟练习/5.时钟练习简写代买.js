const fs = require('fs')
const path = require('path')
// 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。注意 Unicode 正则表达式会匹配全角空格符。
const regStyle = /<style>([\s\S]*)<\/style>/
const regScript = /<script>([\s\S]*)<\/script>/

const targetHtml = path.join(__dirname, '../index.html')
// dataStr fs.readFile()读取特有的 代表读取文件的所有的内容
fs.readFile(targetHtml, 'utf8', (err, dataStr) => {
    if (err) return console.log('读取文件失败！' + err.message)
    console.log('读取文件成功！')
    // __dirname 表示当前文件所处在的目录
    const targetCss = path.join(__dirname, '/res/rod.css')
    const targetJs = path.join(__dirname, '/res/rod.js')
    // 封装代码 传递多个参数 路径写在调用函数里
    rea(dataStr, targetCss, regStyle, 'CSS')
    rea(dataStr, targetJs, regScript, 'JS')
    reaHtml(dataStr)
})
// htmlStr传参  reg正泽传参 target路径 type文本
function rea(htmlStr, target, reg, type) {
    // 新的文件 用正泽取需要的值 放入新文件
    // 形参reg  正泽传参 reg.exec(htmlStr)[1] 传过来的需要reg正泽选取的 文件htmlStr
    const newStr = reg.exec(htmlStr)[1]

    fs.writeFile(target, newStr, (err) => {
        if (err) return console.log('写入' + type + '样式失败')
        console.log('写入' + type + '样式成功')
    })
}
function reaHtml(htmlStr) {
    const newHtml = htmlStr.replace(regStyle, '<link rel="stylesheet" href="rod.css"/>').replace(regScript, '<script src="rod.js"></script>')
    const targetHtml = path.join(__dirname, '/res/rod.html')
    fs.writeFile(targetHtml, newHtml, (err) => {
        if (err) return console.log('写入HTML样式失败')
        console.log('写入HTML样式成功')
    })
}
