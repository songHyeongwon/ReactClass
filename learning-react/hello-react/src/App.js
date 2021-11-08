import logo from './logo.svg';
import './App.css';

function App() {
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
      {/*주석은 이렇게 작성*/}
      {name === '송현권' ? <h1>나</h1> : <h1>너</h1>}
      {name === '송현권' ? <h1>null?</h1> : null}
      {und}undefined 내부변수는 상관없으나 리턴시 에러
    </div>
  );
}

export default App;
