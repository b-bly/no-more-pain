import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
//actions
import login from '../../actions/login';
//components
import UserForm from '../login/user-form'

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loggedIn === true) {
            this.setState({
                redirectTo: '/'
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
        console.log('handleSubmit')

        this.props.login({
			username: this.state.username,
			password: this.state.password
		})
    }

    render() {
        console.log('login rendered');
        
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <h4>Login</h4>
                   <UserForm 
                   handleChange={this.handleChange}
                   handleSubmit={this.handleSubmit} 
                   username={this.state.username}
                   password={this.state.password}
                   buttonText="login" />
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
	console.log('login - mapStateToProps called, state: ');
	console.log(state);
	return {
		user: state.user //users is labeled in reducers/index.js
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		login: login //binds function imported above to the name that will be available in this.props,
		//so this.props.postNewUser
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);