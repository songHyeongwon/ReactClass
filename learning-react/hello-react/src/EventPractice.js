import React, { Component } from 'react';

class EventPractice extends Component {
  state = {
    message: '',
    username : ''
  };

  //   constructor(props) {
  //     super(props);
  //     this.handleChange = this.handleChange.bind(this);
  //     this.handleClick = this.handleClick.bind(this);
  //   }
  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    });
    console.log(this.state);
  };
  handleClick = (e) => {
    alert("EventPractice ~ " +this.state.message + " / " +  this.state.username);
    this.setState({
      message: '',
      username : ''
    });
  };
  handKeyPress = (e) => {
      console.log(e.key)
      if(e.key === 'Enter') {
          this.handleClick();
      }
  }
  render() {
    return (
      <div onKeyPress={this.handKeyPress}>
        <h1>이벤트연습</h1>
        <input
          type="text"
          name="message"
          placeholder="메세지"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="이름"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>버튼</button>
      </div>
    );
  }
}

export default EventPractice;
