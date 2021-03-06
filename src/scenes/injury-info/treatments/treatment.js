import React, { Component } from 'react';
// components
import Comments from '../comments/comments';
import TreatmentForm from './treatment-form'
import Button from '../button';


export default class Treatment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCommentForm: '', //stores treatment id and passes to comments props to show form
            commentId: '', // for edit comment
            commentParentId: '', //will need eventually for nested comments
            showComments: true, // show / hide comments
            showEditTreatmentForm: false,

        }
        this.toggleComments = this.toggleComments.bind(this);
        this.toggleAddCommentForm = this.toggleAddCommentForm.bind(this);
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

    toggleAddCommentForm() {

        if (this.state.addCommentForm === '') {
            this.setState({
                addCommentForm: this.props.treatment._id
            });
        } else {
            this.setState({
                addCommentForm: ''
            });
        }
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
        const userUpvoted = this.props.treatment.upvotes.includes(this.props.user.id);
        let thumbsUpIconClass = userUpvoted ? 'fa fa-thumbs-up' : 'fa fa-thumbs-o-up';

        //disable upvote button if not logged in or if it is the author of the treatment.
        let disableUpvote = true; //disabled
        if (this.props.treatment.author &&
            this.props.user.loggedIn === true) { //need to check if there is an author and a user or it will throw
            //an undefined error.
            if (this.props.treatment.author.id !== this.props.user.id) //if logged in and it's not the author,
                //don't disable upvote
                disableUpvote = false;
        }

        return (

            <div className="columns" >
                <div className="column col-4 col-sm-0"></div>
                <div className="column col-6 col-sm-12">
                    <div className="card">
                        {/* *** show form *** */}
                        {this.state.showEditTreatmentForm ?
                            <div>
                                <TreatmentForm
                                    treatment={this.props.treatment}
                                    injuryId={this.props.injuryInfo._id}
                                    editTreatment={this.editTreatment}
                                    cancelTreatment={this.cancelTreatment}
                                    mode={'edit'}
                                    user={this.props.user}
                                />
                            </div>
                            :

                            <div className="flex-column flex-start">
                                <div className="flex-row flex-start no-wrap">
                                    <div className="flex-column align-items-center card-left padding">

                                        <Button
                                            handleClick={this.treatmentUpvote}
                                            icon={thumbsUpIconClass}
                                            aria="upvote"
                                            disable={disableUpvote}
                                            className={''}
                                        />


                                        <div className="font-size-2 padding-small" id="upvotes">{this.props.treatment.upvotes.length}
                                        </div>
                                    </div>

                                    {/* Treatment info */}

                                    <div className="card-right padding">
                                        <div className="text">
                                            <p className="font-size-2 " >
                                                <strong >Treatment: </strong>
                                                {this.props.treatment.name} &nbsp;
                                            </p>

                                            <p className="card-description font-size-2">
                                                <strong>Description: </strong>
                                                {this.props.treatment.description}
                                            </p>

                                            {this.props.treatment.author && (

                                                <p className="font-size-1" >Author: <strong>
                                                    {this.props.treatment.author.username}
                                                </strong>
                                                    &nbsp;
                                            </p>

                                            )}
                                        </div>

                                        <div className="col-12  flex-end wrap" >
                                            {this.props.user.loggedIn === true && (
                                                <Button
                                                    handleClick={this.toggleAddCommentForm}
                                                    icon="fa fa-reply"
                                                    aria="comment"
                                                    className='right-row-buttons'
                                                />
                                            )}

                                            {/* Only show if user === author  */}
                                            {isTheAuthor === true && (
                                                <Button
                                                    handleClick={this.showEditForm}
                                                    icon="fa fa-edit"
                                                    aria="edit"
                                                    className='right-row-buttons'
                                                />

                                            )}
                                            {isTheAuthor === true && (
                                                <Button
                                                    handleClick={this.deleteTreatment}
                                                    icon="fa fa-trash"
                                                    aria="delete"
                                                    className='right-row-buttons'
                                                />
                                            )}
                                            {this.props.treatment.comments.length > 0 && (
                                                <div>

                                                    <span className="btn btn-sm right-row-buttons"
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


                                            {/* *************************************************** */}
                                        </div>

                                    </div> {/* card-right */}
                                </div>


                                <div className="col-12">
                                    {this.state.showComments === true &&
                                        <Comments
                                            toggleComments={this.toggleComments}
                                            injuryId={this.props.injuryInfo._id}
                                            user={this.props.user}
                                            treatment={this.props.treatment}
                                            toggleAddCommentForm={this.toggleAddCommentForm}
                                            addCommentForm={this.state.addCommentForm}
                                            cancelAddComment={this.cancelAddComment}
                                        />
                                    }
                                </div>
                                {/* *** end comments *** */}

                            </div>  // columns class end

                        }
                        {/* *** end treatment if statement *** */}
                    </div>
                </div>
            </div >
        );
    }
}

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