const fs = require('fs')
const path = require('path')

const regStyle = /<style>([\s\S]*)<\/style>/
const regScript = /<script>([\s\S]*)<\/script>/

const source = path.join(__dirname, '/index.html')

// 1.读取文件
fs.readFile(source, 'utf8', (err, dataStr) => {
    if (err) return console.log('读取HTML文件失败！' + err.message)
    const targetCss = path.join(__dirname, './clock/index.css')
    const targetJs = path.join(__dirname, './clock/index.js')

    resolve(dataStr, regStyle, targetCss, 'CSS')
    resolve(dataStr, regScript, targetJs, 'JS')
    // 解析HTML
    resolveHTML(dataStr)
})

function resolve(htmlStr, reg, target, type) {
    // 2. 提取CSS
    const newCSS = reg.exec(htmlStr)[1] // 代表第一个分组

    // 3. 写入 文件
    fs.writeFile(target, newCSS, (err) => {
        if (err) return console.log('写入' + type + '样式失败' + err.message)
        console.log('写入' + type + '文件成功！')
    })
}
function resolveHTML(htmlStr) {
    const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')
    const targetHtml = path.join(__dirname, './clock/index.html')
    fs.writeFile(targetHtml, newHTML, (err) => {
        if (err) return console.log('写入HTML样式失败' + err.message)
        console.log('写入HTML文件成功！')
    })
}
