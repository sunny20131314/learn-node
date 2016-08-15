/**
 * Created by sunzhimin on 15/08/16.
 * generator
 * next
 *
 */


// Generator函数是ES6提供的一种异步编程解决方案
// 执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数。
// 返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。

// helloWorldGenerator
//   有三个状态: 'hello', 'world', return语句(结束执行)
//   调用该Generator函数, 不是函数执行, 也不是返回执行的结果, 而是一个指向内部状态的一个指针对象 iterator
//   Generator函数是分段执行的，yield 停止执行, next 继续执行
//   遇到yield时停止后面的操作,并把yield后面紧跟的表达式执行, 并作为返回的value属性值
//   yield 不能用在普通函数中: forEach, function
//   下一步的调用一定是调用next方法, 使得指针移到下一个内部状态!
var a;
function* helloWorldGenerator( ) {
  yield a = 'hello';
  //   yield语句如果用在一个表达式之中，必须放在圆括号里面。不然会报错
  try {
    //console.log('no brace' + yield);
  }
  catch(e) {}
  console.log('has brace~~~ ' + (yield));
  yield 'world';

  return 'ok~~~~';
}


var gen = helloWorldGenerator();
//
//console.log( a );   // undefined
// value属性表示当前的内部状态的值 是yield语句后面的那个表达式的值, done(bool) 表示遍历是否结束
console.log( gen.next() ); //{ value: 'hello', done: false }
// console.log( a );   // 'hello'
console.log( gen.next() ); //{ value: 'world', done: false }
console.log( gen.next() ); //{ value: undefined, done: false }
// has brace~~~ undefined

console.log( gen.next() ); //{ value: 'ok~~~~', done: true }




