import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
//actions
//import addReply from '../../actions/add-reply'
//styles
import './styles.css';

export default class Reply extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('reply component, state: ');
        console.log(this.state);
        //need to figure out how to get access to injury and treatment ids

        this.props.addReply(this.state.comment);
    }

    cancel() {
        this.props.cancelReply();
    }

    render() {
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className="col-2 col-ml-auto">
                            <label className="form-label" htmlFor="name">Reply text: </label>
                        </div>
                        <div className="col-4 col-mr-auto">
                            <textarea className="form-input"
                                type="text"
                                id=""
                                name="comment"
                                placeholder="Name of treatment"
                                value={this.state.comment}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group ">
                                <div className="col-7"></div>
                                <input className="btn col-1"
                                    type="button"
                                    value="Cancel"
                                    onClick={this.cancel}
                                ></input>
                                &nbsp;
								<input
                                    className="btn btn-primary col-1 col-mr-auto"
                                    type="submit"
                                    value="Submit"
                                    onClick={this.handleSubmit}
                                ></input>
                            </div>
                </form>
            </div>

        );
    }
}

