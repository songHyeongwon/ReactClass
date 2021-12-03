import React from 'react';
//import Todos from './components/Todos';
//import Counter from './components/Counter';
import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';

const App = () => {
  return (
    <div>
      <CounterContainer/>
      <hr/>
      <TodosContainer/>
    </div>
  );
};

export default App;