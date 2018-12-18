import React, { Component } from 'react'

//styles
import '../styles.css';
import '../../../index.css';

export default class TreatmentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillMount() {
        if (this.props.mode === 'edit') {
            this.setState({
                name: this.props.treatment.name,
                description: this.props.treatment.description,
              
            });
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault()

 
        const newTreatment = Object.assign({}, this.props.treatment);
        newTreatment.name = this.state.name;
        newTreatment.description = this.state.description;
        if (this.props.mode === 'add') {
            newTreatment.author = this.props.user;
            this.props.addTreatment(newTreatment);
        } else if (this.props.mode === 'edit') {
            //need treatmentId for editing, but not for adding a new treatment
            this.props.editTreatment(newTreatment);      
        }
        //need to figure out how to get access to injury and treatment ids  
    }

    cancel() {
        this.props.cancelTreatment();
    }
    render() {
        
        return (
            <div className="padding">
                {/* <h4>Add New Treatment to {this.props.injuryInfo.title}</h4> */}

                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className="col-4">
                            <label className="form-label" htmlFor="name">Name of Treatment:</label>
                        </div>
                        <div className="col-8">
                            <input className="form-input"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name of treatment"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-4">
                            <label className="form-label" htmlFor="password">Description: </label>
                        </div>
                        <div className="col-8">
                            <textarea
                                className="form-input description"
                                placeholder=" "
                                type="text"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group flex-end">
                        <div className="flex">
                        <input className="btn"
                            type="button"
                            value="Cancel"
                            onClick={this.cancel}
                        ></input>
                        <div>&nbsp;</div>
								<input
                            className="btn btn-primary"
                            type="submit"
                            value="Submit"
                        ></input>
                        </div>
                    </div>
                </form>

            </div>

        )
    }
}

