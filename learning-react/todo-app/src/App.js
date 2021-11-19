import React, { useReducer, useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodes() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `최적화를 위해 다량의 데이터 입력 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  //const [todos, setTodos] = useState(createBulkTodes);
  const [todos, dispatch] = useReducer(todoReducer , undefined , createBulkTodes);
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: '리액트의 기초 알아보기',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: '컴포넌트 스타일링해 보기',
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: '일정 관리 앱 만들어 보기',
  //     checked: false,
  //   },
  // ]);

  // 고유 값으로 사용 될 id
  // ref 를 사용하여 변수 담기
  const nextId = useRef(2501);

  // const onInsert = useCallback(
  //   text => {
  //     const todo = {
  //       id: nextId.current,
  //       text,
  //       checked: false,
  //     };
  //     setTodos(todos => todos.concat(todo));
  //     nextId.current += 1; // nextId 1 씩 더하기
  //   },
  //   [],
  // );

  // const onRemove = useCallback(
  //   id => {
  //     setTodos(todos => todos.filter(todo => todo.id !== id));
  //   },
  //   [],
  // );

  // const onToggle = useCallback(
  //   id => {
  //     setTodos(todos =>
  //       todos.map(todo =>
  //         todo.id === id ? { ...todo, checked: !todo.checked } : todo,
  //       ),
  //     );
  //   },
  //   [],
  // );

  //useReducer로 구현하기 기존 함수방식 주석
  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({type : 'INSERT' , todo});
    nextId.current += 1; // nextId 1 씩 더하기
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({type : 'REMOVE' , id});
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({type : 'TOGGLE' , id});
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
