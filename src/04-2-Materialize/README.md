# CDN 방식으로 머티리얼 디자인 적용하기

머티리얼 디자인이란 구글에서 공개한 디자인 가이드를 말합니다.
[머티리얼 디자인 주소](https://materializecss.com/)

```html
<!-- Compiled and minified CSS -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
/>

<!-- Compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
```

# 파일 방식으로 머티리얼 디자인 적용하기.

[머티리얼 디자인 공식 사이트](https://materializecss.com/)에 접속하여 [GET STARTED]를 선택하고 MATERUALIZE.zip 파일을 받아 압축을 해제합니다.
파일 안에 materialize.css 파일을 찾아 복사한다음 리액트 프로젝트 src 폴더에 붙여넣기한뒤 app.js에 적용하면 됩니다.

```js
import React from "react";
import Test from "./test/Test";
import "./materialize.css";
class App extends React.Component {
  render() {
    return <Test />;
  }
}

export default App;
```

# SASS로 머티리얼 적용하기

[머티리얼 디자인 공식 사이트](https://materializecss.com/)에 접속하여 Sass 파일을 받아준뒤 압축을 해제하고 sass 폴더를 src 폴더에 붙여넣어줍니다.

그리고 app.js 파일에 import './sass/materialize.scss'; 추가해 임포트해주세요.

```js
import React from "react";
import Test from "./test/Test";
import "./sass/materialize.scss";
class App extends React.Component {
  render() {
    return <Test />;
  }
}

export default App;
```

만약 오류가 난다면 node-sass 라이브러리가 설치되어 있지 않아서 생기는 오류입니다.
node-sass 라이브러리는 scss파일을 컴파일 하여 css파일로 생성해주는 라이브러리입니다.
설치가 끝나면 다시 리액트 서버를 구동해보세요.

```Bash
yarn add node-sass
```

# scss 파일을 수정하여 새 스타일 적용해보기

위 CSS파일로 적용했을때 단점은 수정,관리가 어렵다는 단점이있습니다. 예를 들어 핑크톤의 기본 테마색상을 변경하기 위해서는 전체 css파일을 수정해야 합니다.
이런 단점을 보완한 scss를 사용해보겠습니다. scss파일을 수정하여 상단 내비의 바탕색을 변경해보겠습니다.

sass/components 폴더에 있는 `\_variables.scss` 파일을 열어 수정해 바꿀수 있습니다.

```scss
//in _variables.scss
// 1. Colors
// ==========================================================================

// $primary-color: color("materialize-red", "lighten-2") !default;
$primary-color: color(
  "materialize-red",
  "lighten-3"
) !default; // 'lighten-3으로 바꿨습니다.
$primary-color-light: lighten($primary-color, 15%) !default;
$primary-color-dark: darken($primary-color, 15%) !default;
```

이렇게 scss는 변수를 통해 스타일을 손쉽게 변경할 수 있습니다. 이외에도 scss는 조건문, 반복문, 반응형 웹 디자인과 같은 여러 기능이 있습니다.

# 머티리얼 디자인이 적용된 입력 컨포넌트 만들기

예제 컴포넌트를 만들어 보겠습니다.

[예제 컴포넌트](./InputWithStyle.js)

## 예제 컴포넌트를 스토리 만들어 스토리북에 추가하기

```js
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Input from "../04-2-css/InputWithStyle"; // 예제 컴포넌트를 불러옵니다.

storiesOf("Input", module)
  .addWithJSX("기본 설정", () => <Input name="name" />)
  .addWithJSX("label 예제", () => <Input name="name" label="이름" />)
  .addWithJSX("onChange 예제", () => (
    <Input name="name" onChange={action("onChange 발생")} />
  ))
  .addWithJSX("errorMessage 예제", () => (
    <Input name="name" label="이름" errorMessage="이름을 입력해주세요" />
  ));
```

## 스토리북 서버에 sass-loader 설정하기

### 1. 설치

```Bash
yarn add sass-loader
```

### 2. 설정하기

sass-loader를 스토리북에 설정하려면 .storybook 폴더에 webpack.confing.js 파일을 만들어 다음과 같이 만듭니다.

```js
const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ["sass-loader"],
        include: path.resolve(__dirname, "../"),
      },
    ],
  },
};
```

그 다음 config.js에 materialize.scss를 임포트 합니다.

```js
import "../src/sass/materialize.scss";
```

이제 storybook 서버를 다시 구동한 다음 적용한 예제를 보면 머티리얼 디자인이 제대로 적용되었음을 확인할수 있습니다.
자세한 사용 방법은 [Materialize 공식 웹사이트](https://materializecss.com/)를 참조하세요.
