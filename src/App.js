import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// components
import User from './scenes/user'
import Navbar from './scenes/navbar'
// import Home from './scenes/home/index.js'
import InjuryList from './scenes/injury-list/index.js'
import AddInjuryForm from './scenes/injury-list/add-injury-form'
import InjuryInfo from './scenes/injury-info'
import AddTreatmentForm from './scenes/injury-info/treatments/add-treatment'
import UserData from './scenes/user/user-data';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      username: null,
      userId: null,
      showBackground: '',
    }
    this.reportUser = this.reportUser.bind(this);
    this.showBackground = this.showBackground.bind(this);
    this.hideBackground=this.hideBackground.bind(this);
  }

  reportUser(user) {
    if (user) {
      this.setState({
        loggedIn: true,
        username: user.username,
        userId: user.id,
      });
    } else {
      this.setState({
        loggedIn: false,
        username: null,
        userId: null,
      })
    }
  }

  showBackground() {
    this.setState({
      showBackground: 'background-image'
    })
  }

  hideBackground() {
    this.setState({
      showBackground: ''
    })
  }

  // showBackground () {}

  render() {



    return (
      <div className={this.state.showBackground}>

        <div>

          <UserData
            reportUser={this.reportUser} />
          <div className="App">
            <Navbar loggedIn={this.state.loggedIn} />
            {/* greet user if logged in: */}
            {/* <UserGreeting /> */}
            {/* Routes to different components */}
            {/* <Route
          exact path="/"
          render={() =>
            <Home
              username={this.state.username}
              loggedIn={this.state.loggedIn}
            />}
        /> */}
            <Route exact path="/" render={(props) => <InjuryList
              showBackground={this.showBackground}
              hideBackground={this.hideBackground}
              {...props} />} />
            {/* <Route
              exact path="/"
              component={InjuryList} /> */}
            <Route
              path="/login"
              component={User}
            />
            <Route
              path="/signup"
              component={User}
            />

            <Route
              exact path="/add-treatment"
              component={AddTreatmentForm} />
            {/* <Route
            path="/injury-list"
            component={InjuryList} /> */}

            <Route
              path="/add-injury"
              component={AddInjuryForm} />
            <Route
              exact path="/injury-info"
              component={InjuryInfo} />
          </div>
        </div>
      </div>

    );
  }
}

//can't connect App to store or routing doesn't work
export default App;

// CHEATSHEET

// Conditional Rendering
//     { this.props.loggedIn === true &&

// {isLoggedIn ? (
//   <LogoutButton onClick={this.handleLogoutClick} />
// ) : (
//   <LoginButton onClick={this.handleLoginClick} />
// )}

//TO DO
// Hide edit/delete buttons for user != author
// Check server side for authentication on edit/delete routes
// Handle error from server client side--redirect and get data
// Don't let author upvote their own treatment/comment
// hide edit delete on comments