import React from 'react';
import PropTypes from 'prop-types';

//rsc로 자동완성
const MyComponent = ({ name, children, numType }, props) => {
  //const {name , children} = props;//props에서 두 객체를 꺼냅니다.
  return (
    <div>
      나의 새롭고 멋진 컴포넌트 {name} 입니다.
      <br />제 나이는 {props.age} 입니다.
      <br />
      children = {children}
      <br />
      가장 좋아하는 숫자 {numType}
    </div>
  );
};
//props를 안넘겨준다면 기본 설정으로 반환
MyComponent.defaultProps = {
  name: '기본이름',
  age: '기본나이',
};
//객체의 형태를 지정함
MyComponent.propTypes = {
  name: PropTypes.string,
  numType:PropTypes.number.isRequired
};

export default MyComponent;
