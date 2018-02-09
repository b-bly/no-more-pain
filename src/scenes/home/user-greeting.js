import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
//actions
import getUser from '../../actions/get-user';

class UserGreeting extends Component {
    constructor() {
        super();
        this.state = {
            redirectTo: null
        }
    }

    getUser() {
        this.props.getUser();
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    {this.props.user.loggedIn &&
                        <p>Join the party, {this.props.user.username}!</p>
                    }
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
        getUser: getUser //binds function imported above to the name that will be available in this.props,
        //so this.props.postNewUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGreeting);
