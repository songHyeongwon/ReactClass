import React , {useState} from 'react';
import Counter from './Counter';
import Info from './Info';
import Average from './Average';
//깃허브 연결
const App = () => {
  const [visible , setVisible] = useState(false);
  return (
    <div>

      <button onClick={() => setVisible(!visible)}>{!visible ? "보이기" : "숨기기"}</button>
      <hr/>
      {visible && <Info/>}
      <hr/>
      <Counter/>
      <hr/>
      <Average/>
    </div>
  );
};

export default App;