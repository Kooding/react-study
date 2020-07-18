# 목차

1. [Component란?](#-Component란?)
2. [Component 만들어보기](#-Component-만들어보기)
3. [직접 만든 Component를 화면에 띄워 보기](#-직접-만든-Component를-화면에-띄워-보기)

# Component란?

리액트의 공식 홈페이지에서 리액트를 “A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES”
UI를 만들기 위한 자바스크립트 라이브러리 라고 소개하고 있습니다.

리액트에서 컴포넌트는 UI를 이루는 작은 단위라고 할 수 있습니다. 컴포넌트는 작은 Button이 될 수도 있고 폼, 다이얼로그, 화면 등의 모든 것들이 흔히 컴포넌트로 표현될수 있습니다. 이렇게 만든 컴포넌트는 재사용해서 여러곳에서 사용가능하며 다른 개발자가 만든 컴포넌트를 불러와 사용 할 수도 있을 것 입니다.

# Component 만들어보기

컴포넌트는 es6문법인 class를 사용하여 정의할수도 있고
function(함수)를 사용해서 만들 수 있습니다.

```javascript
import React, { Component } from "react";
// 클래스 컴포넌트
class MyComponent extends Component {
  render() {
    return <button>I'm Component</button>;
  }
}
// 함수 컴포넌트
function MyComponent() {
  return <button>I'm Component</button>;
}

//두 컴포넌트의 렌더링 결과는 같습니다.

export default MyComponent;
```

단순한 버튼 컴포넌트를 만들어 보았습니다. 클래스 컴포넌트에서 화면을 그리는 모든 코드를 render함수 안에 작성해야 합니다.

위 컴포넌트는 button요소를 만드는 컴포넌트입니다.
이 컴포넌트를 다른 곳에서 불러와 사용할 수 있게 export 로 내보내서 index.js에서 불러와 사용해보도록 하겠습니다.

# 직접 만든 Component를 화면에 띄워 보기

```javascript
// in index.js
import React from "react";
import ReactDOM from "react-dom";
import MyComponent from "./src/MyComponent";

ReactDOM.render(<MyComponent />, document.getElementById("root"));
```

좀 전에 만든 MyComponent를 index.js 에서 import해서 불러와 주고
실질적으로 화면에 렌더해주는 ReactDOM 의 render 함수를 통해 컴포넌트를 화면에 출력할수 있습니다.
`ReactDOM.render(element, container[,callback])` 은 첫번째 인자로 react element 를 넘겨주고
두번째 인자로 DOM 노드를 선택하는데 이 DOM 노드 안에 모든 elements 가 렌더링 되기 때문에 이를
root 노드라고도 불립니다.
React element는 `<div />`나 `<span></span>`이 될수도 있고 사용자가 만든 컴포넌트도 될 수 있습니다.
render함수는 이전에 렌더링 된 결과가 있다면 다음 렌더링 될때 이전 렌더링 결과와 비교하여 변화된 부분만 변경되어 보여지게 됩니다.

또한 컴포넌트에서 다른 컴포넌트도 출력 가능합니다. [리액트 공식 문서](https://ko.reactjs.org/docs/components-and-props.html) 에서는 이를 Composing Components 번역된 이름으론 컴포넌트 합성 이라 합니다.

```javascript
// in index.js
import React from "react";
import ReactDOM from "react-dom";
import MyComponent from "./src/MyComponent";

class App extends React.Component {
  render() {
    //App 컴포넌트에서 MyComponent를 불러오고 있습니다.
    return (
      <div>
        <MyComponent />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```

## **여기서 잠깐!**

컴포넌트의 이름은 항상 대문자로 시작합니다.

React는 **소문자로 시작하는 Element는 DOM 태그로 처리합니다.** 예를 들어 `<div />`는 HTML div 태그를 나타내지만, `<Div />`은 컴포넌트를 나타내며 당연히 Div 라는 이름의 컴포넌트가 정의되고 불러올 수 있어야 합니다.
