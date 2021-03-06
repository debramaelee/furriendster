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
      <div className="signuppage">
        <div className="container">
        <h1 className="text-center">Sign Up</h1>
        <form className="registration-form" name="signup" onSubmit={event=>this.submit(event)}>
          <label className="col-one-half">
          <span className="label-text"></span>
            <input type="text" name="name" placeholder="Name" onChange={event=> this.props.name9(event.target.value)}/>
          </label>
          <label className="col-one-half">
          <span className="label-text"></span>

            <input type="text" name="email" placeholder="Email" onChange={event=> this.props.email9(event.target.value)}/>
          </label>
          <label>
          <span className="label-text"></span>

            <input type="password" name="password" placeholder="Password" onChange={event=> this.props.password19(event.target.value)}/>
          </label>
          <label>
          <span className="label-text"></span>

            <input type="text" name="phone" placeholder="Phone Number" onChange={event=> this.props.phone9(event.target.value)}/>
          </label>
          <label className="col-one-half">
          <span className="label-text"></span>

            <input type="text" name="street" placeholder="Street" onChange={event=> this.props.street9(event.target.value)}/>
          </label>
          <label className="col-one-half">
          <span className="label-text"></span>

            <input type="text" name="zip" placeholder="Zip Code" onChange={event=> this.props.zip9(event.target.value)}/>
          </label>
          <button className="submit" name="register">Sign up!</button>
        </form>
        </div>
      </div>
    );
  }
}

const SignupContainer = ReactRedux.connect(
  state => state.signup,
  actions
)(Signup);

export default SignupContainer;
