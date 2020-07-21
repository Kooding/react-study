import React, { Component } from "react";

class RefExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: "435xwx"
    };
  }
  //render() 함수안에서 돔요소에 ref={this.setRef} 를써서
  // 반환된 객체를 컴포넌트 변수에 할당해주는 함수입니다.
  setRef = ref => {
    this.ref = ref;
  };

  onCangeHandle = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  onReset = () => {
    this.setState({
      textInput: ""
    });
    //이제 ref를 통해 DOM 객체 함수인 focuse() 함수를 사용할수있습니다.
    this.ref.focus();
  };
  render() {
    return (
      <div>
        <div>{this.state.textInput}</div>
        <input
          name="textInput"
          type="text"
          value={this.state.textInput}
          onChange={this.onCangeHandle}
          ref={this.setRef} // 반드시 ref로 넘겨주어야합니다.
        />
        <button onClick={this.onReset}>초기화</button>
      </div>
    );
  }
}

export default RefExample;
