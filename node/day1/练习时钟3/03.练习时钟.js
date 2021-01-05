const fs = require('fs')
const path = require('path')

const regStyle = /<style>([\s\S]*)<\/style>/
const regScript = /<script>([\s\S]*)<\/script>/

const dHtml = path.join(__dirname, '../index.html')
fs.readFile(dHtml, 'utf8', (err, dataStr) => {
    if (err) return console.log('读取文件失败！' + err.message)
    console.log('读取文件成功')

    nodeCSS(dataStr)
    nodeJS(dataStr)
    nodeHTML(dataStr)
})

function nodeCSS(htmlStr) {
    const newCSS = regStyle.exec(htmlStr)[1]
    const targetCSS = path.join(__dirname, './clock3/index.css')
    fs.writeFile(targetCSS, newCSS, (err) => {
        if (err) return console.log('写入css样式失败！' + err.message)
        console.log('写入css样式成功！')
    })
}

function nodeJS(htmlStr) {
    const newJS = regScript.exec(htmlStr)[1]
    const targetJS = path.join(__dirname, './clock3/index.js')
    fs.writeFile(targetJS, newJS, (err) => {
        if (err) return console.log('写入js脚本失败！' + err.message)
        console.log('写入js脚本成功')
    })
}

function nodeHTML(htmlStr) {
    const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css"/>').replace(regScript, '<script src="./index.js"></script>')
    const targetHTML = path.join(__dirname, '/clock3/index.html')
    fs.writeFile(targetHTML, newHTML, (err) => {
        if (err) return console.log('写入html结构失败！' + err.message);
        console.log('写入html结构成功');
    })
}
