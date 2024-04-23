/** Non Blocking Practice */

// function firstFunc() {
//   console.log('first Func');
// }
// function secondFunc() {
//   console.log('second Func');
// }
// function thirdFunc() {
//   console.log('third Func');
// }

// firstFunc();
// setTimeout(secondFunc, 2000);
// thirdFunc();

const figlet = require('figlet');

figlet('Hello World!!', function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data);
});
