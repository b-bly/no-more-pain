import React, { Component } from 'react'

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
                    <span>No More Pain</span>
                </div>
            )
        }
    }
}

export default Home;
