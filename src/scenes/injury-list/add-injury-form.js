import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
//actions
import addInjury from '../../actions/add-injury'


class AddInjuryForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			description: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.cancel = this.cancel.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		event.preventDefault()
		console.log('add-injury-form, injury:: ');
		console.log(this.state);
		this.props.addInjury({
			title: this.state.title,
			description: this.state.description,
			username: this.props.user.username ? this.props.user.username : 'anonymous',
		})
		this.setState({
			redirectTo: '/',
			title: '',
			description: ''
		})
	}

	cancel() {
		this.setState({
			redirectTo: '/',
			title: '',
			description: ''
		})
	}
	render() {
		//const user = this.props.user;
		console.log('add-injury rendered');
		console.log(this.props);
		
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="columns">
					<div className="col-6 col-mx-auto font-size-3">Add New Injury</div>
					<div className="col-12">
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
									<textarea className="form-input"
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

AddInjuryForm.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string
};

function mapStateToProps(state) {
	console.log('add-injury mapStateToProps called, state: ');
	console.log(state);
	return {
		injuryInfo: state.injuryInfo,
		user: state.user
		 //users is labeled in reducers/index.js
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addInjury: addInjury //binds function imported above to the name that will be available in this.props,
		//so this.props.postNewUser
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInjuryForm);

