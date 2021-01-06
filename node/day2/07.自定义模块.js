// const module = require('module')
const age = 20
module.exports.usname = 'YuKi'

module.exports.seyHello = function () {
    console.log('YuKi Hello!');
}
module.exports.age = age
// 相当于创建新对象 会覆盖上面的
module.exports = {
    nikename: 'out',
    usage:18
}