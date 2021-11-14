import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };
  componentDidCatch(error, info) {
    console.log('componentDidCatch = ', error, info);
    this.setState({
      error: true,
    });
  }
  render() {
    if (this.state.error) {
      return <div>에러가 발생하였습니다. </div>;
    } else {
      return this.props.children;//하위 자식노드 그대로 반환
    }
  }
}

export default ErrorBoundary;
