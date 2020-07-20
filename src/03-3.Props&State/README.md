# 목차

1. [props와 state.](#-props와-state.)
2. [props로 값전달하기](##-props로-값전달하기)
3. [Props의 타입을 검사하는 방법](##-Props의-타입을-검사하는-방법)
4. [boolean Property](##-boolean-Property)
5. [default props](##-default-props)

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
    return <Child name="koo" age={27} />;
  }
}

class Child extends React.Component {
  render() {
    return (
      <div>
        My name is {this.props.name} I'm {this.props.age}
      </div>
    );
  }

ReactDOM.render(<Parent />, document.getElementById("root"));
```

위 코드에서 상위 컴포넌트(Parent)가 하위 컴포넌트(Child)에게 JSX 어트리뷰트를 통해 name과 age를 props로 넘겨주고있습니다.

하위 컴포넌트 Child에서는 this.props 로 상위컴포넌트에서 넘겨받은 값을 사용 할 수 있게 됩니다.

이때 `this.props`를 `console.log(this.props)`로 확인해보면 `{name: "koo", age: 27}`과 같이 객체 형태로 넘어오기 때문에 key를 통해 value값에 접근할수 있습니다.

> 만약 상위 컴포넌트에서 `<Child>koo</Child>` 라고 했다면 foo는 Child 컴포넌트 에서 `this.props.children`으로 접근 가능합니다.

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
// 여기에서 타입을 정의.
Anchor.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  blank: PropTypes.bool,
  size: PropTypes.number
};

// in App.js ..
class App extends Component{
  ...
  render() {
    return (
      <>
        <Anchor path='www.naver.com' blank size={20}>link</Anchor>
        <Anchor path='www.naver.com' blank size="20">link</Anchor>
      </>
    )
  }
}

```

위 예제에서는 부모 컴포넌트(App.js)로 부터 path와 blank size의 속성값을 받아와 Anchor 태그를 렌더링하는 컴포넌트의 예제입니다.

Anchor 컴포넌트는 개발자의 의도대로 제대로 된 props가 넘어 온다면 결과 적으로

```html
<a href="www.naver.con" target="_self" style=" fontSize: 20px; ">link</a>
```

라는 태그를 렌더링하게 될것입니다.

하지만 상위 컴포넌트에서 size의 속성값을 `size={20}` 이 아니라 `size="20"` 이라고 주면 어떻게 될까요?
Anchor 컴포넌트에서 fontsize의 값이 숫자가 아니라 문자열 형태로 들어가게 될것이며 결국 fontsize는 적용되지 않을것입니다. 이것은 분명 의도치않은 오류이며 버그라고 할 수 있습니다.

하지만 propTypes를 사용하면 prop에 유효하지 않은 값이 전달 되었을 때 경고문이 JavaScript 콘솔을 통해 경고창을 보여주게 될것입니다.

> \*_주의_ - propTypes 오타에 주의 하자

![콘솔의 결고 메세지](/src/images/error.png "에러메세지")

## boolean Property

상위 컴포넌트에서 props를 넘겨줄때 값이 true인 boolean 타입일 경우 프로퍼티 이름만 넘겨도 true로 넘겨지게 됩니다.

```html
<Anchor path="www.naver.com" blank size="{20}">link</Anchor>
```

위 코드에서 blank는 아무값이 없는게 아니라 black={true}로 넘겨준것 입니다.

## 필수 프로퍼티 사용하기

필수 프로퍼티란 특정 컴포넌트에 꼭 전달되어야 하는 값이 있을때 사용하는 방법입니다.

예를 들어 a태그를 렌더링하는 Anchor 컴포넌트에 path를 넘겨주지 않는다면 렌더링 되는 a태그는 아무런 기능이 없는 글자만 렌더링 될것입니다.

```javascript
class App extends React.Component{
  render() {
    return (
      <Anchor path="www.naver.com">link</Anchor>
      // <a herf="www.naver.com">link</a>
      <Anchor >link</Anchor>
      // <a>link</a>
    )
  }
}
```

path를 넘겨주지 않았을 때 경고로 알려주기 위한 방법은 아주 간단합니다. 타입 검사할때 설정해주었던
값에 `isRequired`라는 특수 변수를 사용해주면 개발자 콘솔에 경고를 뛰워주게 됩니다.

```javascript
// in Anchor Component
class Achor extends React.Component {
  ...생략
}
Anchor.propTypes = {
  path: PropTypes.string.isRequired,
  ...생략...
```

## default props

이번에는 전달 받을 props의 아무 값도 들어오지 않을때 기본값을 설정해주는 방법에대해 배워 보겠습니다.

위 예제에서 Anchor 컴포넌트에서 path를 넘겨 받지 않았을때 값을 설정해보겠습니다.

```javascript
class Achor extends React.Component {
  ...
}
Achor.defaultProps = {
  path : 'www.naver.com' // 기본값으로 설정할 값
}
```

자, 이제 path를 넘겨주지 않더라도 기본적으로 `Achor.defaultProps` 안에 있는 값으로 설정 될 것 입니다.
