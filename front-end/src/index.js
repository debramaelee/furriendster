import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';

import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';

import { persistStore, autoRehydrate } from 'redux-persist'
import CookieStorage from 'redux-persist-cookie-storage'

import homeReducer from './home/Home.reducer';
import HomeContainer from './home/Home';

import loginReducer from './login/Login.reducer';
import LoginContainer from './login/Login';

import signupReducer from './signup/Signup.reducer';
import SignupContainer from './signup/Signup';

import mapReducer from './map/Map.reducer';
import MapContainer from './map/Map';

import petprofileReducer from './petprofile/Petprofile.reducer';
import PetprofileContainer from './petprofile/Petprofile';

import petpageReducer from './petpage/Petpage.reducer';
import PetpageContainer from './petpage/Petpage';

import ownerpageReducer from './ownerpage/Ownerpage.reducer';
import OwnerpageContainer from './ownerpage/Ownerpage';


import chatReducer from './chat/Chat.reducer';
import ChatContainer from './chat/Chat';

const reducer = Redux.combineReducers({

  home: homeReducer,
  login: loginReducer,
  signup: signupReducer,
  map: mapReducer,
  petprofile: petprofileReducer,
  petpage: petpageReducer,
  ownerpage: ownerpageReducer,
  chatpage: chatReducer

});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.compose(
    Redux.applyMiddleware(ReduxThunk),
    autoRehydrate()
  )
);

persistStore(store, { storage: new CookieStorage() });

class AppLayout extends React.Component {
  logout(event) {
    event.preventDefault();
    this.props.logout();

  }
  render() {
    let loggedIn = !!this.props.loginInfo;

    // let id = this.props.owner_info.id;
    return (
      <div className="navbar">
        <ul className="nav">
          <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
          {!loggedIn ?
            [<li key ="signup"><Link to="/user/signup" activeClassName="active">Sign Up</Link></li>,
            <li key="login"><Link to="/user/login" activeClassName="active">Log In</Link></li>] :
            [<li key="map"><Link to="/map" activeClassName="active">Map</Link></li>,
            <li key="chat"><Link to="/chat" activeClassName="active">Chat</Link></li>,
            <li key="petprofile"><Link to="/petprofile" activeClassName="active">Add Pet Profile</Link></li>,
            <li key="yourprofile"><Link to={"/ownerpage/"+this.props.loginInfo.id} activeClassName="active">Your Current Pets</Link></li>,
            <a href="#" key="logout" onClick={event=>this.logout(event)}>Logout</a>,
            <h4 key="welcome">Welcome back, {this.props.loginInfo.name}!</h4>
          ]
          }
        </ul>
        {this.props.children}
      </div>
    )
  }
}

const AppLayoutContainer = ReactRedux.connect(
  state => ({
    loginInfo: state.login.loginInfo
  }),
  { logout: () => ({type: 'logout'})}
) (AppLayout);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppLayoutContainer}>
        <IndexRoute component={HomeContainer}/>
        <Route path="/user/signup" component={SignupContainer}/>
        <Route path="/user/login" component={LoginContainer}/>
        <Route path="/map" component={MapContainer}/>
        <Route path="/petprofile" component={PetprofileContainer}/>
        <Route path="/petpage/:id" component={PetpageContainer}/>
        <Route path="/ownerpage/:id" component={OwnerpageContainer}/>
        <Route path="/chat" component={ChatContainer}/>

      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
