import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// components
import Reply from './add-reply';
import Comments from './comments';
import AddTreatmentForm from './treatment-form'
import Button from './button';
//actions
import deleteTreatment from '../../actions/delete-treatment'; //move to index.js


class Treatment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treatmentId: '', //selected treatment
            commentId: '', // for edit comment
            commentParentId: '', //will need eventually for nested comments
            showComments: true, // show / hide comments
            showEditTreatmentForm: false,

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
        this.treatmentUpvote = this.treatmentUpvote.bind(this);
        this.commentUpvote = this.commentUpvote.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    deleteTreatment() {
        const permission = window.confirm("Are you sure you want to delete " + this.props.treatment.name);
        if (permission === true) {
            const treatmentData = {
                treatmentId: this.props.treatment._id,
                injuryId: this.props.injuryId,
                authorId: this.props.treatment.author.id
            }
            this.props.deleteTreatment(treatmentData);
        }
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

        this.setState({
            showEditTreatmentForm: !this.showEditTreatmentForm,
        });

    }

    editTreatment(newTreatment) {
        this.props.editTreatment(newTreatment);
        this.setState({
            showEditTreatmentForm: ''
        });
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
        // comment object definition:
        // {
        //     comment: comment,
        //     commentId: commentId,
        //     injuryId: this.props.injuryId
        // }
    }

    toggleComments() {
        this.setState({
            showComments: !this.state.showComments
        });
    }

    treatmentUpvote(e) {
        e.preventDefault();
        const treatmentUpvoteData = {
            injuryId: this.props.injuryId,
            treatmentId: this.props.treatmentId,
            authorId: this.props.treatment.author._id, //this should be the treatment author
        };

        this.props.treatmentUpvote(treatmentUpvoteData);
    }

    commentUpvote(commentData) {
        this.props.commentUpvote(commentData);
    }

    deleteComment(commentId) {
        this.props.deleteComment(commentId);
    }
    render() {
        let isTheAuthor = false;
        if (this.props.treatment.author) {
            if (this.props.treatment.author.id === this.props.user.id) {
                isTheAuthor = true;
            }
        }

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
                        {this.state.showEditTreatmentForm ?
                            <div>
                                <AddTreatmentForm
                                    treatment={this.props.treatment}
                                    injuryId={this.props.injuryId}
                                    editTreatment={this.editTreatment}
                                    cancelTreatment={this.cancelTreatment}
                                    mode={'edit'}
                                    user={this.props.user}
                                />
                            </div>
                            :

                            <div className="">
                                <div className="flex-row">
                                    <div className="flex-column align-items-center">
                                            <Button
                                            handleClick={this.treatmentUpvote}
                                            icon="fa fa-thumbs-up"
                                            aria="upvote"
                                            isTheAuthor={isTheAuthor}
                                        />
                                        <div><div className="font-size-2" id="upvotes">{this.props.treatment.upvotes.length} &nbsp;
                                        </div></div>
                                    </div>
                                    <div className="flex-column">
                                        <div className="">
                                            <span className="treatment-name font-size-2" >
                                                <strong >Treatment: </strong>
                                                {this.props.treatment.name} &nbsp;
                                    </span>
                                        </div>

                                        <div className="">
                                            <span className="card-description font-size-2">
                                                <strong>Description: </strong>
                                                {this.props.treatment.description}
                                            </span>
                                        </div>

                                        {this.props.treatment.author && (
                                            <div className="">
                                                <span className="font-size-1" >Author: <strong>{this.props.treatment.author.username} </strong>&nbsp; </span>
                                            </div>
                                        )}
                                    </div>
                                </div>




                                <div className="col-12  flex-start wrap" >


                                    {this.props.user.loggedIn === true && (
                                        <Button
                                            handleClick={this.showReplyForm}
                                            icon="fa fa-reply"
                                            aria="comment"
                                        />
                                    )}

                                    {/* Only show if user === author  */}
                                    {isTheAuthor === true && (
                                        <Button
                                            handleClick={this.showEditForm}
                                            icon="fa fa-edit"
                                            aria="edit"
                                        />

                                    )}
                                    {isTheAuthor === true && (
                                        <Button
                                            handleClick={this.deleteTreatment}
                                            icon="fa fa-trash"
                                            aria="delete"
                                        />
                                    )}
                                    {this.props.comments.length > 0 && (
                                        <div>

                                            <span className="btn btn-sm list-links"
                                                onClick={this.toggleComments}>
                                                {this.state.showComments === true ?
                                                    (<span>hide </span>)
                                                    :
                                                    (<span>show </span>)
                                                }
                                                comments
                                                </span>
                                        </div>
                                    )}

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
                                            commentUpvote={this.commentUpvote}
                                            deleteComment={this.deleteComment}
                                            user={this.props.user}
                                            treatment={this.props.treatment}
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
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteTreatment: deleteTreatment
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Treatment);