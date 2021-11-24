import { createStore } from "redux";

//console.log("헬로 parcel");
const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");
//액션 타입
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
//액션 생성 함수
const toggleswitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

//초기값 설정
const initialState = {
  toggle: false,
  counter: 0,
};

//리듀서 함수 state가 언더파인드일 때는 initialState값을 기본값으로 사용
function reducer(state = initialState, action) {
  //action.type에 따라
  console.log(state);
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, //불변성 유지
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state, //불변성 유지
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state, //불변성 유지
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}
const store = createStore(reducer);

const render = () => {
  const state = store.getState(); //현재상태
  //토글처리
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  //카운터 처리
  counter.innerHTML = state.counter;
};

render();
store.subscribe(render);
console.log(store);
divToggle.onclick = () => {
  console.log("divToggle.onClick");
  store.dispatch(toggleswitch());
};
btnIncrease.onclick = () => {
  console.log("btnIncrease.onClick");
  store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
  console.log("btnDecrease.onClick");
  store.dispatch(decrease());
};
