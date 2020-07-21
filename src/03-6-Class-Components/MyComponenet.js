import React, { Component } from "react";

class MyComponent extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     number: 1
  //   };
  // }
  state = {
    number: 1
  };
  componentDidUpdate() {
    console.log("MyComponent componentDidUpdate() 호출됨");
  }
  render() {
    console.log("MyComponent render() 호출됨");
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

export default MyComponent;
