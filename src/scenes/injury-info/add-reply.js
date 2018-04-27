import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
//actions
//import addReply from '../../actions/add-reply'
//styles
import './styles.css';
import '../../index.css';

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

    componentWillMount () {
        if (this.props.mode === 'edit') {       
        this.setState({
            comment: this.props.comment
        })
    }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('reply component, state: ');
        console.log(this.state);
        if (this.props.mode === 'add') {
            this.props.addReply(this.state.comment);
        } else if (this.props.mode === 'edit') {
            this.props.editReply(this.state.comment, this.props.comment_id);
        }       
        //need to figure out how to get access to injury and treatment ids  
    }

    cancel() {
        this.props.cancelReply();
    }

    render() {
        return (

           
            <div className="">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group col-12">
  
                            <textarea className="form-input"
                                type="text"
                                id=""
                                name="comment"
                                placeholder="Comment"
                                value={this.state.comment}
                                onChange={this.handleChange}
                            /> 
                    </div>
                    <div className="form-group col-12">
                                
                                <input className="btn "
                                    type="button"
                                    value="Cancel"
                                    onClick={this.cancel}
                                />
                                &nbsp;
                                
								<input
                                    className="btn btn-primary "
                                    type="submit"
                                    value="Submit"
                                    onClick={this.handleSubmit}
                                />
                            </div>
                </form>
            </div>

        );
    }
}

