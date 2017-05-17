import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Signup.actions';

class Signup extends React.Component {

  submit(event){
    event.preventDefault()

      let ownerInfo =
      {
        name: this.props.name,
        email: this.props.email,
        password: this.props.password,
        phone: this.props.phone,
        street: this.props.street,
        zip: this.props.zip
      }
      
      this.props.submitSignup(ownerInfo);
    
  }
  render() {

    return (
      <div>
        <form name="signup" onSubmit={event=>this.submit(event)}>
          <input type="text" name="name" placeholder="Name" onChange={event=> this.props.name9(event.target.value)}/><br/>
          
          <input type="text" name="email" placeholder="Email" onChange={event=> this.props.email9(event.target.value)}/><br/>
          <input type="password" name="password" placeholder="Password" onChange={event=> this.props.password19(event.target.value)}/><br/>

          <input type="text" name="phone" placeholder="Phone Number" onChange={event=> this.props.phone9(event.target.value)}/><br/>
          
          <input type="text" name="street" placeholder="Street" onChange={event=> this.props.street9(event.target.value)}/><br/>

          <input type="text" name="zip" placeholder="Zip Code" onChange={event=> this.props.zip9(event.target.value)}/><br/>

          <button>Sign up!</button>
        </form>
      </div>
    );
  }
}

const SignupContainer = ReactRedux.connect(
  state => state.signup,
  actions
)(Signup);

export default SignupContainer;
