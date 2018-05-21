import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
//actions
import login from '../../actions/login';
import signUp from '../../actions/sign-up';
//components
import UserForm from './user-form'

class User extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
            message: '',
        }
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loggedIn === true) {
            this.setState({
                redirectTo: '/'
            });
        } else if (nextProps.user.error) {
            //if successful login
            let message = 'Error ';
            let redirect = '/';
            switch (nextProps.user.error) {
                case 'login':
                    message += 'logging in.  Try again';
                    break;
                case 'signup':
                    message += 'signing up. Try again.';
                    break; 
                case 'logout':
                    message += 'logging out. Try again.';
                    break;
                default:
                    break;
            }
            this.setState({
                message: message,
            });
        } else if (nextProps.match.path !== '/login') {
            this.setState({
                redirectTo: '/login'
            });
        }

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    login(event) {
        event.preventDefault()
        this.props.login({
            username: this.state.username,
            password: this.state.password
        })
    }

    signup(event) {
        event.preventDefault()
        this.props.signUp({
            username: this.state.username,
            password: this.state.password
        })
    }

    render() {   
        const match = this.props.match.path;
        let buttonText = 'login';
        if (match !== '/login') {            
            buttonText = 'submit';
        }

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="container">
                    <div className="columns">
                        {match === "/login" ? (
                            <div className="user-container">
                                <div className="justify-content-center ">
                                    <div className="font-size-3">Login</div>
                                </div>
                                {this.state.message.length > 0 && (
                                    <div className="justify-content-center ">
                                        <div className="font-size-1">{this.state.message}</div>
                                    </div>
                                )}
                                <UserForm
                                    handleChange={this.handleChange}
                                    handleSubmit={this.login}
                                    username={this.state.username}
                                    password={this.state.password}
                                    buttonText="login"
                                    message={this.state.message} />

                            </div>
                        ) : (
                                <div className="user-container">
                                    <div className="justify-content-center">
                                        <div className="font-size-3">Sign up</div>
                                    </div>
                                    {this.state.message.length > 0 && (
                                        <div className="justify-content-center ">
                                            <div className="font-size-1">{this.state.message}</div>
                                        </div>
                                    )}

                                    <UserForm
                                        handleChange={this.handleChange}
                                        handleSubmit={this.signup}
                                        username={this.state.username}
                                        password={this.state.password}
                                        buttonText="submit"
                                        message={this.state.message} />
                                </div>
                            )}

                    </div>
                </div>
            )
        }
    }
}

User.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string
};

function mapStateToProps(state) {
    return {
        user: state.user //users is labeled in reducers/index.js
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login: login,
        signUp: signUp //binds function imported above to the name that will be available in this.props,
        //so this.props.postNewUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User);