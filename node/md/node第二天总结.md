## DNS 服务器和端口号

作用：负责域名到 IP 的解析

www.baidu.com -> DNS 解析 -> 用解析成的 IP 找对应的服务器

同一个端口号不能被不同的应用重复占用，HTTP 默认 80，可以被省略，HTTPS 默认是 443，也可以被省略

## 创建服务器

http 模块用来创建 web 服务器 通过 http.createServer()方法,就能方便的一台普通电脑,变成一台 Web 服务器,从而对外提供 Web 资源服务

```js
// Step1: 引入 HTTP 模块
const http = require('http')
// Step2: 创建服务器实例对象
const server = http.createServer()
// Step3: 监听客户端的请求 绑定request事件
server.on('request', (req, res) => {
    // req => request, 请求对象 包含了与客户端相关的数据和属性
    // res => response, 响应对象 是访问与服务器相关的数据或属性
    res.end('ok')
})
// Step4: 设置一个端口 调用server.listen(端口号,cb回调)方法,即可启动 web 服务器
// 启用客户端 (启动的端口，成功的回调函数 提示用户)
server.listen(3000, () => console.log('Server running on http://127.0.0.1:3000'))
```

另一种写法而已

```js
// Step1: 引入 HTTP 模块
const http = require('http')
// Step2: 创建服务器实例对象、监听请求、设置端口
http.createServer((req, res) => {
    // 也是所有的请求都会走这里，相当于使用了 request 事件
    // 调用 res.end() 方法，向客户端响应一些内容
    // 向客户端发送指定内容，并结束这次请求的处理过程
    res.end('ok')
}).listen(3000, () => console.log('Server running on http://127.0.0.1:3000'))
```

## 注意点

==服务器的代码修改了，一定要重启后才能生效！按 `Ctrl + c` 可以关闭==

## req 和 res 对象下面的方法和属性

req.url: 请求地址，注意是端口后面的那部分

req.method: 请求方法，例如 GET、POST

res.end(): 服务器可以往客户端响应内容

```js
const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
    // req.url 是客户端请求的 URL 地址(请求的URL地址是从端口号'/'后面开始的)
    // req.method 是客户端请求的 method 类型
    const str = `Your request url is ${req.url}, and request method is ${req.method}`

    // res.end(str)，代表把 str 字符串响应到客户端
    res.end(str)
})
// 启用客户端 (启动的端口，成功的回调函数 提示用户)
server.listen(3000, () => console.log('Server running on http://127.0.0.1:3000'))
```

## 04.根据不同的 url 响应不同的 html

```js
const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
    // 1.获取请求的 url 地址
    const url = req.url
    // 2.设置默认值的响应内容为 404 Not found!
    let content = '<h1>404 Not found!</h1>'
    // 3. 判断用户请求的是否为 / 或 /index.html 首页
    // 4. 判断用户请求的是否为 /about.html 关于页面
    if (url === '/' || url === '/index.html') {
        content = '<h1>首页</h1>'
    } else if (url === '/about.html') {
        content = '<h1>关于页面</h1>'
    }
    // 5.设置Content-Type响应头，防止中文乱码
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    // 6. 使用res.end() 把内容响应给客户端
    res.end(content)
})
// 启用客户端 (启动的端口，成功的回调函数 提示用户)
server.listen(3000, () => {
    console.log('Server running on http://127.0.0.1:3000')
})
```

## 设置响应头

```js
const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
    const str = `您请求的 URL 地址是 ${req.url}，请求的 method 类型为 ${req.method}`
    // 解决了中文乱码、不能完全解析 HTML 标签
    // res.setHeader 必须写到 res.end 之前
    // 服务端设置的响应头中的内容类型和内容编码
    res.setHeader('Content-Type', 'text/html; charset=utf8')

    // 曾经学习 AJAX 时，客户端设置的请求头中的内容类型
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // res.end() 之后不要写其他代码了，res.end() 一般放到最后
    res.end(`<h2>${str}</h2>`)
})
// 启用客户端 (启动的端口，成功的回调函数 提示用户)
server.listen(3000, () => console.log('Server running on http://127.0.0.1:3000'))
```

## Clock 时钟

获取请求地址（req.url） -> 拼接成资源的实际地址（path.join()） -> 读取实际地址（fs.readFile） -> 把读取到的结果返回给前端（res.end）

```js
const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
// 创建web服务器
const server = http.createServer()
// 监听客户端请求 绑定 request 事件
server.on('request', (req, res) => {
    const url = req.url
    let fpath = ''

    // 优化请求路径
    if (url === '/') {
        fpath = path.join(__dirname, 'clock', 'index.html')
    } else {
        fpath = path.join(__dirname, 'clock', url)
    }
    // 根据文件的路径输出内容类型
    // console.log(mime.getType(fpath), 23333333333);

    // mime.getType(fpath)，根据资源路径返回资源的类型
    res.setHeader('Content-Type', `${mime.getType(fpath)}; charset=utf8`)
    // 读取路径并响应给客户端
    fs.readFile(fpath, (err, dataStr) => {
        if (err) return res.end('404 Not found.')
        res.end(dataStr)
    })
})
// 启用客户端 (启动的端口，成功的回调函数 提示用户)
server.listen(80, () => {
    console.log('server running at http://127.0.0.1')
})
```

## 模块化

模块化是指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程。对于整个系统来说，模块是可组合，分解和更换的单元。

**编程领域中的模块化**
编程领域中的模块化，就是遵守固定的规则，把一个大文件拆成独立并互相依赖的多个小模块

把代码进行模块化拆分的好处：
① 提高了代码的复用性
② 提高了代码的可维护性
③ 可以实现按需加载

1\. 命名冲突

2\. 文件依赖关系不明确

在 NodeJS 中，一个 JS 文件就是一个模块！
Node.js 中根据来源的不同，将模块分为了 3 大类
分类：内置（内置模块是由 Node.js 官方提供的，例如 fs、path、http 等）、
第三方（由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载）、
自定义（用户创建的每个 .js 文件，都是自定义模块 加载时需要给路径）

## 加载模块

加载一个模块的(require)时候，会执行此模块中的代码

```js
// 加载的是自定义模块，需要明确带上路径 可省略掉后缀名 .js
const a = require('./a.js')
console.log(a)

// 加载的是内置、第三方模块，不用带上路径
const fs = require('fs') // 内置
const mime = require('mime') // 第三方
```

## 模块作用域

和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块作用域。
模块作用域的好处 ：
防止了全局变量污染的问题

## 模块的导入与导出

## module.exports 对象 向外共享模块作用域中的成员

在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用。
外界用 require() 方法导入自定义模块时，得到的就是 module.exports 所指向的对象。

module 对象：在每个 .js 自定义模块中都有一个 module 对象，它里面存储了和当前模块有关的信息 下载 module 模块 不用导入 node 会自己去找

```js
// 1.js
const sum = (a, b) => a + b

const age = 18
// #1 导出模块
/* module.exports = {
    sum,
    age
}; */

// 下面写法和上面等价
module.exports.age = age
module.exports.sum = sum
```

```js
// 其实来说，require 得到的结果是 1.js 中 module.exports 这个对象
// #2 导入模块
const mod = require('./1')
console.log(mod.sum(1, 3))
```

## exports 和 module.exports

**exports 是 module.exports 的一个引用，模块最终导出的结果永远以 module.exports 指向的对象为准**

```js
// 最佳实践1
// 赋值给原始对象
exports.username = 'zs'
// module.exports 创建了新对象
module.exports = {
    gender: '男',
    age: 22
}
// gender:'男', age:22
```

```js
// 最佳实践2
// 赋值给原始对象
module.exports.username = 'zs'
// exports 创建新对象
exports = {
    gender: '男',
    age: 22
}
// username:'zs' 最终导出的结果永远以 module.exports 指向的对象为准
```

```js
// 最佳实践3
// 都是赋值给原始对象
exports.username = 'zs'
module.exports.gender = '男'
// username:'zs',gender:'男'
```

```js
// 最佳实践4
exports = {
    username: 'zs',
    gender: '男'
}
// exports 创建的新对象赋值给 module.exports 所以两个指向的是同一个对象
module.exports = exports
module.exports.age = '22'
// username:'zs',gender:'男',age:'22'
```

## 了解一下模块化规范

-   AMD，require.js 是 AMD 规范的实现

-   CMD，sea.js 是 CMD 规范的实现

-   CommonJS 规范，Node 当中导入导出使用的就是 CommonJS 规范，后端用的：
    1.module 是当前模块
    2.module.exports 是对外的一个借口 3.加载某个模块，其实是加载该模块的 module.exports 属性 require()方法用于加载模块

-   ES6 模块规范

## NPM 使用

npm => **命令行**管理工具，可以通过此工具下载包

npm => **包的托管平台**（网站），一般通过此网站查看包的详细使用

```bash
npm install 包名 / npm i 包名
```

package-lock.json 锁定包的版本，记录包的下载地址（提高包的下载速度）

## 补充 url 模块

```js
const url = require('url')
const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
    // 端口后面那部分
    // http://localhost/index.html?name=ifer

    // req.url => /aaa.html?name=ifer
    // 我只期望获取到 /aaa.html，后面的查询参数使用

    // 第二个参数为 true 会把 query 解析成对象
    const { pathname, query } = url.parse(req.url, true)

    if (pathname === '/index.html') {
        return res.end('Welcome ' + query.name)
    }
    res.end('404')
})
// 启用客户端 (启动的端口，成功的回调函数 提示用户)
server.listen(80, () => {
    console.log('server running at http://127.0.0.1')
})
```

## moment 进行时间格式化

```js
// 导入模块
const moment = require('moment')
// moment()方法得到当前的时间
// format() 对当前的时间进行格式化 写两个代表补零 HH大写代表24h
console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
```

## 安装指定版本的包

// npm i moment@2.22.2 不用卸载它自己会覆盖
包的版本号是以“点分十进制”形式进行定义的，总共有三位数字，例如 2.24.0
**包的语义化版本规范**
其中每一位数字所代表的的含义如下：
第 1 位数字：大版本
第 2 位数字：功能版本
第 3 位数字：Bug 修复版本
版本号提升的规则：只要前面的版本号增长了，则后面的版本号归零。
