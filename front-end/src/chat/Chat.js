import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Chat.actions';

class Chat extends React.Component {
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

            {petInfo.image_url ?
              <a href={`/#/petpage/${petInfo.id}`} target="_blank">
              <img src={petInfo.image_url.replace(/[{}]/g, "")} width="200px" /></a> : <p>Image not found!</p>
            }

        </li>

      )}
      <h3>Message Board</h3>
      <form>
        <textarea cols="50" rows="5"/>
        <button>Submit</button>
      </form>


      </div>
    );
  }

}

const ChatContainer = ReactRedux.connect(
  state => ({
    owner_info: state.ownerpage.owner_info,
    pet_info: state.ownerpage.pet_info,
    pet_name: state.ownerpage.pet_info && state.ownerpage.pet_info.name,
    token: state.login.loginInfo && state.login.loginInfo.auth_token
  }),
  actions
)(Chat);

export default ChatContainer;
