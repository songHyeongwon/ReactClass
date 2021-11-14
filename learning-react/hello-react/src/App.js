//import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import LifeCycleSample from './LifeCycleSample';
import ErrorBoundary from './ErrorBoundary';
//import IterationSample from './IterationSample';
//import MyComponent from './MyComponent';
//import Counter from './Counter';
//import Say from './Say';
//import EventPractice from './EventPractice';
//import EventPractice2 from './EventPractice2';
//import ValidationSample from './ValidationSample';
//import ScrollBox from './ScrollBox';
//import React, { Component } from 'react';
// import ScrollBox from './ScrollBox';

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
  state = {
    color: '#000000',
  };
  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <ErrorBoundary>
          <LifeCycleSample color={this.state.color} />
        </ErrorBoundary>
      </div>
    );
  }
}
export default App;

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <IterationSample/>
//       </div>
//     );
//   }
// }
// export default App;

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <ScrollBox ref={ref => (this.scrollBox = ref)} />
//         <button onClick={() => this.scrollBox.scrollToBottom()}>
//           맨 밑으로
//         </button>
//       </div>
//     );
//   }
// }
// export default App;

// const App = () => {
//   const name = '송현권';
//   return (
//     <div>
//       <ScrollBox ref={(a) => this.aa=a} />
//       <button onClick={()=> this.scrollBox1.scrollToBottom()}>맨아래로</button>
//       {/* <ValidationSample/> */}
//       {/* <EventPractice /> */}
//       {/* <EventPractice2/> */}
//       {/* 아{' '} */}
//       {/* <MyComponent name={name} numType={10}>
//         칠드런
//       </MyComponent>
//       <Counter />
//       <Say></Say> */}
//     </div>
//   );
// };

/*class App extends Component {
  render() {
    const name = "송현권";
    const style = {
      backgroundColor: 'black',
      color: 'aqua',
      fontSize: '48px',
      fontWeigth: 'bold',
      padding: 16,
    };
    return <div className="App" style={style}>{name}</div>;
  }
}*/

/*function App() {
  const name = '송현권';
  const und = undefined;
  //스타일 작성시에는 카멜표기법 background-Color => backgroundColor
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: '48px',
    fontWeigth: 'bold',
    padding: 16,
  };
  return (
    <div className="App" style={style}>
      <h1>{name} 헬로</h1>
      <h2 className="react">굿모닝</h2>
      {//주석은 이렇게 작성}
      {name === '송현권' ? <h1>나</h1> : <h1>너</h1>}
      {name === '송현권' ? <h1>null?</h1> : null}
      {und}undefined 내부변수는 상관없으나 리턴시 에러
    </div>
  );
}*/

//export default App;
