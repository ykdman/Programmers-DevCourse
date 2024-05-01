const express = require("express");
const app = express();
const PORT = 3000;

const members = [
  { id: 1, name: "박준형", position: "래퍼" },
  { id: 2, name: "데니안", position: "래퍼" },
  { id: 3, name: "윤계상", position: "래퍼" },
  { id: 4, name: "손호영", position: "리드보컬" },
  { id: 5, name: "김태우", position: "메인보컬" },
];

app.listen(PORT, () => {
  console.log(`Server listen : ${PORT}`);
});

// body parser
app.use(express.json());

// middlw ware (logger)

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`start: ${req.method} ${req.url}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`end: ${req.method} ${req.baseUrl}${req.url} ${diffTime}ms`);
});

// member 전체 조회
app.get("/members", (req, res) => {
  if (members.length === 0) {
    res.status(200); // member의 내부 정보가 없는 것이므로 응답코드는 200
    res.send("member 정보가 없습니다.");
  } else {
    res.json(members);
  }
});

// member 개별적으로 조회
app.get("/members/:id", (req, res) => {
  // 개별적으로 조회하기 위해선 json Array로 선언된 members의 각 요소에 올바르게 접근해야한다.
  const { id } = req.params;
  /**
   * 내가 생각한 json array 에서 요소 찾는 법
   * 배열에서 findeIndex를 통해 해당 요소의 Index 반환 (false 일때 -1 이 반환됨)
   */
  const memberIndex = members.findIndex((member) => member.id === +id); //id는 string으로 넘어오므로 숫자 형변환
  console.log(`찾는멤버 ID : ${id}, 멤버 인덱스 : ${memberIndex}`);

  if (memberIndex > -1) {
    //찾는 member 가 존재하는 상태
    const member = members[memberIndex]; // 찾는 멤버 할당
    res.json(member);
  } else {
    res.status(404).send("찾는 멤버가 없습니다.");
  }
});

app.post("/members/:id", (req, res) => {
  // id, name, position 을 member에 push 해야 한다.

  // body와 id 할당
  const { id } = req.params;
  const { name, position } = req.body;
  console.log(name, position);

  if (!name || !position) {
    res.status(400).send("올바른 정보를 입력해주세요, name & position");
    return;
  }

  /**
   * 처리할 예외 사항
   * 이미 있는 id를 '등록' 하는 것은 PUT으로 해야한다.
   * 때문에 Post로 오는 중복 id 에 대한 요청은 400(Bad Request) 로 처리
   */
  if (members.findIndex((member) => member.id === +id) > -1) {
    res.status(400).send("이미 등록되어있는 멤버입니다.");
    return;
  } else {
    const newMember = {
      id,
      name,
      position,
    };
    members.push(newMember);
    res.status(200).json(newMember);
    return;
  }
});
