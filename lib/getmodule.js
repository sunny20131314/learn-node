// 如果想在一条import语句中，同时输入默认方法 defaultFn 和其他变量，可以写成下面这样。
import defaultFn, {setName, sayName as say, firstName, lastName, year, jquery} from './module';

import * as circle from './module';

console.log( circle, 'circle, module的全部变量' );

// 变量foo 在 module 文件中 修改了, 当前文件的变量 foo 的值也相应的改了!
// ES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。
// 也就是ES6模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。
import {foo, incFoo} from './module';
console.log( foo, 'foo~~~~~~~~~' );
incFoo();
console.log( foo, 'foo~~~~~~~~~ after' );


// import 一个默认模块 不需要{}哦,具体看页面 module!
import customName from './module';
console.log( customName, 'customName' );
console.log( customName(), 'customName()' );

// import 和 export 的结合体: 在导入的同时, 导出! import 默认会提升要当前页面顶部!!
// (注意: 只能放在页面的top层, 不能放在块级作用域中, 如下)
export { sayHello as say } from './module';

// 报错!
if(false){
//export { sayHello as say } from './module';
}

// 由于ES6输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。
//sayHello = {};


// 模块的继承!!!



// export *命令会忽略 module 模块的default方法。

export * from './module';