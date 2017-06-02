import React from 'react'
import * as ReactRedux from 'react-redux';
import * as actions from './Chat.actions';
const io = require('socket.io-client');

class App extends React.Component {
    render() {
        return (
          <div className ="chatbox">
            <div>
              <CommentBox id={this.props.id} name= {this.props.name}/>
            </div>
          </div>
        );
    }
}

class CommentBox extends React.Component {
    constructor(){
        console.log("cons executed");
        super();
        this.state = {data :[]};
        this.updateCommentList = this.updateCommentList.bind(this);
    }

    componentWillMount() {
        this.socket = io('http://localhost:3003');
        this.socket.on('connect', this.connect);
        this.socket.on('commentlist',this.updateCommentList);
        this.socket.emit('join', (this.props.id, this.props.name));
    }

    connect() {
        console.log("connected");
    }

    updateCommentList(payload){
      console.log('here is payload! ', payload)
        this.setState({
            data : payload
        });

    }

    handleCommentSubmit(comment) {
        var comments = this.state.data;
        console.log("data executed");
        // Optimistically set an id on the new comment. It will be replaced by an
        // id generated by the server. In a production application you would likely
        // not use Date.now() for this and would have a more robust system in place.
        comment.id = Date.now();
        comment.owner_id = this.props.id;
        comment.owner_name = this.props.name;
        var newComments = comments.concat([comment]);
        this.setState({
            data: newComments
        });

        this.socket.emit("commentlist",newComments);

        // this.props.sendChat(comment);

    }

    render() {
        return (
          <div className ="chatbox">
            <div className="commentBox">
              <CommentList data={this.state.data} name={this.props.name} id={this.props.id}/>
              <CommentForm  onCommentSubmit={this.handleCommentSubmit.bind(this)} />
            </div>
          </div>
        );
    }
}

class CommentList extends React.Component {
    render() {
        var commentNodes = this.props.data.map((comment) => {
            return (
                <Comment key={comment.id} name={comment.owner_name} id={comment.owner_id}>
          {comment.text}
        </Comment>
            );
        });
        return (
          <div className="neighbors">
          <h1>Chat with your Neighbors</h1>
            <div className="commentList">

              <div className="commentNodes">
                {commentNodes}
              </div>
            </div>
        </div>
        );
    }
}

class Comment extends React.Component {
  render() {
    let ownerName = this.props.name;
    let ownerId = this.props.id;

    return (
      <div className ="chatbox">
        <h4 className="commentAuthor" >
          <a href={`/#/ownerpage/${ownerId}`}>{ownerName}</a> says:
        </h4>
        <span className="comment">{this.props.children}</span>
      </div>
    );
  }
}

class CommentForm extends React.Component {

    constructor(){
        super();
        this.state= {author :'',text : ''}
    }

    handleTextChange(e) {
          this.setState({text : e.target.value})
    }
    handleSubmit(e) {
        e.preventDefault();
        var text = this.state.text.trim();
        if (!text) {
            return;
        }
        this.props.onCommentSubmit({
            text: text
        });
        this.setState({
            text: ''
        });

    }

    render() {
      console.log(this.props.login)
        return (
          <div className ="chatbox">
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
              <input id="typetext"
                type="text"
                placeholder="Say something..."
                value={this.state.text}
                onChange={this.handleTextChange.bind(this)}
              />
              <input className="submitbutton" type="submit" value="Post" />
            </form>
          </div>
        );
    }

}

const AppContainer = ReactRedux.connect(
  state =>  ({
  id: state.login.loginInfo && state.login.loginInfo.id,
  name: state.login.loginInfo && state.login.loginInfo.name


}),
actions
)(App);

export default AppContainer;

// module.exports = App;
