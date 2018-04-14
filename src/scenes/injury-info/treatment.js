import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// components
import Reply from './add-reply';
import Comments from './comments';

//actions
import deleteTreatment from '../../actions/delete-treatment'

class Treatment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treatmentId: '', //selected treatment
            commentId: '',
            commentParentId: '', //will need eventually for nested comments
            showComments: true
        }
        this.showReplyForm = this.showReplyForm.bind(this);
        this.cancelReply = this.cancelReply.bind(this);
        this.addReply = this.addReply.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.deleteTreatment = this.deleteTreatment.bind(this);
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

    showEditForm() {

    }

    addReply(comment) {    
        this.props.addReply(this.props.treatment._id, comment); //calling addReply in index.js, not action
        this.setState({
            treatmentId: ''
        });

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
                                            onClick={this.showEditForm}
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
                                <div>
                                    <div className="container">

                                        <div className="col-12 card-line">

                                            <Reply
                                                addReply={this.addReply}
                                                cancelReply={this.cancelReply}
                                                mode={'add'}
                                            />
                                        </div>
                                    </div>
                                </div>

                            }
                            {/* *************************************************** */}
                            <div className="col-12 card-line ">

                                {this.state.showComments === true &&
                                    <Comments
                                        comments={this.props.comments}
                                        toggleComments={this.toggleComments}
                                        injuryId={this.props.injuryId}
                                    />
                                }

                            </div>
                        </div>
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