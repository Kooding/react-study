# 목차

1. [03-7 Functional Component](#-03-7-Functional-Component)
2. [03-8 ArrayComponent](#-03-8-ArrayComponent)
3. [03-9 컴포넌트에서 콜백 함수와 이벤트 처리하기](#-03-9-컴포넌트에서-콜백-함수와-이벤트-처리하기)

# 03-7 Functional Component

최신 리액트 버전에선 Hooks 를 사용해 클래스형 컴포넌트만 할 수 있었던 상태관리를 할 수 있었지만
Hooks가 도입되기 전 리액트에서는 함수형 컴포넌트를 Stateless Functional Component 라고 불렀습니다.
이름에서 알수 있듯이 함수형 컴포넌트에서는 state를 포함하지 않으며 생명주기 메소드 또한 사용할 수 없었습니다.

정리

- 함수형 컴포넌트는 state와 생명주기 함수를 사용할 수 없다. ( 현제는 hooks를 통해 가능 )
- 상위 컴포넌트로 부터 전달받은 props와 context 만을 이용하여 화면을 구성한다
- 단순한 구조의 UI 컴포넌트를 제작할때 사용 된다.

## 사용해보기

```javascript
import React from "react";

function FunctionalComponent(props) {
  //상위 컴포넌트에서 전달받은 props를 구조 분해 할당으로 받아올수있다.
  const { color, size } = props;
  return <button style={{ color, fontSize: size }}>BUTTON</button>;
}

export default FunctionalComponent;

//<FunctionalComponent color="blue" size={20} />;
```

# 03-8 ArrayComponent

우리가 만든 컴포넌트들을 배열에 담아 출력하는 방법에대해 알아보겠습니다.

```javascript
import React from "react";
import FunctionalComponent from "./FunctionalComponent";

function ArrayComponent() {
  const componentArray = [
    <FunctionalComponent color="red" />,
    <FunctionalComponent color="blue" />,
    <FunctionalComponent color="green" />
  ];
  return (
    <div>
      {componentArray[0]}
      {componentArray[1]}
      {componentArray[2]}
    </div>
  );
}
export default ArrayComponent;
```

하지만 이방법은 문제점이 많아 보입니다. component가 추가될때 마다 return에서 적어주는걸 수동적으로 적어주어야 합니다.
이문제를 해결하기 위해 array객체의 내장 함수 map() 함수를 사용해 개선해보도록 하겠습니다.

```javascript
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
```

배열에 전달할 props를 만들어놓고 배열의 요소의 수만큼 map을 통해 자동으로 컴포넌트를 만들어 출력하게 했습니다.
이때 주의해야할점은 배열을 통해 컴포넌트를 렌더링할때 `key` props를 정해줘야 하는데요 그 이유는
중간에 컴포넌트가 사라질때 다음순서의 컴포넌트를 재사용하지 못하고 새로그리기 때문입니다. 설정할때
key는 고유한 번호로 지정하는게 좋습니다.
(다음 방법은 추천하지 않습니다.)

```javascript
return (
  <div>
    {componentArray.map((color, index) => (
      <FunctionalComponent key={index} color={color} />
    ))}
  </div>
);
```

# 03-9 컴포넌트에서 콜백 함수와 이벤트 처리하기

이번에는 상위 컴포넌트에서 함수를 넘겨 처리하는 방법에 대해 알아보겠습니다.

## 콜백함수 사용해보기

```javascript
import React from "react";
import Counter from "./03-789-otherComponent/Counter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1
    };
    //첫번째 방법은 this의 범위를 App컴포넌트를 가르키도록 bind 해주는 방법.
    // this.onIncrease = this.onIncrease.bind(this);
  }
  // 두번째 방법은 Arrow Function으로 바꿔 this를 App컴포넌트를 가르키게하는방법.
  onIncrease() {
    this.setState(prevState => (prevState.number += 1));
  }

  render() {
    return <Counter count={this.state.number} onAdd={this.onIncrease} />;
  }
}

export default App;
```

App.js(상위 컴포넌트) 에서 함수를 정의해서 props로 넘겨주고 있습니다.

```javascript
import React, { Component } from "react";

class Counter extends Component {
  render() {
    //구조분해 할당으로 받아온 props를 각각 받아옵니다.
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
```

우리는 여기서 상위컴포넌트에서 받아온 함수를 콜백함수의 형태로 사용하고 있습니다.
하지만 오류가 나게 되는데요 이것은 하위 컴포넌트에서 불러온 함수의 this가 제대로 app컴포넌트를 가르키지 않았기 때문입니다.
이 오류는 this를 상위컴포넌트인 App컴포넌트를 가르키면 해결 가능합니다.

## this 문제를 해결하는 두가지 방법

1. `bind()` 함수를 사용해 this를 묶어서 전달해주는 방법이있습니다.

```javascript
  constructor(props){
    ...
    this.onIncrease = this.onIncrease.bind(this);
  }
```

하지만 이방법은 매번 새로운 메소드를 정의할때마다 똑같은 작업을 반복적으로 해야한다는것입니다.

2. Arrow Function 을 사용해 this문제 해결하기

```javascript
  onIncrease = () => {
    this.setState(...)
  }
```

Arrow Function을 사용하게되면 첫번째 방법의 문제점을 해결 할 수 있습니다. 이 이유는 Arrow Function의 특징인 this 바인딩을 건너 뛰는 특징이 있기 때문인데 자세한 건 ES6를 참고 하시면 될것같습니다.

## 컴포넌트에서 DOM객체를 받아오는 방법

여기에서는 Ref로 DOM객체를 받아오는 방법에대해 알아보겠습니다.

```javascript
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
```

[위 예제](./RefExample.js)는 간단한 입력을 받아 그대로 화면에 출력해주는 컴포넌트입니다.
초기화 버튼을 누르면 state가 초기화 되면서 사라지지만 값만 사라질뿐 input안에 focus를 주진 못합니다.
직접 DOM객체 함수를 사용하기 위해서 Ref를 선언하고 해당 요소에 ref설정해주면 ref를 통해 DOM객체를 받아올 수있습니다.
