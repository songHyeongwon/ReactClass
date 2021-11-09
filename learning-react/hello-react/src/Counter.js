import React, { Component } from 'react';

class Counter extends Component {
    state = {
        number: 0,
        fixdeNumber: 0,
    };
  /* state 초기값 지정
  constructor(props) {
    super(props);
    //초기값 설정
    this.state = {
      number: 0,
      fixdeNumber: 0,
    };
  }*/

  render() {
    const { number,fixdeNumber } = this.state;

    return (
      <div>
        <h1>{number}</h1>
        <h2>앤 안바뀜 {fixdeNumber} </h2>
        <button
          onClick={() => {
            this.setState(pre => {
                return {
                    number : pre.number + 1
                }
            }, () => {
                console.log("콜백 실행");
            }
                /*{ number: number + 1 }*/);
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
