import React, { Component } from "react";

class Counter extends Component {
  /* 
  getDerivedStateFromProps() 함수는 
  상위 컴포넌트에서 전달 받은 props로 state값을 연동할 때 주로 사용되며
  반환값으로 state를 변경합니다.
  */
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps()");
    // console.log(nextProps, prevState);
    if (nextProps.username !== prevState.username) {
      return { username: nextProps.username };
    } else {
      return null;
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      count: 0
    };

    console.log("constructor()");
  }

  componentDidMount() {
    console.log("componentDidMount()");
    // 해당 컴포넌트가 브라우져에 보여지는 상태. 따라서 DOM에 접근가능
    console.log(document.querySelector(".count"));
  }

  shouldComponentUpdate(nextProps, nextState) {
    //주로 성능 최적화할때 쓰이는 메소드. 불필요한 렌더링을 막기위해 쓴다.
    // true를 반환하면 렌더링하고 false를 반환하면 렌더링을 하지 않는다.
    console.log("shouldComponentUpdate()");
    if (nextState !== this.state) {
      return true;
    }
    return false;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // DOM 업데이트가 일어나기 직전의 시점에 호출되는 함수.
    //이 메서드의 리턴값은 componentDidUpdate에서 함수의 세번째 인자 snapshot로 조회 할수 있다.
    console.log("getSnapshotBeforeUpdate()");
    console.log(prevProps, prevState);
    //업데이트가 되기전 상태값과 속성값을 리턴할수 있다.
    if (prevProps.username !== this.props.username) {
      return { username: prevProps.username };
    }
    return { username: prevProps.username };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 여기서 snapshot은 getSnapshotBeforeUpdate() 의 리턴값이다.
    console.log("componentDidUpdate()");
    console.log("업데이트 되기전 username: ", snapshot);
  }
  componentWillUnmount() {
    console.log("componentWillUnmount()");
  }
  onIncrease = () => {
    this.setState(prevState => (prevState.count += 1));
  };

  render() {
    console.log("render()");
    return (
      <>
        <div className="count">
          {this.state.username}의 count : {this.state.count}
        </div>
        <button onClick={this.onIncrease}>+1</button>
        <button onClick={() => this.forceUpdate()}>forceUpdate</button>
      </>
    );
  }
}

class LifecycleExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "koo",
      visible: true
    };
  }

  // onUpdate = () => {
  //   this.forceUpdate();
  // };
  onToggle = () => {
    this.setState({
      visible: !this.state.visible
    });
  };
  onChangeProps = () => {
    this.state.username === "koo"
      ? this.setState({ username: "park" })
      : this.setState({ username: "koo" });
  };
  onChange = e => {
    const { value, name } = e.target;
    console.log(value, name);
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <>
        {this.state.visible && <Counter username={this.state.username} />}
        <br />
        <button onClick={this.onChangeProps}>changProps</button>
        <br />
        <button onClick={this.onToggle}>show & hide Toggle</button>
        <br />
        <button
          onClick={() =>
            this.setState({
              ...this.state
            })
          }
        >
          setState
        </button>
      </>
    );
  }
}

export default LifecycleExample;
