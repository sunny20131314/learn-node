/**
 * Created by sunzhimin on 17/08/16.
 */
exports.x = 'b1';
console.log( 'b.js', require( './module-a.js').x );
exports.x = 'b2';