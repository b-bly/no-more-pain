import React, { Component } from 'react'
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';
//actions
import getUser from './actions/get-user';

class UserData extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
    }

     componentWillMount() {
        this.props.getUser();
     }

     componentWillReceiveProps() {
        if (this.props.user.username) {
            // tell App.js there's a user
            // this.props.reportUser(this.props.user);
        } else {
            // tell App.js there is no user logged in
            this.props.reportUser(false);
        }
     }

    render() {

  
            return (
                <div>

                </div>
            )
        
    }
}

// UserData.propTypes = {
//     username: PropTypes.string,
//     password: PropTypes.string
// };

function mapStateToProps(state) {
    return {
        user: state.user //users is labeled in reducers/index.js
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUser: getUser,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserData);