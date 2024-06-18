//일반적인 사원 정보
var Employee = /** @class */ (function () {
    function Employee(_empName, _age, _empJob) {
        this._empName = _empName;
        this._age = _age;
        this._empJob = _empJob;
    }
    Employee.prototype.printEmp = function () {
        console.log("".concat(this._empName, " \uC758 \uB098\uC774\uB294 ").concat(this._age, " \uC774\uACE0, \uC9C1\uC5C5\uC740 ").concat(this._empJob, "\uC774\uB2E4."));
    };
    Object.defineProperty(Employee.prototype, "empName", {
        get: function () {
            return this._empName;
        },
        set: function (name) {
            this._empName = name;
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var emp1 = new Employee("yoon", 27, "dev");
// getter empName 호출
var empName = emp1.empName;
console.log(empName); // "yoon"
// setter empName을 통한 할당
emp1.empName = "setter Man~";
console.log(emp1.empName); // "setter Man~"
