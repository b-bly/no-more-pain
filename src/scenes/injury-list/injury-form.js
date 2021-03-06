import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

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

	componentWillMount() {
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
		this.props.editInjury({
			_id: this.state.id,
			title: this.state.title,
			description: this.state.description,
			author: this.props.injury.author,
			upvotes: [],
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


					<div className="card col-6 col-mx-auto padding">
						<div className="font-size-3 col-12 col-mx-auto">Edit Injury</div>
						<form className="form-horizontal" onSubmit={this.handleSubmit}>
							<div className="form-group">
								<div className="col-4 col-ml-auto">
									<label className="form-label" htmlFor="title">Name of injury:</label>
								</div>
								<div className="col-8 col-mr-auto">
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
								<div className="col-4 col-ml-auto">
									<label className="form-label" htmlFor="password">Description: </label>
								</div>
								<div className="col-8 col-mr-auto">
									<input className="form-input"
										placeholder="description"
										type="description"
										name="description"
										value={this.state.description}
										onChange={this.handleChange}
									/>
								</div>
							</div>
							<div className="form-group flex-end">
								<div>
									<input className="btn"
										type="button"
										value="Cancel"
										onClick={this.cancel}
										style={{ marginRight: ".4rem" }}
									/>

									<input
										className="btn btn-primary col-mr-auto"
										type="submit"
										value="Submit"
									/>
								</div>
							</div>
						</form>
					</div>
				</div>

			)
		}
	}
}



export default InjuryForm;
