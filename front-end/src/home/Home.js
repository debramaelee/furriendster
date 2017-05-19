import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Home.actions';

class Home extends React.Component {
  // componentDidMount() {
  //   this.props.fetchPage();
  //   this.props.getUserInfo();
  //   console.log('HERE I AM: '+ this.props.params);
  // }


  render() {



    return (
      <div>
        <h1>Welcome to Furriendster!</h1>
        <img src="http://1.bp.blogspot.com/-j-OJZBTTth8/UH2fW7eDF6I/AAAAAAAACNQ/0kXu66TZ-qg/s1600/08-Find+a+Good+Friend.jpg" width="400px"/>


      </div>
    );
  }
}

const HomeContainer = ReactRedux.connect(
  state => state.home,
  actions
)(Home);

export default HomeContainer;
