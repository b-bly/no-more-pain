import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// components
import Reply from './add-reply';
import Comments from './comments';
import AddTreatmentForm from './treatment-form'
//actions
import deleteTreatment from '../../actions/delete-treatment'; //move to index.js

class Treatment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treatmentId: '', //selected treatment
            commentId: '',
            commentParentId: '', //will need eventually for nested comments
            showComments: true,
            showEditTreatmentForm: '',
        }
        this.toggleComments = this.toggleComments.bind(this);
        this.showReplyForm = this.showReplyForm.bind(this);
        this.cancelReply = this.cancelReply.bind(this);
        this.addReply = this.addReply.bind(this);
        this.editReply = this.editReply.bind(this);
        this.deleteTreatment = this.deleteTreatment.bind(this);
        this.showEditForm = this.showEditForm.bind(this);
        this.cancelTreatment = this.cancelTreatment.bind(this);
        this.editTreatment = this.editTreatment.bind(this);
    }

    handleClick() {
        //this.props.handleClick(this.props.injury._id);
    }

    deleteTreatment() {
        console.log('deleteTreatment');
        console.log(this.props.treatment._id);

        this.props.deleteTreatment(this.props.treatment._id, this.props.injuryId);
    }

    showReplyForm() {
        this.setState({
            treatmentId: this.props.treatment._id
        });

    }

    cancelReply() {
        this.setState({
            treatmentId: ''
        });

    }

    showEditForm(treatmentId) {
        this.setState({
            showEditTreatmentForm: treatmentId
        });
    }

    editTreatment() {
        console.log('editTreatment called');
        
    }
    cancelTreatment() {
        this.setState({
            showEditTreatmentForm: ''
        });
    }

    addReply(comment) {
        this.props.addReply(this.props.treatment._id, comment); //calling addReply in index.js, not action
        this.setState({
            treatmentId: ''
        });
    }

    editReply(commentObject) {
        this.props.editReply(commentObject)
        console.log('treatment.js, editReply, commentObject: ');
        console.log(commentObject);

        // {
        //     comment: comment,
        //     commentId: commentId,
        //     injuryId: this.props.injuryId
        // }
    }

    toggleDescription() {
        this.props.toggleDescription(this.props.treatment._id);
    }

    toggleComments() {
        this.setState({
            showComments: !this.state.showComments
        });
    }

    render() {

        return (
            // <div className="col-mr-auto col-10">
            // <div className="card">
            //     <div className="columns card-bdy">
            //         <div className="col-12 card-line">

            <div className="columns" >
                <div className="column col-4"></div>
                <div className="column col-6">
                    <div className="card">

                    {/* *** show form *** */}
                        {this.state.showEditTreatmentForm === this.props.treatment._id ?
                            <div>
                                <AddTreatmentForm 
                                treatment={this.props.treatment}
                                injuryId={this.props.injuryId}
                                editTreatment={this.editTreatment}
                                cancelTreatment={this.cancelTreatment}
                                mode={'edit'}
                                />
                            </div>
                            :

                            <div className="columns card-bdy">
                                <div className="col-12 card-title-line">
                                    <span className="treatment-name" >{this.props.treatment.name} &nbsp; </span>

                                </div>

                                <div className="col-12 card-line" >
                                    <button className="btn btn-sm" aria-label="up vote"><i className="icon icon-upward"></i></button>
                                    &nbsp;

                                    <span className="list-links">Upvotes: {this.props.treatment.upvotes} &nbsp;</span>
                                    <span className="toggle">
                                        <span className="list-links"
                                            onClick={this.toggleDescription.bind(this)}>
                                            description
                        {this.props.showDescription === this.props.treatment._id ?
                                                <span>: {this.props.treatment.description}</span>
                                                : null}
                                            &nbsp;
                                            &nbsp;
                                <span
                                                onClick={this.showReplyForm}
                                            > reply </span>
                                            &nbsp;
                                            &nbsp;
                                        <span
                                                onClick={() => this.showEditForm(this.props.treatment._id)}
                                            > edit </span>
                                            &nbsp;
                                            &nbsp;
                                <span
                                                onClick={this.deleteTreatment}
                                            > delete </span>
                                            &nbsp;
                                            &nbsp;
                                <span className="heading"
                                                onClick={this.toggleComments}>
                                                show comments </span>
                                        </span>
                                    </span>
                                </div>
                                {/* ************************************************************ */}

                                {this.state.treatmentId !== '' &&
                                    <div className="col-12">
                                        <div className="columns" >

                                            <div className="col-1"></div>
                                            <div className="col-11">
                                                <div className="card columns">


                                                    <Reply
                                                        addReply={this.addReply}
                                                        cancelReply={this.cancelReply}
                                                        mode={'add'}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                }
                                {/* *************************************************** */}
                                <div className="col-12">

                                    {this.state.showComments === true &&
                                        <Comments
                                            comments={this.props.comments}
                                            toggleComments={this.toggleComments}
                                            injuryId={this.props.injuryId}
                                            editReply={this.editReply}
                                        />
                                    }

                                </div>
                                {/* *** end comments *** */}
                            </div>

                        }
                        {/* *** end treatment if statement *** */}
                    </div>
                </div>
            </div >
        );
    }
}

function mapStateToProps(state) {
    console.log('Treatment mapStateToProps called, state: ');
    console.log(state);
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteTreatment: deleteTreatment
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Treatment);