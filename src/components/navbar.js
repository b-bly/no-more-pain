import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import './navbar.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//actions
import logout from '../actions/logout';

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        this.props.logout(this.props.user);
      }

    render() {
        const loggedIn = this.props.user.loggedIn;
        
        return (
            <div>

                <header className="navbar App-header" id="nav-container">
                    <div className="col-4" >
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="text-secondary">logout</span></Link>

                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">home</span>
                                        </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                    <span className="text-secondary">login</span>
				</Link>
                                    <Link to="/signup" className="btn btn-link">
                                    <span className="text-secondary">sign up</span>
				</Link>
                                </section>
                            )}
                    </div>
                    <div className="col-4 col-mr-auto">
                    <div id="top-filler"></div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">No More Pain</h1>
                    </div>
                </header>
            </div>

        );

    }
}


function mapStateToProps(state) {
	return {
		user: state.user //users is labeled in reducers/index.js
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		logout: logout //binds function imported above to the name that will be available in this.props,
		//so this.props.postNewUser
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);