import React, { Component } from 'react'

class UserForm extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.handleChange(event);
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.handleSubmit(event);
    }

    render() {

        return (
            <div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="username">Username</label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={this.props.username}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="password">Password: </label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                placeholder="password"
                                type="password"
                                name="password"
                                value={this.props.password}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group ">
                        <div className="col-7"></div>
                        <button
                            className="btn btn-primary col-1 col-mr-auto"

                            onClick={this.handleSubmit}
                            type="submit">{this.props.buttonText}</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UserForm
