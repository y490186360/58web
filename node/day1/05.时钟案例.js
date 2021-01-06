const fs = require('fs')
const path = require('path')

const regStyle = /<style>([\s\S]*)<\/style>/
const regScript = /<script>([\s\S]*)<\/script>/

const source = path.join(__dirname, '/index.html')

// 1.读取文件
// dataStr fs.readFile()读取特有的 代表读取文件的所有的内容
// 路径、编码(文件采用的编码格式)、回调函数 err成功失败 dataStr整个html内容
fs.readFile(source, 'utf8', (err, dataStr) => {
    if (err) return console.log('读取HTML文件失败！' + err.message)
    const targetCss = path.join(__dirname, './clock/index.css')
    const targetJs = path.join(__dirname, './clock/index.js')

    resolve(dataStr, regStyle, targetCss, 'CSS')
    resolve(dataStr, regScript, targetJs, 'JS')
    // 解析HTML
    resolveHTML(dataStr)
})
// htmlStr传参  reg正泽传参 target路径 type文本
function resolve(htmlStr, reg, target, type) {
    // 2. 正泽 提取
    const newStr = reg.exec(htmlStr)[1] // 代表第一个分组

    // 3. 写入 文件
    //  fs.writeFile() 方法，写入文件的内容
    //    参数1：表示文件的存放路径
    //    参数2：表示要写入的内容
    //    参数3：回调函数
    fs.writeFile(target, newStr, (err) => {
        if (err) return console.log('写入' + type + '样式失败' + err.message)
        console.log('写入' + type + '文件成功！')
    })
}
function resolveHTML(htmlStr) {
    // 赋值变量 正泽
    // replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
    // regStyle 设置好的正泽
    const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')
    const targetHtml = path.join(__dirname, './clock/index.html')
    // newHTML赋值好的正泽 变量
    fs.writeFile(targetHtml, newHTML, (err) => {
        if (err) return console.log('写入HTML样式失败' + err.message)
        console.log('写入HTML文件成功！')
    })
}
