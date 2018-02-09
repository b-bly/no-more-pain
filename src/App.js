import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom'
// components
import Signup from './scenes/sign-up'
import LoginForm from './scenes/login'
import Navbar from './components/navbar'
import Home from './scenes/home/index.js'
import UserGreeting from './scenes/home/user-greeting'

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
          render={() =>
            <LoginForm
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup
            />}
        />

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