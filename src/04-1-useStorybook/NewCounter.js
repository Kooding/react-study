import React, { useState } from "react";

function NewCounter(props) {
  const [count, setCount] = useState(0);
  const onIncrease = () => {
    props.onLog(count);
    setCount(prevCount => prevCount + 1);
  };
  const onDecrease = () => {
    setCount(prevCount => prevCount - 1);
  };
  return (
    <div>
      <div>count : {count}</div>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={props.onClick}>-1</button>
    </div>
  );
}

export default NewCounter;
