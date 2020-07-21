import React from "react";

class PureComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    // 얕은 복사를 하기때문에 Object 타입은 매번 리렌더링 할것이다.
    // this.state = {
    //   number: { test: 1 }
    // };
    this.state = {
      number: 1
    };
  }
  componentDidUpdate() {
    console.log("PureComponent componentDidUpdate() 호출됨");
  }
  render() {
    console.log("PureComponent render() 호출됨");
    return (
      <div>
        <div>{this.state.number}</div>
        <button onClick={() => this.setState({ number: 1 })}>
          Render_Check
        </button>
      </div>
    );
  }
}

export default PureComponent;
