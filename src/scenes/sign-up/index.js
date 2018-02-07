import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import UserForm from '../login/user-form'

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
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
		//request to server here
		axios.post('/user', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (response.data) {
					console.log('successful signup')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('Sign-up error');

				}
			}).catch(error => {
				console.log('Sign up server error: ')
				console.log(error);
			})
	}
	render() {
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

	export default SignupForm
