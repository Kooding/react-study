import React from "react";
import Anchor from "./03-3.Props/Anchor";

// class Parent extends React.Component {
//   render() {
//     return <Child name="koo" age={27} />;
//   }
// }
// class Child extends React.Component {
//   render() {
//     console.log(this.props);
//     return (
//       <div>
//         My name is {this.props.name} I'm {this.props.age}
//       </div>
//     );
//   }
// }

function App() {
  return (
    //number 타입으로 넘겨줘야할 size가 string으로 넘어갔을때 오류!
    <>
      <Anchor path="./favicon.ico" blank size={40}>
        link
      </Anchor>
      <Anchor blank size="40">
        link
      </Anchor>
    </>
  );
}

export default App;
