// require (加载并执行)的参数中不含有文件路径,表示加载的是一个默认提供的核心模块(优先)(位于Node的系统安装目录中 /usr/local/lib/node/ ),
// 或者一个位于`各级`node_modules目录的已安装目录(全局或者局部安装)
// Node会到模块的安装目录,去寻找已安装的模块
// 模块一旦被加载以后,就会被系统缓存, 如果第二次还加载该模块,就会返回缓存中的版本(即加载缓存中该模块的module.exports属性),
// 这意味着模块实际只会执行一次, 如果希望执行多次,可返回一个函数,然后调用该函数,
var jquery = require('jquery');

// 所有缓存的模块保存在require.cache之中, 缓存是根据绝对路径识别模块的,如果同样的模块名,但是保存在不同路径,require命令仍会加载该模块
//delete require.cache[jquery];
// 删除所有模块缓存
console.log(Object.keys(require.cache), 'before delete~~~~~~~~~~~~~~~~');
// [ '/private/var/www/learn-node/dist/demo-module.js',
//   '/private/var/www/node_modules/jquery/dist/jquery.js' ]
Object.keys(require.cache).forEach(function (key) {
  //delete require.cache[key];
});
console.log(Object.keys(require.cache), 'after delete~~~~~~~~~~~~~~~~');  // []


// 根据commonJs规范,一个独立的文件就是一个模块,每个模块都是一个独立的作用域.
// 换言之, 一个文件定义的变量(包括函数和类), 都是私有的, 对其他文件都是不可见的.
// 每个文件的对外接口是 module.exports 对象(文件内部和外部通信的桥梁), 这个对象的所以属性和方法, 都可以被其他文件导入.

// module
// module.id: 模块的标识符, 通常是带有绝对路径的模块文件名
// module.filename: 模块的文件名,带有绝对路径
// module.loaded: 返回一个布尔值, 表示模块是否已经完成加载.
// module.parent: 返回一个对象,表示调用该模块的模块. 可通过是否存在,判断当前模块是否为入口脚本!
// module.children: 返回一个数组,表示该模块要用到的其他模块
// module.exports: 属性表示对外输出的值.表示当前模块对外输出的接口,其他文件加载该模块,实际就是读取exports 变量
console.log(module, 'module~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

// 为了方便, Node为每个模块提供一个exports变量, 指向module.exports(可以理解为在每个模块的头部)
// 可以向exports对象添加方法,但是不能直接给 exports及module.exports指向一个值(这样的话,之间的联系就木有了)
// 那么也意味着,如果一个模块的对外接口就是一个单一的值,不能使exports 输出,只能使用 module.exports输出
module.exports.log = function(x) {
  console.log( x );
};


var name;

function setName(thyName) {
  name = thyName;
}

function sayHello() {
  console.log('Hello ' + name);
  return name;
}

const firstName = 'Michael';
const lastName = 'Jackson';
const year = 1958;

console.log(111);
var foo = 0;
function incFoo() {
  foo++;
}

// 下面代码使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不同的名字输出两次。

// 在接口名与模块内部变量之间，建立了一一对应的关系。
export {
  jquery,
  foo,
  incFoo,
  setName,
  sayHello,
  firstName,
  lastName,
  year
};


// export default命令用于指定模块的默认输出。
// 显然，一个模块只能有一个默认输出，因此export deault命令只能使用一次。
// 所以，import命令后面才不用加大括号，因为只可能对应一个方法。

//本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。
export default function defaultFn1() {
  console.log('default');
}

// 正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。

// 错误
//export default var a = 1;

// 输出默认值
//export default 42;