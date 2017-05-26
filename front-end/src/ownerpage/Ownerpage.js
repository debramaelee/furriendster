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

// if(!pet_info) {
//   return <h1>Loading...</h1>;
// }
if (this.props.owner_info){
  ownerName = this.props.owner_info.name;
  petName = this.props.pet_info.name;

}





    return (
      <div className="owner-bio">

        <h4>Meet {ownerName}'s Pets</h4>

  


      </div>
    );
  }

}

const OwnerpageContainer = ReactRedux.connect(
  state => ({
    owner_info: state.ownerpage.owner_info,
    pet_info: state.ownerpage.pet_info,
    token: state.login.loginInfo && state.login.loginInfo.auth_token
  }),
  actions
)(Ownerpage);

export default OwnerpageContainer;
