import React, { Component }  from 'react';

export default class Todo extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <li className={`todo ${this.props.finished ? "finished" : "unfinished"}`}>
        <p>{this.props.text}</p>
        <div>
          <p className={`todoUser`}>Assigned: {this.props.user}</p>
          {!this.props.finished &&
            <button id={`assignBtn`} onClick={this.props.onClick}>
            Assign yourself
            </button>
          } 
        </div>
        <label className={`isCompleted`}>Completed:</label>
        <input className={`isCompleted`} name="Completed" type="checkbox" checked={this.props.finished} onChange={this.props.onChange} />

      </li>
    )
  }
}

Todo.defaultProps = {
    key: 0
}