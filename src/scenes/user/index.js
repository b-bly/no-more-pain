import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
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
            redirectTo: null
        }
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loggedIn === true) {
            this.setState({
                redirectTo: '/'
            })
        } else if (nextProps.user !== 'fail') {
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

    login(event) {
        event.preventDefault()
        console.log('handleSubmit')

        this.props.login({
            username: this.state.username,
            password: this.state.password
        })
    }

    signup(event) {
        event.preventDefault()
        console.log('sign-up-form, username: ');
        console.log(this.state.username);

        this.props.signUp({
            username: this.state.username,
            password: this.state.password
        })
    }

    render() {
        console.log('login rendered');
        console.log(this.props);
        const match = this.props.match;
        console.log('match: ');
        console.log(match);
        
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>

                    <div>
                       {match.url=="/login" ? (

                       
                                    <div>
                                        <h4>Login</h4>
                                        <UserForm
                                            handleChange={this.handleChange}
                                            handleSubmit={this.login}
                                            username={this.state.username}
                                            password={this.state.password}
                                            buttonText="login" />
                                    </div>
                       ) : (
                         
                                    <div>
                                        <h4>Sign up</h4>
                                        <UserForm
                                            handleChange={this.handleChange}
                                            handleSubmit={this.signup}
                                            username={this.state.username}
                                            password={this.state.password}
                                            buttonText="submit" />
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
    console.log('login - mapStateToProps called, state: ');
    console.log(state);
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