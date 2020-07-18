# 목차

props
props type 검사
default props
props 구조분해할당

# props와 state.

리액트에서는 상위 컴포넌트가 하위 컴포넌트에게 전달하는 값인 속성값(Props)와
컴포넌트안에서 생성되어 관리되는 상태값(State)가 있습니다.
특징적인 차이점은 props는 수정 불가능한 읽기전용 값이며 State는 변경가능한 값이라는 것입니다.
이둘의 차이점을 아는 것은 중요하다고 할 수 있습니다.

리액트에서는 state나 props 변경되면 리액트가 렌더 함수를 이용해서 화면을 자동으로 갱신해 준다.

## props로 값전달하기

```javascript
import React from "react";
import ReactDOM from "react-dom";
class Parent extends React.Component {
  render() {
    return <Child name="foo" />;
  }
}

class Child extends React.Component {
  render() {
    return <div>I'm {this.props.name}</div>;
  }
}

ReactDOM.render(<Parent />, document.getElementById("root"));
```

위 코드에서 상위 컴포넌트(Parent)가 하위 컴포넌트(Child)에게 JSX 어트리뷰트를 통해 'foo'라는 문자열을 props로 넘겨주고있습니다.

하위 컴포넌트 Child에서는 this.props 로 넘겨받은 Props의 key에 접근해 값을 읽어올수 있습니다.

만약 상위 컴포넌트에서 `<Child>foo</Child>` 라고 했다면 foo는 Child에서 this.props.children으로 접근 가능합니다.

## Props의 타입을 검사하는 방법

Props의 타입을 검사하는 이유는 개발 규모가 커질수록 전달되는 데이터의 양도 많아지기 때문에 원치 않은 실수로인해
다른 자료형의값이 들어간다면 예기치 못한 버그가 발생하게 될 수 있습니다. 타입을 검사하기 위한 TypeScript와 같은 도구들이 있지만 리액트에서는 내장된 기능인 **propTypes를** 통해 타입을 검사할수 있습니다.

> prop에 유효하지 않은 값이 전달 되었을 때, 경고문이 JavaScript 콘솔을 통해 보일 것입니다. propTypes는 성능상의 이유로 개발 모드(Development mode) 에서만 확인될 것입니다.

```javascript
import React from "react";
// propTypes 사용하기위해 import
import PropTypes from "prop-types";

class Anchor extends React.Component {
  render() {
    const { path, blank, size, children } = this.props;
    return (
      <a
        href={path}
        target={blank ? "_blank" : "_self"}
        style={{ fontSize: size }}
      >
        {children}
      </a>

    );
  }
}

// in App.js ..
class App extends Component{
  ...
  render() {
    return <Anchor path='www.naver.com' blank size={20}>link</Anchor>
  }
}

```

위 예제에서는 부모 컴포넌트(App.js)로 부터 path와 blank size의 속성값을 받아와 Anchor 태그를 렌더링하는 컴포넌트의 예제입니다.

Anchor 컴포넌트는 결과 적으로

```html
<a href="www.naver.con" target="_self" style=" fontSize: 20px; ">link</a>
```

라는 태그를 렌더링하게 될것입니다.

하지만 상위 컴포넌트에서 size의 속성값을 `size={20}` 이 아니라 `size="20"` 이라고 주면 어떻게 될까요?
Anchor 컴포넌트에서 fontsize의 값이 숫자가 아니라 문자열 형태로 들어가게 될것이며 결국 fontsize는 적용되지 않을것입니다. 이것은 분명 의도치않은 오류이며 버그라고 할 수 있습니다.

하지만 propTypes는 prop에 유효하지 않은 값이 전달 되었을 때, 경고문이 JavaScript 콘솔을 통해 경고창을 보여주게 될것입니다.

![콘솔의 결고 메세지](/src/images/error.png)

## default props

위에서는 전달 받을 props의 대한 데이터 타입을 미리 선언하여 예기치 못한 데이터타입이 들어왔을때 경고해주는 방법을 배웠습니다.

이번에는 전달 받을 props의 아무 값도 들어오지 않을때 기본값을 설정해주는 방법에대해 배워 보겠습니다.

```javascript
```
