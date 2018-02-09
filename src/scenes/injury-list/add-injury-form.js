import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
//actions



class AddInjuryForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		console.log('add-injury-form, nextProps: ');
		console.log(nextProps);

		if (!!nextProps.newInjury &&
			nextProps.newInjury !== 'fail') {
			//if successful login
			this.setState({
				redirectTo: '/injury-list',
				title: '',
				description: ''
			})
		}
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		event.preventDefault()
		console.log('sign-up-form, username: ');
		console.log(this.state.username);

		this.props.addInjury({
			username: this.state.title,
			password: this.state.description
		})
	}
	render() {
		//const user = this.props.user;
		console.log('signup rendered');

		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div >
					<h4>Add New Injury</h4>
					<div>
						<form className="form-horizontal" onSubmit={this.handleSubmit}>
							<div className="form-group">
								<div className="col-1 col-ml-auto">
									<label className="form-label" htmlFor="title">Name of injury:</label>
								</div>
								<div className="col-3 col-mr-auto">
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
								<div className="col-1 col-ml-auto">
									<label className="form-label" htmlFor="password">Description: </label>
								</div>
								<div className="col-3 col-mr-auto">
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
								<button
									className="btn btn-primary col-1 col-mr-auto"
									type="submit">Submit</button>
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
	console.log('sign-up.js mapStateToProps called, state: ');
	console.log(state);
	return {
		injury: state.injury //users is labeled in reducers/index.js
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		//injury: injury //binds function imported above to the name that will be available in this.props,
		//so this.props.postNewUser
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInjuryForm);