const ifyuki = require('./ifyuki') //导入模块时 会自动搜索main

const dtStr = ifyuki.dataFormat(new Date())
console.log(dtStr)
console.log(ifyuki.htmlEscape('<h1>你好！</h1>'))
console.log(ifyuki.htmlUnEscape('&lt;h1&gt;再见！&lt;/h1&gt;'));