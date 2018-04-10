import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// components
import User from './scenes/user'
import Navbar from './components/navbar'
import Home from './scenes/home/index.js'
import UserGreeting from './scenes/home/user-greeting'
import InjuryList from './scenes/injury-list/index.js'
import AddInjuryForm from './scenes/injury-list/add-injury-form'
import InjuryInfo from './scenes/injury-info'
import AddTreatmentForm from './scenes/injury-info/add-treatment'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }
  }

  render() {
    return (
      <div className="App">

        <Navbar loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        <UserGreeting />
        {/* Routes to different components */}
        <Route
          exact path="/"
          render={() =>
            <Home
              username={this.state.username}
              loggedIn={this.state.loggedIn}
            />}
        />

        <Route
          path="/login"
          component={User}
        />
        <Route
          path="/signup"
          component={User}
        />

  <Route
          path="/add-treatment"
          component={AddTreatmentForm} />
        <Route
          path="/injury-list"
          component={InjuryList} />
        <Route
          path="/add-injury"
          component={AddInjuryForm} />
        <Route
          path="/injury-info"
          component={InjuryInfo} />
         

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
// Clean up CSS file
// 