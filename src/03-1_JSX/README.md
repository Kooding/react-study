# JSX란?

JavaScript XML의 줄임말로 '자바스크립트에 XML을 추가한 확장형 문법' 입니다.

## JSX 특징

```javascript
import React, { Component } from "react";

class Jsx extends Component {
  render() {
    return (
      <div>
        <Wrapper>
          <Component />
          <Component />
          <Component />
        </Wrapper>
      </div>
    );
  }
}

export default Jsx;
```

위 자바스크립트 코드를 보면 어색한 점이 보이는데 render함수 안에 HTML요소의 DIV 엘리먼트가 보이고 다른 이상한 태그들도 보입니다.
이는 JSX의 특징이며 이런 문법이 가능한 이유는 [babel](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&spec=false&loose=false&code_lz=BQKAkAPAJglgbgPhAAlciAjBAJApgG3wHsIB6LCAZwAcBDAOwQCFaMCyaGk11TZEQASiA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=script&lineWrap=true&presets=env%2Creact%2Cstage-2%2Cenv&prettier=false&targets=&version=7.10.5&externalPlugins=)을 통해서 javascript 문법으로 변환시켜 주기때문입니다.

## JSX의 장점

마치 HTML을 작성할때처럼 여러 Component들을 마크업하듯이 빠르게 화면을 구성할수 있다는것이 JSX의 장점이라고 할 수 있습니다.

## JSX의 규칙

1. 태그의 닫는 것을 반드시 명시 해주어야합니다.
   `<br>` 이나 `<input type='text' >`는
   `<br />` 와 `<input type='text' />`처럼 반드시 닫아주어야 합니다.
2. 두개이상의 태그는 꼭 하나의 태그로 감싸져 있어야 합니다.
   ```javascript
   class Jsx extends Component {
     render() {
       return (
         {/* 반드시 하나의 태그로 감싸져야함! */}
         {/*불필요한 div로 감싸는게 싫다면<></>로 감싸주어도 OK!*/}
         <div>
           <div></div>
           <div></div>
         </div>
       );
     }
   }
   ```
3. 태그와 컴포넌트를 구별하기위해 컴포넌트의 첫글자는 반드시 대문자로 시작하여야 합니다.
