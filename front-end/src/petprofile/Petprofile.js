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
        owner_id: '1',
        name: this.props.name,
        gender: this.props.gender,
        fixed: this.props.fixed,
        age: this.props.age,
        size: this.props.size,
        personality: this.props.personality,
        activities: this.props.activities
      }

      this.props.submitPet(petInfo);

  }


  render() {

    return (
      <div>
        <form name="petform" onSubmit={event=>this.submit(event)}>
          <input type="text" key = "text" name="name" placeholder="Name" onChange={event=> this.props.name9(event.target.value)}/><br/>

          <input type="radio" name="gender" value="male" onChange={event=>this.props.gender9(event.target.value)}/>Male

          <input type="radio" name="gender" value="female" onChange={event=>this.props.gender9(event.target.value)}/>Female<br/>

          <input type="checkbox" name="fixed" value="true" onChange={event=>this.props.fixed9(event.target.value)}/>Fixed?<br/>

          <label>Age</label><br/>
          <select name="age" onChange={event=>this.props.age9(event.target.value)}>
            <option value="puppy" >Puppy (0 - 12 months)</option>
            <option value="teen">Adolescent (1 - 2 years)</option>
            <option value="adult">Adult (2 - 8 years)</option>
            <option value="senior">Senior (8+ years)</option>
          </select><br/>

          <label>Size</label><br/>
          <select name="size" onChange={event=>this.props.size9(event.target.value)}>
            <option value="small" >Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select><br/>

          <label>Personality</label><br/>
          <select name="personality" onChange={event=>this.props.personality9(event.target.value)}>
            <option value="energetic" >Energetic/Social</option>
            <option value="laidback" >Laidback/Gentle</option>
            <option value="independent" >Independent/Stubborn</option>
          </select><br/>

          <label>Favorite Activity</label><br/>
          <select name="activity" onChange={event=>this.props.activity9(event.target.value)}>
            <option value="fetch" >Playing Fetch</option>
            <option value="hike" >Hiking</option>
            <option value="swim" >Swimming</option>
            <option value="run" >Running and Chasing</option>
            <option value="tug" >Tug of War</option>
          </select><br/>



          <button>Submit!</button>
        </form>
      </div>
    );
  }
}

const PetprofileContainer = ReactRedux.connect(
  state => state.petprofile,
  actions
)(Petprofile);

export default PetprofileContainer;
