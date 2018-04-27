import React, { Component } from 'react'

//styles
import './styles.css';
import '../../index.css';

export default class TreatmentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            treatmentId: '',
            name: '',
            description: '',
            upvotes: '',
            injuryId: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillMount() {
        if (this.props.mode === 'edit') {
            this.setState({
                treatmentId: this.props._id,
                name: this.props.name,
                description: this.props.description,
                upvotes: this.props.upvotes,
                injuryId: this.props.injuryId,
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
        console.log('reply component, state: ');
        console.log(this.state);
        const newTreatment = {
            name: this.state.name,
            description: this.state.description,
            upvotes: this.state.upvotes,
            injuryId: this.state.injuryId,
        };
        if (this.props.mode === 'add') {
            this.props.addTreatment(newTreatment);
        } else if (this.props.mode === 'edit') {
            //need treatmentId for editing, but not for adding a new treatment
            newTreatment.treatmentId = this.state.treatmentId;
            this.props.editTreatment(newTreatment);
        }
        //need to figure out how to get access to injury and treatment ids  
    }

    cancel() {
        this.props.cancelTreatment();
    }
    render() {
        console.log('treatment-form rendered');

        return (
            <div >
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
                    <div className="form-group ">
                        <div className="col-8"></div>
                        <input className="btn col-2"
                            type="button"
                            value="Cancel"
                            onClick={this.cancel}
                        ></input>
                        &nbsp;
								<input
                            className="btn btn-primary col-2 "
                            type="submit"
                            value="Submit"
                        ></input>
                    </div>
                </form>

            </div>

        )
    }
}

