import React, { Component } from "react";

class Counter extends Component {
  render() {
    const { count, onAdd } = this.props;
    return (
      <div>
        <div>count: {count}</div>
        <button onClick={() => onAdd()}>+1</button>
      </div>
    );
  }
}

export default Counter;
