## Component 와 PureComponent의 차이점과 장단점

클래스형 컴포넌트는 두 종류의 클래스 *Component*와 *PureComponent*를 사용하는데

두 클래스의 차이점과 장단점을 알아보겠습니다.

```javascript
// 일반 컴포넌트
class MyComponent extends Component {
  state = { number: 1 };
  render() {
    return (
      <div>
        <div>{this.state.number}</div>
        <button onClick={() => this.setState({ number: 1 })}>
          Render_Check
        </button>
      </div>
    );
  }
}
```

일반적으로 자주 쓰던 컴포넌트입니다. 이 컴포넌트는 무조건 버튼을 누를때마다 같은 화면을 불필요하게 매번 렌더링 시킵니다.
`React.PuerComponent` 클래스를 상속받은 PuerComponent 는 자체적으로 `shouldComponentUpdate()`가 이미 적용되어 재렌더링 될때
불필요한 state 변화를 감지하고 재렌더링을 줄여 성능을 극대화 할수 있다는 장점이있습니다.

```javascript
class PureComponent extends React.PureComponent {
  state = { number = 1 }
  //shouldComponentUpdate() 가 정의되어있지 않아도 자체적으로 shallow compare(얕은 비교)를 통해 state를 비교한다.
  render() {
    console.log("PureComponent render() 호출됨");
    return (
      <div>
        <div>{this.state.number}</div>
        <button onClick={() => this.setState({ number: 1 })}>
          Render_Check
        </button>
      </div>
    );
  }
}
```

[MyComponent](./MyComponent.js)에서 `extends React.PureComponent`부분만 바뀌었습니다. 이 컴포넌트는 setState할때 변화된 값이 없다면 렌더링하지않게 한다는 장점이있습니다.
주의 해야할점은 PureComponent는 얕은복사를 한다는 것입니다. 즉, state 값이 원시타입이 아니라 참조타입의 object, array, funcion.. 등이라면
object의 속성을 비교하는것이 아니라 reference 값을 비교하기 때문에 항상 다른 값으로 체크할것이고 기존 컴포넌트와
똑같이 매번 불필요한 렌더링을 하게 될것입니다.

```javascript
class PureComponent extends React.PureComponent {
  //이 경우에는 매번 render() 함수가 호출되며 불필요한 렌더링이 발생한다.
  state = {
    number: { test: 1 }
  };
  render() {
    console.log("PureComponent render() 호출됨");
    return (
      <div>
        <div>{this.state.number.test}</div>
        <button onClick={() => this.setState({ number: { test: 1 } })}>
          Render_Check
        </button>
      </div>
    );
  }
}
```

## 정리

pureComponent는 shouldComponentUpdate가 이미 적용된 버전의 React.Component이다.
pureComponent는 shouldComponentUpdate 를 수행할때 shallow compare를 수행합니다

불필요한 state 변화감지 그리고 이로인한, 재렌더링을 줄임으로써 성능을 극대화 할수 있습니다.

단점은Pure Component는 shallow level에서만 데이터를 비교하기 때문에
복잡한 구조의 데이터는 비교하지 못하므로 결국엔 shouldComponentUpdate를 직접 다뤄야 하는 상황이 발생함
