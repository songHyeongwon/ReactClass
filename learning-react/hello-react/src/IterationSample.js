import React, { useState } from 'react';

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: '눈사람' },
    { id: 2, text: '얼음' },
    { id: 3, text: '눈' },
    { id: 4, text: '바람' },
  ]);
  const [inputText, setInputText] = useState('');
  const [nextId, setNestId] = useState(5); //새항목 추가시 다음 ID
  const onChange = (e) => setInputText(e.target.value);

  //버튼 추가 이벤트
  const onClick = (e) => {
    //names배열에 하나 추가(병합)
    const nextName = names.concat({
      id: nextId,
      text: inputText,
    });
    setNestId(nextId + 1);
    setNames(nextName);
    setInputText('');
    console.log(nextId);
  };
  const onRemove = (id) => {
    const nextName = names.filter((name) => name.id !== id);
    setNames(nextName);
    setNestId(nextId - 1);
    console.log(nextId);
  };

  const nameList = names.map((name) => (
    <li onDoubleClick={() => onRemove(name.id)} key={name.id}>
      {name.text}
    </li>
  ));
  return (
    <>
      <input value={inputText} type="text" onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{nameList}</ul>
    </>
  );
};

export default IterationSample;
