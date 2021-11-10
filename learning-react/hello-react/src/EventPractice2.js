import React, { useState } from 'react';

const EventPractice2 = () => {
  const [form, setFrom] = useState({
    username: '',
    message: '',
  });
  const { username, message } = form;
  const onChange = (e) => {
    const nextFomr = {
      ...form, //기존내용 복사
      [e.target.name]: e.target.value,
    };
    console.log(nextFomr);
    setFrom(nextFomr);
  };
  const onClick = () => {
    alert("EventPractice2 ~ " +username + ' : ' + message);
    setFrom({
      username: '',
      message: '',
    });
  };
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div onKeyPress={onKeyPress}>
      <h1>이벤트연습</h1>
      <input
        type="text"
        name="message"
        placeholder="메세지"
        value={message}
        onChange={onChange}
      />
      <input
        type="text"
        name="username"
        placeholder="이름"
        value={username}
        onChange={onChange}
      />
      <button onClick={onClick}>버튼</button>
    </div>
  );
};

export default EventPractice2;
