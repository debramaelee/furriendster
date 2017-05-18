import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Login.actions';

class Login extends React.Component {

  // submitLogin(event){
  //   event.preventDefault()
  //     let ownerInfo =
  //     {
  //       email: this.props.email,
  //       password: this.props.password
  //     }
  //     this.props.submitLogin(ownerInfo);
  // }
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  change(event, propName) {
    this.setState({
      [propName]: event.target.value
    });
  }
  submit(event){
    event.preventDefault();
    this.props.login(
      this.state.email,
      this.state.password,
      this.state.zip
    );
  }

  render() {
  
    return (
      <div>
        <form onSubmit = {event=> this.submit(event)}>
          <input type="text" name="email" placeholder="Email" value = {this.state.email} onChange={event=> this.change(event, 'email')}/><br/>
          <input type="password" name="password" placeholder="Password" value = {this.state.password} onChange={event=> this.change(event, 'password')}/><br/>
          <button>Login</button>
        </form>
      </div>
    );
  }
}

const LoginContainer = ReactRedux.connect(
  state => state.login,
  actions
)(Login);

export default LoginContainer;
