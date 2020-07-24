# 설치

yarn으로 스토리북 설치를 해줍니다.

```Bash
yarn add --dev @stroybook/react
```

yarn이 설치 되지 않았다면 아래 방법으로 설치 가능합니다.

```Bash
npm install -g yarn
//or
brew install yarn
```

# 설정 - 실행 명령어 추가하기

```json
//package.json
...
"script" : {
  ...
  "storybook" : "start-storybook -p 9001 -c .storybook",
  ...
}
```

package.json에 script 부분에 실행 명령어를 추가 합니다.

# 사용방법

## 1. 스토리 파일 만들기

src 디렉토리 안에 stories 폴더를 만들어 관리하겠습니다.  
`InputStoty.js` 라는 이름으로 파일을 만들어 준뒤 아래 내용을 작성합니다.

```javascript
// InputStoty.js
import React from "react";
import { storiseOf } from "@storybook/react";

//테스트할 컴포넌트를 import 해줍니다.
import Input from "../src/.../Input";
//storiseOf('스토리의 이름', module)
//.add('스토리의 메뉴 이름', () => <Input />)
storiseOf("Input", module).add("기본 설정", () => <Input />);
```

## 2. 스토리북 config.js에 스토리 연결하기

위에서 만든 스토리를 스토리북 config.js에 연결해 보겠습니다.  
스토리를 스토리북에 연결하려면 프로젝트 루트 폴더에 `.storybook`폴더를 생성해야 합니다.

폴더를 만들었다면 그안에 config.js라는 파일을 만들어 다음과 같이 작성해주세요.

```javascript
import { configure } from "@storybook/react";

function loadStories() {
  require("../src/stories/InputStory");
  // 스토리 파일을 이곳에 추가할 수 있습니다.
  // require('../src/stories/NewCounterStory');
}

configure(loadStories, module);
```

스토리 파일을 연결했으니 실행해보도록 하겠습니다.

```Bash
yarn storybook
```

실행 명령어에서 설정한 대로 localhost:9001로 자동으로 접속될것입니다.

## 3. 다른 형태의 컴포넌트 추가하기

위 [스토리 파일 만들기](##-1.-스토리-파일-만들기) 에서 작성했던 [IputStory.js](../stories/InputStory.js) 파일에서 다른 형태의 컴포넌트를 추가해보겠습니다.

```javascript
mport React from "react";
import { storiseOf } from "@storybook/react";

//테스트할 컴포넌트를 import 해줍니다.
import Input from "../src/.../Input";
//storiseOf('스토리의 이름', module)
//.add('스토리의 메뉴 이름', () => <Input />).add(...).add(...)계속 추가 할수 있습니다.
storiseOf("Input", module)
  .add("기본 설정", () => <Input />)
  .add("다른 설정", () =: <Input label="test" />);
```

이렇게 스토리에 여러 형태의 컴포넌트를 추가해 여러가지 테스트를 할 수 있을 것 입니다.

## 4. 스토리 추가하기

InputStory.js 말고 다른 스토리를 추가해보도록하겠습니다.
sotries 폴더에서 NewCounterStory.js 파일을 만들어 아래와 같이 작성해줍니다.

```javascript
import React from "react";
import { storiseOf } from "@storybook/react";

//테스트할 컴포넌트를 import 해줍니다.
import NewCounter from "../src/.../NewCounter";

storiseOf("NewCounter", module).add("기본 설정", () => (
  <NewCounter count={0} />
));
```

## 5. 스토리북에 스토리 추가하기

`.storybook` 폴더에 `config.js` 파일을 수정해줍니다.

```javascript
import { configure } from "@storybook/react";

function loadStories() {
  require("../src/stories/InputStory");
  // 스토리 파일을 이곳에 추가할 수 있습니다.
  require("../src/stories/NewCounterStory");
}

configure(loadStories, module);
```

하지만 매번 스토리를 추가할때마다 `config.js`를 수정해야한다면 불편하고 귀찮은 일이 되어 버립니다.

## 6. 스토리북에 자동으로 스토리 추가하기

스토리가 자동으로 스토리북에 추가 되도록 `config.js` 파일을 아래와 같이 수정 하겠습니다.

```javascript
import { configure } from "@storybook/react";
import interopRequireDefault from "babel-runtime/helpers/interopRequireDefault";
function loadStories() {
  // require('../src/stories/InputStory');
  // // 스토리 파일을 이곳에 추가할 수 있습니다.
  // require('../src/stories/NewCounterStory');
  const context = require.context("../src/stories", true, /Story\.js$/);
  context.keys().forEach((srcFile) => {
    interopRequireDefault(context(srcFile));
  });
}

configure(loadStories, module);
```

## 7. 스토리북 확장 도구 추가하기

이벤트 작동 테스트와 컴포넌트 사용 코드를 출력하기위한 확장 도구인
`addon-actions`과 `addon-jsx`를 설치 하고 사용해 보겠습니다.

### 7-1 addon-actions와 addon-jsx 설치하기 및 설정 추가 하기

addon-actions는 스토리북에서 발생하는 특정 이벤트에 로그를 출력하게 해줍니다.
addon-jsx는 스토리북에서 바로 jsx 코드를 확인할 수 있도록 해주는 확장 도구 입니다.

```Bash
yarn add @storybook/addons @storybook/addon-actions //addon-action 설치
yarn add storybook-addon-jsx // addon-jsx 설치
```

### 7-2 addon-actions와 addon-jsx 설정 추가하기

`.storybook` 폴더에 `addons.js` 라는 파일을 만들고 아래와 같이 입력해줍니다.

```javascript
// 확장 도구는 이곳에 추가해주면 됩니다.
import "@storybook/addon-actions/register";
import "storybook-addon-jsx/register";
```

### 7-3 addon-actions을 적용하기

```javascript
storiesOf("[test]", module).add("actionTest", () => (
  <Component onEvent={action("log")} />
));
```

이 컴포넌트는 변경 이벤트가 발생하면 onChange 프로퍼티에 전달한 콜백 함수를 실행합니다.

### 7-4 addon-jsx 적용하기

addon-jsx를 사용하기위해서 기본 config.js를 수정 하겠습니다.

```javascript
// in config.js
import { configure, setAddon } from "@storybook/react";
import interopRequireDefault from "babel-runtime/helpers/interopRequireDefault";
import JSXAddon from "storybook-addon-jsx";

function loadStories() {
  const context = require.context("../src/stories", true, /Story\.js$/);
  context.keys().forEach((srcFile) => {
    interopRequireDefault(context(srcFile));
  });
}

setAddon(JSXAddon);
configure(loadStories, module);
```

```javascript
import React from "react";
import { storiesOf } from "@storybook/react";

import Input from "./Input";

//addon-jsx를 사용하기 위해서 add() 함수 대신 addWithJSX() 함수를 사용합니다.
storiesOf("Input", module).addWithJSX("기본 설정", () => <Input name="name" />);
```
