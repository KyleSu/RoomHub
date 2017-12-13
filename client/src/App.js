import React, { Component } from 'react';
import './App.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Post from './Post';
import Todo from './Todo';
import Message from './Message';

class App extends Component {

  constructor() {
    super();
    this.state = {messages: [], newMessage: '', posts: [], newPost: '', newComment: '', finishedTodos: [], 
      unfinishedTodos: [], newTodo: '', loggedIn: false, loginMessage: '', registerMessage: ''};
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
    this.sendPost = this.sendPost.bind(this);
    this.changePost = this.changePost.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.changeComment = this.changeComment.bind(this);
    this.newTodo = this.newTodo.bind(this);
    this.updateTodoStatus = this.updateTodoStatus.bind(this);
    this.updateTodoUser = this.updateTodoUser.bind(this);
    this.changeTodo = this.changeTodo.bind(this);
  }

  componentDidMount() {
    setInterval(() => fetch('/msgs')
      .then(res => res.json())
      .then(msgs => this.setState({messages: msgs})), 1000);
    setInterval(() => fetch('/posts')
      .then(res => res.json())
      .then(posts => this.setState({posts: posts})), 1000);
     setInterval(() => fetch('/todos/unfinished')
      .then(res => res.json())
      .then(todos => this.setState({unfinishedTodos: todos})), 1000);
     setInterval(() => fetch('/todos/finished')
      .then(res => res.json())
      .then(todos => this.setState({finishedTodos: todos})), 1000);
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

  sendPost(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      fetch('/posts/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: this.state.username,
          text: this.state.newPost
        })
      });
      fetch('/posts')
        .then(res => res.json())
        .then(posts => this.setState({posts: posts, newPost: ''}));
    }
  };

  changePost(e) {
    this.setState({newPost: e.target.value});
  };

  sendComment(e, postId) {
    if (e.charCode === 13) {
      e.preventDefault();
      fetch('/posts/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: postId,
          user: this.state.username,
          text: this.state.newComment
        })
      });
      fetch('/posts')
        .then(res => res.json())
        .then(posts => this.setState({posts: posts}));
    }
  };

  changeComment(e) {
    this.setState({newComment: e.target.value});
  };

  newTodo(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      fetch('/todos/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: this.state.newTodo
        })
      });
      fetch('/todos/unfinished')
        .then(res => res.json())
        .then(todos => this.setState({unfinishedTodos: todos, newTodo: ''}))
    }
  };

  updateTodoStatus(e, id, newStatus) {
    e.preventDefault();
    fetch('/todos/updatestatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        finished: newStatus
      })
    });
    fetch('/todos/unfinished')
      .then(res => res.json())
      .then(todos => this.setState({unfinishedTodos: todos}))
    fetch('/todos/finished')
      .then(res => res.json())
      .then(todos => this.setState({finishedTodos: todos}))
  }

  updateTodoUser(e, id, user) {
    e.preventDefault();
    fetch('/todos/updateuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        user: user
      })
    });
    fetch('/todos/unfinished')
      .then(res => res.json())
      .then(todos => this.setState({unfinishedTodos: todos}))
  }

  changeTodo(e) {
    this.setState({newTodo: e.target.value});
  };

  render() {
    if (!this.state.loggedIn) {
      return (
        <div className="loginpage">
          <p className={`loginheader`}>RoomHub</p>
          <p className={`loginmsg`}>{this.state.loginMessage}</p>
          <p className={`loginmsg`}>{this.state.registerMessage}</p>
          <input type="text" className={`logininput`} id="username" onChange={this.changeUsername} size="20" placeholder="Enter username"/>
          <input type="text" className={`logininput`} id="password" onChange={this.changePassword} size="20" placeholder="Enter password"/>
          <br></br>
          <button className={`loginbtns`} onClick={this.login}>Login</button>
          <br></br>
          <button className={`loginbtns`} onClick={this.register}>Register</button>
        </div>
      )
    } else {
      var posts = [];
      var unfinishedTodos = [];
      var finishedTodos = [];
      var messages = [];
      for (var i = 0; i < this.state.posts.length; i++) {
        let post = this.state.posts[i]
        posts.push(<Post key={i} post={post} onChange={this.changeComment} onKeyPress={(e) => this.sendComment(e, post._id)}/>)
      }
      for (i = 0; i < this.state.unfinishedTodos.length; i++) {
        let todo = this.state.unfinishedTodos[i];
        unfinishedTodos.push(<Todo key={i} user={todo.user} text={todo.text} finished={todo.finished} onClick={(e) => this.updateTodoUser(e, todo._id, this.state.username)} onChange={(e) => this.updateTodoStatus(e, todo._id, true)}/>)
      }
      for (i = 0; i < this.state.finishedTodos.length; i++) {
        let todo = this.state.finishedTodos[i];
        finishedTodos.push(<Todo key={i} user={todo.user} text={todo.text} finished={todo.finished} onClick={(e) => this.updateTodoUser(e, todo._id, this.state.username)} onChange={(e) => this.updateTodoStatus(e, todo._id, false)}/>)
      }
      for (i = 0; i <this.state.messages.length; i++) {
        let msg = this.state.messages[i];
        messages.push(<Message key={i} user={this.state.username} sender={msg.user} text={msg.text} created={msg.created}/>)
      }

      return (
        <div className="App">
          <Grid fluid>
            <Row>
              <Col className={`col`} xs={4}>
                <h1>Posts</h1>
                <input type="text" value={this.state.newPost} onKeyPress={this.sendPost} onChange={this.changePost} size="20" placeholder="Enter new post"/>
                <div className="third">
                  <ul>
                    {posts}
                  </ul>
                </div>
              </Col>
              <Col className={`col`} xs={4}>
                <h1>Todo</h1>
                <input type="text" value={this.state.newTodo} onKeyPress={this.newTodo} onChange={this.changeTodo} size="20" placeholder="Enter new todo"/>
                <div className="third">
                  <ul>
                    {unfinishedTodos}
                  </ul>
                  <ul>
                    {finishedTodos}
                  </ul>
                </div>
              </Col>
              <Col className={`col`} xs={4}>
                <h1>Messages</h1>
                <div className="third">
                  <ul>
                    {messages}
                  </ul>
                </div>
                <input type="text" value={this.state.newMessage} onKeyPress={this.sendMessage} onChange={this.changeMessage} size="20" placeholder="Enter new message"/>
              </Col>
            </Row>
          </Grid>
          <button className={`logoutbtn`} onClick={this.logout}>Logout</button>
        </div>
      );

    }
  }
}

export default App;
