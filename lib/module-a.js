/**
 * Created by sunzhimin on 17/08/16.
 */

exports.x = 'a1';
console.log( 'a.js', require( './module-b.js').x );
exports.x = 'a2';

console.log(require.main === module);  // false -> 调用执行
