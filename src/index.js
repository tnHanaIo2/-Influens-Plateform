import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import { Provider, connect } from "react-redux";
import { decode } from 'jsonwebtoken'


import reportWebVitals from './reportWebVitals';

import "semantic-ui-css/semantic.min.css";
import Login from './components/login';
import Register from './components/register';
import PageNotFound from './components/page-not-found';
import Home from './components/home';
import Spinner from './components/spinner';
import firebase from './firebase';
import store from './store/store';


import { setUser, clearUser } from "./actions";
import SalesStatistic from './components/sales-statistic';
import Brand from './components/brand';
import Content from './components/content';
import HeaderTest from './components/header';



class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        console.log('USER here', user)
        localStorage.setItem('token', user.ya)
        // this.props.history.push("/target");
      } else {
        //this.props.history.push("/target/login");
        this.props.clearUser();
        localStorage.removeItem('token')

      }
    });
  }







  handleSignout = (event) => {
    event.preventDefault()

    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out!"));
    this.props.clearUser();
    localStorage.removeItem('user')
    window.location.reload()
  };


  render() {
    const { user } = this.props
    return this.props.isLoading ? (
      <Spinner message='Bienvenue ....' />


    ) : (
        <>

          {user && <HeaderTest logout={this.handleSignout} />}

          <Switch>

            <Route restricted={false} render={() => <Login user={user} />} path="/test/login" exact />
            <Route restricted={false} component={Register} path="/test/register" exact />


            <PrivateRoute path="/test/home" exact component={Home} />
            <PrivateRoute path="/test/brand/:offerId/" component={Content} exact />





            <Route path='/test/404' component={PageNotFound} />
            <Redirect from='*' to='/test/404' />
          </Switch>

        </>
      );
  }


}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals



const mapStateFromProps = state => ({
  isLoading: state.user.isLoading,
  user: state.user.currentUser

});


const RootWithAuth = withRouter(
  connect(
    mapStateFromProps,
    { setUser, clearUser }
  )(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>

      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);



const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token')
}


function decodeTokenFromLocalStorage(token) {
  let p = decode(token)
  if (!p) {
    const [p1, p2, p3] = `${token}`.split('.')
    p = decode(`${p1}.${p2}.${p3}`)
  }
  return p
}


export const isLoggedIn = () => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    return false
  }
  const payload = decodeTokenFromLocalStorage(token)
  if (!payload) {
    return false
  }
  // if (payload.exp * 1000 > new Date().getTime()) {
  //   return true
  // }
  return true
}



const PrivateRoute = ({ component: Component, ...rest }) => {
  return (

    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /target/login page
    <Route {...rest} render={props => (
      isLoggedIn() ?
        <Component {...props} />
        : <Redirect to="/test/login" />
    )} />
  );
};


reportWebVitals();
