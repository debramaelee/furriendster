import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';

import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';

import homeReducer from './home/Home.reducer';
import HomeContainer from './home/Home';

import loginReducer from './login/Login.reducer';
import LoginContainer from './login/Login';

import signupReducer from './signup/Signup.reducer';
import SignupContainer from './signup/Signup';

import mapReducer from './map/Map.reducer';
import MapContainer from './map/Map';

const reducer = Redux.combineReducers({

  home: homeReducer,
  login: loginReducer,
  signup: signupReducer,
  map: mapReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);

class AppLayout extends React.Component {
  render() {
    let loggedIn = !!this.props.loginInfo;
    return (
      <div>
        <ul className="nav">
          <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>

            <li><Link to="/user/signup" activeClassName="active">Sign Up</Link></li>
            <li><Link to="/user/login" activeClassName="active">Log In</Link></li> 
          <li><Link to="/map" activeClassName="active">Map</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

const AppLayoutContainer = ReactRedux.connect(
  state => ({
    loginInfo: state.login.loginInfo
  })
) (AppLayout);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppLayout}>
        <IndexRoute component={HomeContainer}/>
        <Route path="/user/signup" component={SignupContainer}/>
        <Route path="/user/login" component={LoginContainer}/>
        <Route path="/map" component={MapContainer}/>
      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
