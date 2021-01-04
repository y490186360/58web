// 1.导入 fs path 文件系统模块
const fs = require('fs')
const path = require('path')
// 2.设置正泽选取CSS JS
const regStyle = /<style>([\s\S]*)<\/style>/
const regScript = /<script>([\s\S]*)<\/script>/
// 读取文件路径
const source = path.join(__dirname, '../index.html')
// 3.读取文件
// 路径、编码(文件采用的编码格式)、回调函数
fs.readFile(source, 'utf8', (err, dataStr) => {
    // 3.1 判断文件成功失败
    if (err) return console.log('读取文件失败！' + err.message)
    // 3.2 设置路径 变量
    const targetStyle = path.join(__dirname, '/clock/index.css')
    const targetScript = path.join(__dirname, '/clock/index.js')
    // 3.3 调用封装函数 scc js 解析html
    resolve(dataStr, regStyle, targetStyle, 'css') // dataStr？
    resolve(dataStr, regScript, targetScript, 'js')
    resolveHTML(dataStr)
})
// 4.封装函数传递css，js  htmlStr传参  reg正泽传参 target路径 type文本
function resolve(htmlStr, reg, target, type) {
    // 4.1 提取正泽 提取传进来的htmlStr
    //  exec() 方法用于检索字符串中的正则表达式的匹配。
    const newStr = reg.exec(htmlStr)[1]
    // 4.2 写入 文件 fs.writeFile() 方法，写入文件的内容
    // 路径 要写的内容 回调函数
    fs.writeFile(target, newStr, (err) => {
        if (err) return console.log('传输' + type + '文件失败！' + res.message)
        console.log('传输' + type + '成功!')
    })
}
// 5.设置html替换函数
function resolveHTML(htmlStr) {
    // 5.1 赋值变量 正泽 <style></style>替换link标签 <script></script>替换
    const newHtml = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css"/>').replace(regScript, '<script src="./index.js"></script>')
    // 5.2 写入文件
    // 路径、内容、回调函数
    const targetHtml = path.join(__dirname, '/clock/index.html')
    fs.writeFile(targetHtml, newHtml, (err) => {
        if (err) return console.log('传入HTML文件失败！')
        console.log('传入HTML成功！');
    })
}
