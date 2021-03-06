import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Ownerpage.actions';

class Ownerpage extends React.Component {
  componentDidMount() {
    let id = this.props.params.id;
    if (this.props.token) {
      this.props.getOwnerInfo(id, this.props.token);
      this.props.getPet(id, this.props.token);
    }



  }
  componentWillReceiveProps(newProps) {
    if(this.props.params.id !== newProps.params.id || this.props.token !== newProps.token) {
      let id = newProps.params.id;
      this.props.getOwnerInfo(id);
      console.log('token', newProps.token);
      this.props.getPet(id, newProps.token);

    }
  }


  render() {
let ownerName;
let ownerEmail;
let petName;
let petId;
let petImage;

// if(!pet_info) {
//   return <h1>Loading...</h1>;
// }
if (this.props.owner_info){
  ownerName = this.props.owner_info.name;
  ownerEmail = this.props.owner_info.email;
  petName = this.props.pet_info.name;
  petImage = this.props.pet_info.image_url;
}





    return (
      <div className="owner-bio">

        <h2>Meet {ownerName}s Pets</h2>
        {this.props.pet_info.map((petInfo, idx)=>
        <li key={idx}>

            {petInfo.image_url ?
              <a href={`/#/petpage/${petInfo.id}`} target="_blank">
              <img src={petInfo.image_url.replace(/[{}]/g, "")} width="400px" /></a> : <p>Image not found!</p>
            }

        </li>

      )}
      <p>Contact {ownerName} at {ownerEmail}</p>
      </div>
    );
  }

}

const OwnerpageContainer = ReactRedux.connect(
  state => ({
    owner_info: state.ownerpage.owner_info,
    pet_info: state.ownerpage.pet_info,
    pet_name: state.ownerpage.pet_info && state.ownerpage.pet_info.name,
    token: state.login.loginInfo && state.login.loginInfo.auth_token
  }),
  actions
)(Ownerpage);

export default OwnerpageContainer;
