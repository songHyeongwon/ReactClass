import React, { useEffect, useReducer } from "react";
import useInputs from "./useInputs"; //내가 만든 커스텀 훅
const Info = () => {
  //const [name, setName] = useState("");
  //const [nickname, setNickname] = useState("");
  const [state, onChange] = useInputs({
    name: "",
    nickname: "",
  });
  const { name , nickname } = state;
  useEffect(() => {
    console.log("Effect");
    return () => {
      console.log("Cleanup"); //이친구가 먼저 실행됨
      console.log({
        name,
        nickname,
      });
    };
  });

  /*useEffect(() => { //배열값을 넣으면 해당 값이 들어올때만 실행
    console.log("랜더링이 완료되었습니다.");
    console.log({
      name,
      nickname,
    });
  },[name]);*/
  /*useEffect(() => { //빈 배열을 넣으면 마운트 될때만 실행
    console.log("랜더링이 완료되었습니다.");
    console.log({
      name,
      nickname,
    });
  },[]);*/
  /*const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChanegNickname = (e) => {
    setNickname(e.target.value);
  };*/
//   const onChange = (e) => {
//     dispatch(e.target);
//   };
  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름 : </b>
          {name}
        </div>
        <div>
          <b>닉네임 : </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
