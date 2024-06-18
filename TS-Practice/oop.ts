//일반적인 사원 정보

class Employee {
  constructor(
    private _empName: string,
    private _age: number,
    private _empJob: string
  ) {}

  printEmp(): void {
    console.log(
      `${this._empName} 의 나이는 ${this._age} 이고, 직업은 ${this._empJob}이다.`
    );
  }

  get empName() {
    return this._empName;
  }
  set empName(name: string) {
    this._empName = name;
  }
}

const emp1 = new Employee("yoon", 27, "dev");

// getter empName 호출
const empName = emp1.empName;
console.log(empName); // "yoon"

// setter empName을 통한 할당
emp1.empName = "setter Man~";
console.log(emp1.empName); // "setter Man~"
