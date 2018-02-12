import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
//actions

class InjuryForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
            id: '',
			title: '',
			description: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.cancel = this.cancel.bind(this);
    }
    
    componentWillMount () {
        this.setState({
            id: this.props.injury._id,
            title: this.props.injury.title,
            description: this.props.injury.description
        })
    }

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
    }
    
	handleSubmit(event) {
		event.preventDefault()
		console.log('injury-form, injury:: ');
		console.log(this.state);
		this.props.updateInjury({
            id: this.state.id,
			title: this.state.title,
			description: this.state.description
		})
		//set state of parent, don't show form
        		
	}

	cancel() {
		this.setState({
			title: '',
			description: ''
        })
        this.props.cancel();
        //set state of parent: showForm: ''
	}
	render() {
		//const user = this.props.user;
		console.log('add-injury rendered');

		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div >
					<h4>Edit Injury</h4>
					<div>
						<form className="form-horizontal" onSubmit={this.handleSubmit}>
							<div className="form-group">
								<div className="col-2 col-ml-auto">
									<label className="form-label" htmlFor="title">Name of injury:</label>
								</div>
								<div className="col-4 col-mr-auto">
									<input className="form-input"
										type="text"
										id="title"
										name="title"
										placeholder="Name of injury"
										value={this.state.title}
										onChange={this.handleChange}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="col-2 col-ml-auto">
									<label className="form-label" htmlFor="password">Description: </label>
								</div>
								<div className="col-4 col-mr-auto">
									<input className="form-input"
										placeholder="description"
										type="description"
										name="description"
										value={this.state.description}
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
									></input>
							</div>
						</form>
					</div>
				</div>

			)
		}
	}
}



export default InjuryForm;
