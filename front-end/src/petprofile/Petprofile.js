import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Petprofile.actions';



class Petprofile extends React.Component {

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  submit(event){
    event.preventDefault()

      let petInfo =
      {
        // owner_id: '',
        token: this.props.token,
        name: this.props.name,
        gender: this.props.gender,
        fixed: this.props.fixed,
        age: this.props.age,
        size: this.props.size,
        personality: this.props.personality,
        activities: this.props.activities,
        image_url: this.props.img,
        description: this.props.description

      }

      this.props.submitPet(petInfo);
  }




  render() {
// console.log(loginSession.owner_id)
    return (
      <div className="petprofileform">
        <div className="container">
        <h1 className="text-center">Create Pet Profile</h1>
        <form className="petform" onSubmit={event=>this.submit(event)}>
          <label className="col-one-half">
          <span className="label-text"></span>
          <input className="name" type="text" key = "text" name="name" value = {this.props.name} placeholder="Name" onChange={event=> this.props.name9(event.target.value)}/>
          </label>
          <div className="mf-radio">
          <input className="radio" type="radio" name="gender" value="male" onChange={event=>this.props.gender9(event.target.value)}/>Male

          <input className="radio" type="radio" name="gender" value="female" onChange={event=>this.props.gender9(event.target.value)}/>Female
          </div>
          <div className="fixed-radio">
          <input className="radio" type="checkbox" name="fixed" value = {this.props.fixed}  onChange={event=>this.props.fixed9(event.target.value)}/>Fixed?
          </div>
          <br/>
          <div className="age-label">
          <label>Age</label>
          <select name="age" value = {this.props.age}  onChange={event=>this.props.age9(event.target.value)}>
            <option value="puppy" >Puppy (0 - 12 months)</option>
            <option value="teen">Adolescent (1 - 2 years)</option>
            <option value="adult">Adult (2 - 8 years)</option>
            <option value="senior">Senior (8+ years)</option>
          </select>




          <label>Size</label>
          <select name="size" value = {this.props.size}  onChange={event=>this.props.size9(event.target.value)}>
            <option value="small" >Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>



          <label>Personality</label>
          <select name="personality" value = {this.props.personality}  onChange={event=>this.props.personality9(event.target.value)}>
            <option value="energetic" >Energetic/Social</option>
            <option value="laidback" >Laidback/Gentle</option>
            <option value="independent" >Independent/Stubborn</option>
          </select><br/>



          <label>Favorite Activity</label>
          <select name="activity" value = {this.props.activities}  onChange={event=>this.props.activity9(event.target.value)}>
            <option value="fetch" >Playing Fetch</option>
            <option value="hike" >Hiking</option>
            <option value="swim" >Swimming</option>
            <option value="run" >Running and Chasing</option>
            <option value="tug" >Tug of War</option>
          </select><br/>


          <div className="Description">
          <label> Description</label>

            <textarea cols="46" rows="10" value={this.props.description}  onChange={event=>this.props.description9(event.target.value)}/>
          </div>
          </div>
          <button className="submit" onSubmit={event=>this.submit(event)}>Submit!</button>

        </form>
        <div className="image">
        <button  onClick={event=>this.props.uploadImage(event.target.value)}>
        <h1> add image</h1>
        </button><br/>
        </div>
      </div>
    </div>
    );
  }
}

const PetprofileContainer = ReactRedux.connect(
  state => Object.assign({}, state.petprofile, {
    token: state.login.loginInfo.auth_token
  }),
  actions
)(Petprofile);

export default PetprofileContainer;
