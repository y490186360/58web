const fs = require('fs')
const path = require('path')                                     
const regStyle = /<style>([\s\S]*)<\/style>/
const regScript = /<script>([\s\S]*)<\/script>/
const source = path.join(__dirname, '../素材/index.html')
fs.readFile(source, 'utf8', (err, dataStr) => {
  if (err) return console.log('获取HTML失败！' + err.message)
  resolveCSS(dataStr)
  resolveJS(dataStr)
  resolveHTML(dataStr)
  //调用封装的函数
  // const targetCss = path.join(__dirname, './clock/index.css')
  // const targetJs = path.join(__dirname, './clock/index.js')
  // resolveCSS(dataStr, regStyle, targetCss, 'CSS')
  // resolveJS(dataStr, regScript, targetJs, 'JS')
  // resolveHTML(dataStr)
})
//封装函数
// function resolve(htmlStr, reg, target, type) {
//   const newStr = reg.exec(htmlStr)[1]
//   fs.writeFile(target, newStr, (err) => {
//     if (err) return console.log('写入' + type + '文件失败' + err.message)
//     console.log('写入' + type + '文件成功');
//   })
// }

function resolveCSS(htmlStr) { 
  const newCSS = regStyle.exec(htmlStr)[1]
  const targetCss = path.join(__dirname, './clock/index.css')
  fs.writeFile(targetCss, newCSS, (err) => {
    if (err) return console.log('写入 CSS 样式失败！' + err.message)
    console.log('写入css成功！')
  })
}
function resolveJS(htmlStr) {
  const newJS = regScript.exec(htmlStr)[1]
  const targetJs = path.join(__dirname, './clock/index.js')
  fs.writeFile(targetJs, newJS, (err) => {
    if (err) return console.log('写入 js 脚本失败！' + err.message)
    console.log('写入JS脚本成功！')
  })
}
function resolveHTML(htmlStr) {
  const newHtml = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')
  const targetHTML = path.join(__dirname, './clock/index.html')
  fs.writeFile(targetHTML, newHtml, (err) => {
    if (err) return console.log('写入 HTML 标签失败！' + err.message)
    console.log('写入HTML标签成功！')
  })
}