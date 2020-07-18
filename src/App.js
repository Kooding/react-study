import React from "react";
import Anchor from "./03-3.Props&State/Anchor";

function App() {
  return (
    //number 타입으로 넘겨줘야할 size가 string으로 넘어갔을때 오류!
    <Anchor path="./favicon.ico" blank={false} size="40">
      link
    </Anchor>
  );
}

export default App;
