const fs = require('fs')
const path = require('path')
// 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。注意 Unicode 正则表达式会匹配全角空格符。
const regStyle = /<style>([\s\S]*)<\/style>/
const regScript = /<script>([\s\S]*)<\/script>/

const targetHtml = path.join(__dirname, '../index.html')
fs.readFile(targetHtml, 'utf8', (err, dataStr) => {
    if (err) return console.log('读取文件失败！' + err.message)
    console.log('读取文件成功！')

    reaCss(dataStr)
    reaJs(dataStr)
    reaHtml(dataStr)
})

function reaCss(htmlStr) {
    const newCss = regStyle.exec(htmlStr)[1]
    const targetCss = path.join(__dirname, '/col/red.css')
    fs.writeFile(targetCss, newCss, (err) => {
        if (err) return console.log('写入CSS样式失败')
        console.log('写入CSS样式成功')
    })
}
function reaJs(htmlStr) {
    const newJs = regScript.exec(htmlStr)[1]
    const targetJs = path.join(__dirname, '/col/red.js')
    fs.writeFile(targetJs, newJs, (err) => {
        if (err) return console.log('写入HTML样式失败')
        console.log('写入JS样式成功')
    })
}
function reaHtml(htmlStr) {
    const newHtml = htmlStr.replace(regStyle,'<link rel="stylesheet" href="red.css"/>').replace(regScript,'<script src="red.js"></script>')
    const targetHtml = path.join(__dirname,'/col/red.html')
    fs.writeFile(targetHtml,newHtml,err=>{
        if (err) return console.log('写入HTML样式失败')
        console.log('写入HTML样式成功')
    })
}