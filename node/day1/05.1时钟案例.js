// 导入 fs path 文件系统模块
const fs = require('fs')
const path = require('path')

const regStyle = /<style>([\s\S]*)<\/style>/
const regScript = /<script>([\s\S]*)<\/script>/

const source = path.join(__dirname, '/index.html')

// 1.读取文件 // fs.readFile() 读取文件
// 路径、编码(文件采用的编码格式)、回调函数
fs.readFile(source, 'utf8', (err, dataStr) => {
    if (err) return console.log('读取HTML文件失败！' + err.message)
    resolveCSS(dataStr)
})

function resolveCSS(htmlStr) {
    // 2. 提取CSS
    const newCSS = regStyle.exec(htmlStr)[1] // 代表第一个分组
    // 3. 写入 CSS
    const targetCss = path.join(__dirname, './clock/index.css')
    //  fs.writeFile() 方法，写入文件的内容
    //    参数1：表示文件的存放路径
    //    参数2：表示要写入的内容
    //    参数3：回调函数
    fs.writeFile(targetCss, newCSS, (err) => {
        if (err) return console.log('写入CSS样式失败' + err.message)
        console.log('写入样式文件成功！')
    })
}
