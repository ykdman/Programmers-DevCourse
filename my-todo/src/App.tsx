import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const date = new Intl.DateTimeFormat("ko");

  return (
    <div className="App-header">
      <h1>Hello React</h1>
      <p>반가우이</p>
      <p>오늘 날짜 : {date.format()}</p>
    </div>
  );
}

export default App;
