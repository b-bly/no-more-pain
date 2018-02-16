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
            comments: '',
            description: '',
            upvotes: 0,
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.cancel = this.cancel.bind(this);
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
        console.log('add-injury-form, injury:: ');
        console.log(this.state);
        this.props.addInjury({
            name: this.state.name,
            comments: this.state.comments,
            description: this.state.description,
            upvotes: this.state.upvotes,
        })
        this.setState({
            redirectTo: '/injury-info'
        });



    }

    cancel() {
        this.setState({
            redirectTo: '/injury-list',
            title: '',
            description: ''
        })
    }
    render() {
        //const user = this.props.user;
        console.log('add-injury rendered');

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div >
                    <h4>Add New Injury</h4>
                    <div>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="col-2 col-ml-auto">
                                    <label className="form-label" htmlFor="title">Name of Treatment:</label>
                                </div>
                                <div className="col-4 col-mr-auto">
                                    <input className="form-input"
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="Name of injury"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-2 col-ml-auto">
                                    <label className="form-label" htmlFor="password">Description: </label>
                                </div>
                                <div className="col-4 col-mr-auto">
                                    <textarea
                                        className="form-input description"
                                        placeholder=" ."
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

AddTreatmentForm.propTypes = {
    name: PropTypes.string,
    comments: PropTypes.array, //of objects
    description: PropTypes.string,
    upvotes: PropTypes.number
};
// //add id
// id: Schema.Types.ObjectId,
// name: String,
// // comments: [String], //needs to be it's own schema?
// description: String,
// upvotes: Number

function mapStateToProps(state) {
    console.log('add-treatment mapStateToProps called, state: ');
    console.log(state);
    return {
        injuryInfo: state.injuryInfo //users is labeled in reducers/index.js
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addTreatment: addTreatment //binds function imported above to the name that will be available in this.props,
        //so this.props.postNewUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTreatmentForm);
