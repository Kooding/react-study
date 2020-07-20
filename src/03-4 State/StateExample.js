import React, { Component } from "react";

class StateExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  onIncrease = () => {
    console.log("onIncrease() 호출");
    //state 변경
    // this.setState({
    //   count: this.state.count + 1
    // });
    this.state.count += 1;

    //this.state.count의 값은 현재 0 입니다.
    console.log("count 값 : ", this.state.count);
    //이후 호출될 render() 함수에서의 this.state.count의 값은 setState() 함수가 호출된 이후의 결과값 입니다.
  };

  render() {
    return (
      <div>
        {/* state 데이터는 this.state로 접근 가능합니다. */}
        <div>카운트 : {this.state.count}</div>
        <button onClick={this.onIncrease}>+1</button>
      </div>
    );
  }
}

export default StateExample;
