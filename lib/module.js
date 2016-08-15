var jquery = require('jquery');
console.log(module, 'module~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

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