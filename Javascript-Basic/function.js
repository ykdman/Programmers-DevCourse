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

// class

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get upperCaseName() {
    return this.name.toLocalUpperCase();
  }

  set plusYear(age) {
    this.age += age;
  }

  static legCount() {
    return 2;
  }
}

Person.legCount();
const James = new Person("James", 35);
James.upperCaseName();
James.plusYear = 5;
console.log(James.upperCaseName(), James.age); // "JAMES" 40

class Car {
  constructor(name) {
    this.name = name;
  }
}

class Suv extends Car {
  constructor(name) {
    super(name);
  }

  action() {
    return this.name + "Going Home";
  }
}

const sportage = new Sub("sportage");
sportage.name; // "sportage"
sportage.action; // "sportage Goting Home"
