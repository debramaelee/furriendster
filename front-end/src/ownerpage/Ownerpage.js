import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Ownerpage.actions';

class Ownerpage extends React.Component {
  componentDidMount() {
    let id = this.props.params.id;
    this.props.getOwnerInfo(id);
    this.props.getPet(id, this.props.token);



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
let petName;
let petId;
let petImage;

// if(!pet_info) {
//   return <h1>Loading...</h1>;
// }
if (this.props.owner_info){
  ownerName = this.props.owner_info.name;
  petName = this.props.pet_info.name;
  petImage = this.props.pet_info.image_url;
}





    return (
      <div className="owner-bio">

        <h4>Meet {ownerName}s Pets</h4>
        {this.props.pet_info.map((petInfo, idx)=>
        <li key={idx}>
          <a href={`/#/petpage/${petInfo.id}`}><img src={petInfo.image_url.replace(/[{}]/g, "")} width="200px"/></a>

        </li>
      )}



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
