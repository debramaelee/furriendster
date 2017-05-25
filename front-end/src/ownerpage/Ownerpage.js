import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Ownerpage.actions';

class Ownerpage extends React.Component {
  componentDidMount() {
    let id = this.props.params.id;
    this.props.getOwnerInfo(id);
    this.props.getPet(id);


  }
  componentWillReceiveProps(newProps) {
    if(this.props.params.id !== newProps.params.id) {
      let id = newProps.params.id;
      this.props.getOwnerInfo(id);
      this.props.getPet(id);

    }
  }


  render() {
let ownerName;

// if(!pet_info) {
//   return <h1>Loading...</h1>;
// }
if (this.props.owner_info){
  ownerName = this.props.owner_info.name;

}



    return (
      <div className="owner-bio">

        <h4>Meet {ownerName}s Pets</h4>
        <h4> hello</h4>






      </div>
    );
  }

}

const OwnerpageContainer = ReactRedux.connect(
  state => state.ownerpage,

  actions
)(Ownerpage);

export default OwnerpageContainer;
