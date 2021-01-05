// 1.导入模块
const fs = require('fs')
const path = require('path')
// 2.正泽
const regStyle = /<style>([\s\S]*)<\/style>/
const regScript = /<script>([\s\S]*)<\/script>/
// 3.读取路径fs.readFile() 编码 回调函数
const sous = path.join(__dirname, '../index.html')
fs.readFile(sous, 'utf8', (res, dataStr) => {
    if (res) return console.log('读取文件失败！' + res.message)
    console.log('读取文件成功！')
    //3.1调用
    resolveCSS(dataStr)
    resolveJS(dataStr)
    resolveHTML(dataStr)
})
// 4.封装css
function resolveCSS(htmlStr) {
    // 4.1 正泽 exec()[] 出新的 exec() 方法用于检索字符串中的正则表达式的匹配。
    const newCSS = regStyle.exec(htmlStr)[1] // 正泽传进来的参数 存入 新的
    // 4.2 路径
    const targetCSS = path.join(__dirname, '/clock/index.css') // 这里的路径是把正泽好的内容传递到新的文件的路径
    // 4.3 写入fs.writeFile(路径(新创建的)，新的文件，回调函数)
    fs.writeFile(targetCSS, newCSS, (res) => {
        if (res) return console.log('写入CSS失败！' + res.message)
        console.log('写入CSS成功！')
    })
}
// 5. js
function resolveJS(htmlStr) {
    const newJS = regScript.exec(htmlStr)[1]
    const targetJS = path.join(__dirname, '/clock/index.js')
    fs.writeFile(targetJS, newJS, (res) => {
        if (res) return console.log('写入JS失败！' + res.message)
        console.log('写入JS成功！')
    })
}
// 6. html
function resolveHTML(htmlStr) {
    // 6.1 正泽 replace()
    const newHtml = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css"/>').replace(regScript, '<script src="./index.js"></script>')
    const targetHtml = path.join(__dirname, './clock/index.html')
    fs.writeFile(targetHtml, newHtml, (res) => {
        if (res) return console.log('读取html失败！' + res.message)
        console.log('写入成功！');
    })
}
