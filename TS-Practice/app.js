var GenderType;
(function (GenderType) {
    GenderType["Male"] = "male";
    GenderType["Female"] = "female";
})(GenderType || (GenderType = {}));
var GradeType;
(function (GradeType) {
    GradeType["A"] = "A";
    GradeType["B"] = "B";
    GradeType["C"] = "C";
})(GradeType || (GradeType = {}));
var MyStudent = /** @class */ (function () {
    function MyStudent() {
        this.name = "Test man";
        this.course = "TS";
        this.age = 123;
        this.city = "busan";
        // male = true;
        this.gender = "male";
    }
    MyStudent.prototype.setName = function (name) {
        this.name = name;
        console.log("이름 설정 : " + this.name);
    };
    MyStudent.prototype.getName = function () {
        console.log("사용자 이름 : " + this.name);
        return this.name;
    };
    return MyStudent;
}());
var myInstance = new MyStudent();
myInstance.setName("kdman");
myInstance.getName();
var status1 = "string test"; // 정상
var status2 = 123; // 정상
status1 = 2; // 정상
status2 = "string 허용"; // 정상
var numAndSTR = ["string", 1];
