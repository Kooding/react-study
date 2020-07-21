import React from "react";

function FunctionalComponent(props) {
  //상위 컴포넌트에서 전달받은 props를 구조 분해 할당으로 받아올수있다.
  const { color, size } = props;
  return <button style={{ color, fontSize: size }}>BUTTON</button>;
}

FunctionalComponent.defaultProps = {
  size: 20
};

export default FunctionalComponent;
