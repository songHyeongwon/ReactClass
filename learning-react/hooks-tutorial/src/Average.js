import React, { useState, useMemo, useCallback, useRef } from "react";
const getAverage = (number) => {
  console.log("평균값 계산중");
  if (number.length === 0) return 0;
  const sum = number.reduce((a, b) => a + b);
  return sum / number.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const inputEl = useRef(null);
  const avg = useMemo(() => getAverage(list), [list]); //뒤쪽 변수 배열안에 list가 변경될때만 평균 계산
  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); //컴포넌트가 처음 랜더링 될때만 함수 실행
  const onInsert = useCallback(
    (e) => {
      const nextList = list.concat(parseInt(number)); //배열에 새 넘버 추가하고
      setList(nextList); //배열입력
      setNumber(""); //다시초기화
      inputEl.current.focus();//inputEl 요소에 간섭할수 있게 해줌
    },
    [number, list]
  ); //number,list가 변경될때만 함수 생성
  //이렇게 하면 랜더링 할때마다 함수도 같이 랜더링 해야함
  //   const onChange = (e) => {
  //     setNumber(e.target.value);
  //   };
  //   const onInsert = () => {
  //     const nextList = list.concat(parseInt(number)); //배열에 새 넘버 추가하고
  //     setList(nextList); //배열입력
  //     setNumber(""); //다시초기화
  //   };
  return (
    <div>
      <input value={number} onChange={onChange} type="number" ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, idx) => (
          <li key={idx}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값 : </b> {avg}
      </div>
    </div>
  );
};

export default Average;
