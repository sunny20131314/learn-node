/**
 * Created by sunzhimin on 17/08/16.
 * 模块的循环加载
 */

console.log( 'main.js a', require( './module-a.js').x );
console.log( 'main.js b', require( './module-b.js').x );
console.log( 'main.js a', require( './module-a.js').x );
console.log( 'main.js b', require( './module-b.js').x );

console.log(require.main === module);  // true -> 直接执行
//require.main 判断模块是直接执行,还是被调用

// 加载的时候,遇到require就加载相应的模块(中止当前模块的继续加载),
// b.js a1  main加载a.js, a.js又加载了b.js, 而b.js又加载了a.js(这是,返回了a.js的不完整版本,即export.x = 'a1'),
// a.js b2
// false
// main.js a a2
// main.js b b2
// main.js a a2  ∵从缓存中读取,所以木有console
// main.js b b2



var counter = require( './module-value-copy').counter;
var obj = require( './module-value-copy').obj;
var incCounter = require( './module-value-copy').incCounter;

console.log( counter );  // 3
console.log( obj.counter );  // 3
incCounter();
console.log( counter );  // 3
console.log( obj.counter ); // 4





