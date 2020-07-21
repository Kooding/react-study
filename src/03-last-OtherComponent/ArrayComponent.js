import React from "react";
import FunctionalComponent from "./FunctionalComponent";

function ArrayComponent() {
  const componentArray = ["red", "blue", "green", "yellow"];
  return (
    <div>
      {componentArray.map(color => (
        <FunctionalComponent color={color} />
      ))}
    </div>
  );
}
export default ArrayComponent;
