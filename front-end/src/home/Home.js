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
      <div className="homepage">
        <div className="banner">
          <h1>Furriendster</h1>
          <h2>Find your friend today</h2>
        </div>



      </div>
    );
  }
}

const HomeContainer = ReactRedux.connect(
  state => state.home,
  actions
)(Home);

export default HomeContainer;
