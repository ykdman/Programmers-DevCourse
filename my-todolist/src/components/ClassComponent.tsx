import { Component, ReactNode } from "react";

class ClassComponent extends Component {
  render(): ReactNode {
    // Class Component의 출력부
    return (
      <div className="container">
        <h1>HEllo World</h1>
        <p>이것은 클래스 컴포넌트</p>
      </div>
    );
  }
}

export default ClassComponent;
