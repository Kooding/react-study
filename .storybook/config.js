import { configure, setAddon } from "@storybook/react";
import interopRequireDefault from "babel-runtime/helpers/interopRequireDefault";
import JSXAddon from "storybook-addon-jsx";

import "../src/sass/materialize.scss";
function loadStories() {
  // require('../src/stories/InputStory');
  // // 스토리 파일을 이곳에 추가할 수 있습니다.
  // require('../src/stories/NewCounterStory');
  const context = require.context("../src/stories", true, /Story\.js$/);
  context.keys().forEach((srcFile) => {
    interopRequireDefault(context(srcFile));
  });
}

setAddon(JSXAddon);
configure(loadStories, module);
