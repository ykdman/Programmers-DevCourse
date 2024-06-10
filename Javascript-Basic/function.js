// 함수 생성 응용

// 1. 기본 함수 선언식 + rest 나머지 매개변수, arguments 내장 객체
function func1(num1, num2, ...rest) {
  const obj = {
    arguments,
    rest: [...rest],
  };

  return obj;
}

console.log(func1(1, 2, 10, 20, 30));
//arguments: Arguments(5) [1, 2, 10, 20, 30, callee: <accessor>, Symbol(Symbol.iterator): ƒ]
//rest: (3) [10, 20, 30]

// 2. 콜백 함수

function callTest(callback, ...rest) {
  const result = callback(...rest);
  return result;
}

const callResult = callTest(func1, 2, 10, 20, 30);
console.log(callResult);
//arguments: Arguments(4) [2, 10, 20, 30, callee: <accessor>, Symbol(Symbol.iterator): ƒ]
// rest: (2) [20, 30]
console.log();
