import React, { Component } from 'react';

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  };
  myRef = null;
  constructor(props) {
    super(props);
    console.log('constructor 함수 실행 컴포넌트의 생성자메서드 = ', props);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      'getDerivedStateFromProps Props로 받아온값을 state에 동기화시키는 메서드 = ',
      nextProps,
      prevState
    );
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null; //변경안함
  }
  componentDidMount() {
    console.log(
      'componentDidMount 컴포넌트가 최초 랜더링을 마쳤을때 실행되는 메서드'
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      'shouldComponentUpdate props 또는 state를 변경했을때 리랜더링을 지정하는메서드 = ',
      nextProps,
      nextState
    );
    return nextState.number % 10 !== 4;
  }
  componentWillUnmount() {
    console.log('componentWillUnmount 컴포넌트를 DOM이 제거할때 실행');
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };
  getSnapshotBeforeUpdate(prevrops, prevState) {
    console.log(
      'getSnapshotBeforeUpdate 컴포넌트 업데이트직전의 값을 참조할때 사용 = ',
      prevrops,
      prevState
    );
    if (prevrops.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  componentDidUpdate(prevrops, prevState, snapshot) {
    console.log(
      'componentDidUpdate 리랜더링 완료후 실행되는 컴포넌트 = ',
      prevrops,
      prevState,
      snapshot
    );
    if (snapshot) {
      console.log('업데이트 되기전 색상 = ', snapshot);
    }
  }

  render() {
    console.log('render 컴포넌트를 그린다.');
    const style = {
      color: this.props.color,
    };
    return (
      <div>
          {/* 일부러 에러 만들기 */}
          {/* {this.state.missing.value} */}
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color : {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;
