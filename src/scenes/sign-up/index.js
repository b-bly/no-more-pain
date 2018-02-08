import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
//actions
import signUp from '../../actions/sign-up';
//components
import UserForm from '../login/user-form'

class SignupForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		console.log('sign-up, nextProps: ');
		console.log(nextProps);
		
		if (nextProps.user !== 'fail') {
			//if successful login
			this.setState({
				redirectTo: '/login'
			})
		}
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		event.preventDefault()
		console.log('sign-up-form, username: ');
		console.log(this.state.username);

		this.props.signUp({
			username: this.state.username,
			password: this.state.password
		})
	}
	render() {
		const user = this.props.user;
		console.log('signup rendered');
		
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div >
					<h4>Sign Up</h4>
					<UserForm
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						username={this.state.username}
						password={this.state.password}
						buttonText="Sign Up" />
				</div>

			)
		}
	}
}

function mapStateToProps(state) {
	console.log('sign-up.js mapStateToProps called, state: ');
	console.log(state);
	return {
		user: state.user //users is labeled in reducers/index.js
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		signUp: signUp //binds function imported above to the name that will be available in this.props,
		//so this.props.postNewUser
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

