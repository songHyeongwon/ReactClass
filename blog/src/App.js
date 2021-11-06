/* eslint-disable */

import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let [글제목,글제목수정] = useState(['남자 코트 추천' , '강남 우동 맛집', '파이썬 독학']);
  let posts = '강남고기 맛집';
  let [따봉, 따봉수정] = useState(0);
//주석추가
  function 제목바꾸기() {
    var arr = [...글제목];
    arr[0] = '여자 코트 추천';
    글제목수정(arr);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      <div className="list">
        <h3>{글제목[0]}
          <span onClick={() => { 따봉수정(따봉 + 1) } }>🤩</span> {따봉}
          <button onClick={제목바꾸기}>여자껀?</button>
        </h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3>{글제목[1]}</h3>
        <p>2월 18일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3>{글제목[2]}</h3>
        <p>2월 19일 발행</p>
        <hr/>
      </div>

      <Modal/>

    </div>
  );
}

function Modal() {
  return(
    <>
    <div className="modal">
      <h2>제목</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
    </>
  )
}

export default App;
