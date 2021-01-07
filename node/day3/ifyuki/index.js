const dataFormat =require('./src/dataFormat')
const escape = require('./src/htmlEscape')

module.exports = {
    ...dataFormat,
    ...escape
}

// ...代表展开运算符 将一个数组转为用逗号分隔的参数序列 其实就是把数组的每个数据拆开然后放进去 两个对象连接返回新的对象
