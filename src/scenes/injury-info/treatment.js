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
                injuryId: this.props.injuryInfo._id,
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
            injuryId: this.props.injuryInfo._id,
            treatmentId: this.props.treatment._id,
            authorId: this.props.treatment.author._id, //this should be the treatment author
        };

        this.props.treatmentUpvote(treatmentUpvoteData);
    }

    commentUpvote(commentData) {
        this.props.commentUpvote(commentData);
    }

    deleteComment(commentData) {
        this.props.deleteComment(commentData);
    }
    render() {
        let isTheAuthor = false;
        if (this.props.treatment.author) {
            if (this.props.treatment.author.id === this.props.user.id) {
                isTheAuthor = true;
            }
        }
        console.log('treatment.js this.props');
        console.log(this.props);
        return (
   //this.props.injuryInfo
//    injuryId
//    :
//    "5af4d63f2e1dba9509e1b25f"
//    injuryInfo
//    :
//    author
//    :
//    {username: "al", id: "5a7ddf840898fd83b5c6b3bb"}
//    description
//    :
//    "hmmm in elbow"
//    title
//    :
//    "Tennis Elbow"
//    treatments
//    :
//    Array(4)
//    0
//    :
//    author
//    :
//    {username: "al", id: "5a7ddf840898fd83b5c6b3bb"}
//    comments
//    :
//    [{…}]
//    description
//    :
//    "testing"
//    name
//    :
//    "testing"
//    upvotes
//    :
//    (4) ["5a7ddf840898fd83b5c6b3bb", "5a7ddf840898fd83b5c6b3bb", "5a7ddf840898fd83b5c6b3bb", "5a7ddf840898fd83b5c6b3bb"]
//    _id
//    :
//    "5af4dbc4c5a6fa95dd48a675"
//    __proto__
//    :
//    Object
//    1
//    :
//    {upvotes: Array(0), author: {…}, _id: "5af585edcc1fe5a3a740ab54", name: "Milkshakes", description: "drink", …}
//    2
//    :
//    {upvotes: Array(0), author: {…}, _id: "5af8c90fafd81ccf05bbb6d6", name: "THis is what other people are doing", description: "", …}
//    3
//    :
//    {upvotes: Array(0), author: {…}, _id: "5afb3ae36a517cf3f18d7521", name: "fff", description: "", …}
//    length
//    :
//    4
//    __proto__
//    :
//    Array(0)
//    upvotes
//    :
//    ["5a7ddf840898fd83b5c6b3bb"]
//    __v
//    :
//    0
//    _id
//    :
//    "5af4d63f2e1dba9509e1b25f"

// this.props.user
// user
// :
// id
// :
// "5a7ddf840898fd83b5c6b3bb"
// loggedIn
// :
// true
// username
// :
// "al"

            // Old treatment props: 
        //     <Treatment
        //     treatment={treatment}
        //     treatmentId={treatment._id}
        //     injuryId={this.props.injuryInfo._id}
        //     comments={treatment.comments}
        //     // *********************** treatmentCopy.comments
        //     addReply={this.addReply}
        //     editReply={this.editReply}
        //     editTreatment={this.editTreatment}
        //     treatmentUpvote={this.treatmentUpvote}
        //     commentUpvote={this.commentUpvote}
        //     user={this.props.user}
        //     deleteComment={this.deleteComment}
        // />
            <div className="columns" >
                <div className="column col-4"></div>
                <div className="column col-6">
                    <div className="card">

                        {/* *** show form *** */}
                        {this.state.showEditTreatmentForm ?
                            <div>
                                <AddTreatmentForm
                                    treatment={this.props.treatment}
                                    injuryId={this.props.injuryInfo._id}
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
                                    {this.props.treatment.comments.length > 0 && (
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
                                            comments={this.props.treatment.comments} //replace
                                            toggleComments={this.toggleComments}
                                            injuryId={this.props.injuryInfo._id}
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