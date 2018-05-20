import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './navbar.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import logo from "./Runners.png";
//actions
import logout from '../../actions/logout';

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    componentWillMount() {
        this.showBackground;
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        this.props.logout(this.props.user);
      }

    render() {
        const loggedIn = this.props.user.loggedIn;
        
        return (
            <div className="text-center">
                <header className="navbar App-header" id="nav-container">
                    <div className="col-4" >
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="/" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="text-secondary nav-link">logout</span></Link>

                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary nav-link">home</span>
                                        </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                    <span className="text-secondary nav-link">login</span>
				</Link>
                                    <Link to="/signup" className="btn btn-link">
                                    <span className="text-secondary nav-link">sign up</span>
				</Link>
                                </section>
                            )}
                    </div>
                    <div className="col-4 col-mr-auto">
                    <div id="top-filler flex-column"></div>
                        <div><img src={logo} className="logo" alt="logo" /></div>
                        <div className="App-title">No More Pain</div>
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