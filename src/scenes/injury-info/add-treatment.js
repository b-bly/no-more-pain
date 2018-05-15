import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
//actions
import addTreatment from '../../actions/add-treatment'
//styles
import './styles.css';

class AddTreatmentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('add-injury-form, nextProps: ');
        console.log(nextProps);
        if (!!nextProps.injuryInfo &&
            nextProps.injuryInfo !== 'fail') {
            //if successful request
            this.setState({
                redirectTo: '/injury-info',
                name: '',
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
        console.log('add-injury-form, injury:: ');
        console.log(this.state);
        //need to have injury id
        this.props.addTreatment({
            injuryId: this.props.injuryInfo._id,
            treatment: {
                name: this.state.name,
                description: this.state.description,
                author: this.props.user,
            }
        });
        //redirect in componentWillReceiveProps--response from actions
    }

    cancel() {
        this.setState({
            redirectTo: '/injury-info',
            title: '',
            description: ''
        });
    }
    render() {
        //const user = this.props.user;
        console.log('add-injury rendered');

        if (this.state.redirectTo !== null) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else if (this.props.injuryInfo.title === undefined) {
            return <Redirect to='/injury-list' />
        } 
        else {
            return (
                <div className="columns">
                    <span className="font-size-3 col-6 col-mx-auto">Add New Treatment to {this.props.injuryInfo.title}</span>
                    <div className="col-12">
                        <form className="form-horizontal font-size-2" onSubmit={this.handleSubmit}>
                            <div className="form-group flex-start">
                                <div className="col-2 col-ml-auto">
                                    <label className="form-label" htmlFor="name">Name of Treatment:</label>
                                </div>
                                <div className="col-4 col-mr-auto">
                                    <input className="form-input font-size-1"
                                        type="text"
                                        id="name"                                        
                                        name="name"
                                        placeholder="Name of treatment"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group flex-start">
                                <div className="col-2 col-ml-auto">
                                    <label className="form-label" htmlFor="password">Description: </label>
                                </div>
                                <div className="col-4 col-mr-auto">
                                    <textarea
                                        className="form-input description font-size-1"
                                        placeholder=" "
                                        type="text"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-7"></div>
                                <input className="btn col-1"
                                    type="button"
                                    value="Cancel"
                                    onClick={this.cancel}
                                ></input>
                                &nbsp;
								<input
                                    className="btn btn-primary col-1"
                                    type="submit"
                                    value="Submit"
                                ></input>
                                <div className="col-1 col-mr-auto"></div>
                            </div>
                        </form>
                    </div>
                </div>

            )
        }
    }
}

AddTreatmentForm.propTypes = {
    injuryId: PropTypes.number,
    //name: PropTypes.string,
    //comments: PropTypes.array, //of objects
    //description: PropTypes.string
    //upvotes: PropTypes.number
};

function mapStateToProps(state) {
    console.log('add-treatment mapStateToProps called, state: ');
    console.log(state);
    return {
        injuryInfo: state.injuryInfo
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addTreatment: addTreatment
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTreatmentForm);
