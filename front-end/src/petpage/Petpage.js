import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Petpage.actions';


class Petpage extends React.Component {
  componentDidMount() {
    let id = this.props.params.id;
    this.props.getPetInfo(id);

  }
  componentWillReceiveProps(newProps) {
    if(this.props.params.id !== newProps.params.id) {
      let id = newProps.params.id;
      this.props.getPetInfo(id);
    }
  }



  render() {
let petName;
let petGender;
let petFixed;
let petAge;
let petSize;
let petPersonality;
let petActivities;
let petImage;
let imgLength;
let petDescription;

// if(!pet_info) {
//   return <h1>Loading...</h1>;
// }
if (this.props.pet_info){
  petName = this.props.pet_info.name;
  petGender = this.props.pet_info.gender;
  petAge = this.props.pet_info.age;
  petSize = this.props.pet_info.size;
  petPersonality = this.props.pet_info.personality;
  petActivities = this.props.pet_info.activities;
  petDescription = this.props.pet_info.description;
  petImage = (this.props.pet_info.image_url).replace(/[{}]/g, "");

  if(this.props.pet_info.fixed){
    petFixed = 'I am fixed';
  }
  if(!this.props.pet_info.fixed) {
    petFixed = 'I am not fixed';
  }
}


console.log('here is the pet Info' + this.props.pet_info);
console.log(petImage);

    return (
      <div className="pet-bio">

        <h2>{petName}</h2>
        <img src={petImage} width="400px"/>
        <div className="petdesc">
          <h3>Gender: {petGender} ({petFixed})</h3>
          <h3>Age: {petAge}</h3>
          <h3>Size: {petSize}</h3>
          <h4>I am {petPersonality} and I love to {petActivities}.</h4>
          <p>{petDescription}</p>
        </div>


      </div>
    );
  }

}

const PetpageContainer = ReactRedux.connect(
  state => state.petpage,
  actions
)(Petpage);

export default PetpageContainer;
