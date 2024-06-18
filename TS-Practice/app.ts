enum GenderType {
  Male = "male",
  Female = "female",
}

enum GradeType {
  A = "A",
  B = "B",
  C = "C",
}
type Gender = "male" | "female";
interface Student {
  name?: string;
  course?: string;
  age?: number;
  city?: string;
  male?: boolean;
  gender?: Gender;
  grade?: () => void;
  setName: (name: string) => void;
  getName: () => string;
}

class MyStudent implements Student {
  name = "Test man";
  course = "TS";
  age = 123;
  city = "busan";
  // male = true;
  gender: "male" | "female" = "male";
  setName(name: string): void {
    this.name = name;
    console.log("이름 설정 : " + this.name);
  }
  getName(): string {
    console.log("사용자 이름 : " + this.name);
    return this.name;
  }
}

const myInstance = new MyStudent();
myInstance.setName("kdman");
myInstance.getName();

type Status = string | number;
let status1: Status = "string test"; // 정상
let status2: Status = 123; // 정상
status1 = 2; // 정상
status2 = "string 허용"; // 정상

type numAndStr = Array<string | number>;

let numAndSTR: numAndStr = ["string", 1];
