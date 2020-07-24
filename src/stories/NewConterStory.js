import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import NewCounter from "../04-1-useStorybook/NewCounter";

storiesOf("테스트", module)
  .addWithJSX("기본 테스트", () => <NewCounter />)
  .addWithJSX("onClick 예제", () => (
    <NewCounter onLog={action("onLog이벤트 발생")} />
  ))
  .addWithJSX("actionTest", () => <NewCounter onLog={action("log")} />);
