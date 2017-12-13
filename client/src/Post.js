import React, { Component }  from 'react';

export default class Post extends Component {
  constructor() {
    super();
    this.state ={showComments: false}
    this.toggleComments = this.toggleComments.bind(this);
  }

  toggleComments() {
    let current = this.state.showComments;
    this.setState({showComments: !current});
  }

  render() {
    return (
      <li>
        <div className={`post`}>
          <p className={`postUser`}>{this.props.post.user}:</p>
          <p>{this.props.post.text}</p>
        </div>
        <div>
          {!this.state.showComments &&
            <button onClick={this.toggleComments}>
            Show comments
            </button>
          }
          {this.state.showComments &&
            <button onClick={this.toggleComments}>
            Hide comments
            </button>
          }
        </div>
        {this.state.showComments &&
          <div>
            <ul className={`comments`}>
              {this.props.post.comments.map(comment =>
                <li className={`comment`}>
                  <p className={`commentUser`}>{comment.user}:</p>
                  <p>{comment.text}</p>
                </li>
              )}
            </ul>
            <input type="text" onKeyPress={this.props.onKeyPress} onChange={this.props.onChange} size="20" placeholder="Enter comment"/>
          </div>
        }
      </li>
    )
  }
}

Post.defaultProps = {
    key: 0
}