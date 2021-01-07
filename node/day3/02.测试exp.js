// 引入 express
const express = require('express');

// 创建服务器对象
const app = express();

// TODO:
/* 一般在程序中加上//TODO标记来表示该处功能还未实现，只是占个位置，提醒开发者注意而已。
“TODO ”的bai英文翻译为“to do” 。是IDE自动生成的让用户自己添加实现代码的地方，就是需要去做的事情
“//TODO “是表示这个地方还有一些事情要做，有一些代码要写的意思。因为用了这个注释，TODO是加粗的，在代码中很明显，所以作为程序员在编写代码时给自己留这个备忘。出现这个标签是因为用了代码自动生成工具，这个标签提示在此处添加自己的代码。
*/

// 监听端口
app.listen(3000, () => console.log('Server running on http://localhost:3000'));