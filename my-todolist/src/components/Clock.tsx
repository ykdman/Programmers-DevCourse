import { useState } from "react";

export default function Clock(): JSX.Element {
  const [time, setTime] = useState(new Date());

  setInterval(() => {
    setTime(new Date());
  }, 1000);

  return (
    <div>
      <h2>현재 시간 - {time.toLocaleTimeString()}</h2>
    </div>
  );
}

// export default function Timer(): JSX.Element {
//   const [seconds, setSeconds] = useState<number>(0);

//   function settingInterval() {
//     setInterval(() => {
//       setSeconds((prev) => prev + 1);
//     }, 1000);
//   }

//   return (
//     <div>
//       <h2>타이머 : {seconds} 초</h2>
//       <button onClick={settingInterval}>시작</button>
//     </div>
//   );
// }
