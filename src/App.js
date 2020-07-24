import React from "react";
import Input from "./stories/Input";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  onChange = (name, value) => {
    console.log(name, value);
    this.setState({
      name: value
    });
  };
  render() {
    const { name } = this.state;
    return (
      <>
        <Input name={name} onChange={this.onChange} autoFocus />
      </>
    );
  }
}

export default App;
