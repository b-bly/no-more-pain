import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            redirectTo: null
        }
    }
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <p>No More Pain</p>
                    <Link to="/injury-list">Injury List</Link>
                </div>
            )
        }
    }
}

export default Home;
