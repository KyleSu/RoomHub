import React, { Component }  from 'react';

export default class Message extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <li className={`message ${this.props.sender == this.props.user ? "right" : "left"}`}>
        {this.props.sender !== this.props.user &&
        <p className={`sender`}>{this.props.sender}</p>}
        <p>{this.props.text}</p>
      </li>
    )
  }
}

Message.defaultProps = {
    key: 0
}