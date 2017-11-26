import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {messages: [], newMessage: '', loggedIn: false, loginMessage: '', registerMessage: ''};
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
  }

  componentDidMount() {
    setInterval(() => fetch('/msgs')
      .then(res => res.json())
      .then(msgs => this.setState({messages: msgs})), 1000);
  }

  changeUsername(e) {
    this.setState({loginUsername: e.target.value});
  }

  changePassword(e) {
    this.setState({loginPassword: e.target.value});
  }

  login() {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.loginUsername,
        password: this.state.loginPassword
      })
    })
    .then(res => res.json())
    .then(function(info) {
      if (info.valid) {
        this.setState({
          loggedIn: true,
          username: info.username,
          loginMessage: '',
          registerMessage: ''
        });
      } else {
        this.setState({
          loggedIn: false,
          loginMessage: 'Failed to login',
          registerMessage: ''
        });
      }
    }.bind(this));
  };

  register() {
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.loginUsername,
        password: this.state.loginPassword
      })
    })
    .then(res => res.json())
    .then(function(info) {
      if (info.failed) {
        this.setState({
          loggedIn: false,
          loginMessage: '',
          registerMessage: 'Failed to register, make sure username is unique'
        });
      } else {
        this.setState({
          loggedIn: true,
          username: info.username,
          loginMessage: '',
          registerMessage: ''
        });
      }
    }.bind(this));
  };

  logout() {
    this.setState({
      loggedIn: false,
      username: '',
      loginmessage: '',
      registerMessage: ''
    })
  }

  sendMessage(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      fetch('/msgs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: this.state.username,
          text: this.state.newMessage
        })
      });
      fetch('/msgs')
        .then(res => res.json())
        .then(msgs => this.setState({messages: msgs, newMessage: ''}));

    }
  };

  changeMessage(e) {
    this.setState({newMessage: e.target.value});
  };

  render() {
    if (!this.state.loggedIn) {
      return (
        <div className="Login page">
          <h1>Please Login or Register an Account</h1>
          <h1>{this.state.loginMessage}</h1>
          <h1>{this.state.registerMessage}</h1>
          <input type="text" id="username" onChange={this.changeUsername} size="20" placeholder="Enter username"/>
          <input type="text" id="password" onChange={this.changePassword} size="20" placeholder="Enter password"/>
          <button onClick={this.login}>Login</button>
          <button onClick={this.register}>Register</button>
        </div>
      )
    } else {
      return (
        <div className="App">
          <h1>Messages</h1>
          <button onClick={this.logout}>Logout</button>
          {this.state.messages.map(msg =>
            <div>
              <h5>{msg.user} - {msg.created} </h5>
              <h3>{msg.text}</h3>
            </div>
          )}
          <input type="text" value={this.state.newMessage} onKeyPress={this.sendMessage} onChange={this.changeMessage} size="20" placeholder="Enter new message"/>
        </div>
      );

    }
  }
}

export default App;
