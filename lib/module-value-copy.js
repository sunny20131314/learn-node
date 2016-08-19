/**
 * Created by sunzhimin on 18/08/16.
 */

var counter = 3;
var obj = {
  counter: 3
};
function incCounter() {
  counter++;
  obj.counter++;
}

module.exports = {
  counter: counter,
  obj: obj,
  incCounter: incCounter
};