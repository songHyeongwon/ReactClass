import { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useInputs(initialFrom) {
  const [state, dispatch] = useReducer(reducer, initialFrom);
  const onChange = (e) => {
    dispatch(e.target);
  };
  console.log("useInputs에서 입력해주고 있습니다.");
  return [state, onChange];
}
