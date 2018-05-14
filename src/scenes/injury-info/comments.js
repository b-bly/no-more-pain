import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//components
import Reply from './add-reply';
import Button from './button'

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: '',
        }
        this.showForm = this.showForm.bind(this);
        this.cancelReply = this.cancelReply.bind(this);
        this.editReply = this.editReply.bind(this);
        this.commentUpvote = this.commentUpvote.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    showForm(id) {
        this.setState({
            showForm: id
        });
    }

    editReply(comment, commentId) {
        console.log('comments.js, editReply, comment, id: ');
        console.log(comment);
        console.log(commentId);

        this.props.editReply({
            comment: comment,
            commentId: commentId,
            injuryId: this.props.injuryId,
            authorId: this.props.comments.author.id
        });
        this.setState({
            showForm: '',
        })
    }

    cancelReply() {
        this.setState({
            showForm: '',
        })
    }

    commentUpvote(commentId) {
        const commentData = {
            injuryId: this.props.injuryId,
            commentId: commentId,
        };
        this.props.commentUpvote(commentData);
    }

    deleteComment(commentId) {
        const permission = window.confirm("Are you sure you want to delete your comment?");
        if (permission) {
            this.props.deleteComment(commentId);
        }
    }

    render() {
        console.log('comments props');
        console.log(this.props);
        console.log('state');
        console.log(this.state);

        const commentsCopy = Object.assign([], this.props.comments);



        // injury_id: Schema.Types.ObjectId,
        // treatment_id: Schema.Types.ObjectId,
        // parent_id: Schema.Types.ObjectId,
        // posted: { type: Date, default: Date.now },
        // upvotes: Number,
        // author: {
        //           id: Schema.Types.ObjectId,
        //           username: String
        //          },
        // text: String

        const comments = commentsCopy.map((commentObj, j) =>

            // <div className="container">
            // <div className="columns">
            //     <div className="column col-6 col-mx-auto">
            //         <div className="card">

            //             <div className="card-header">
            //                 <div className="card-title-line">

            <div key={j.toString()}>
                <div className="card columns">
                    {/* Reply in treatment.js needs same layout */}
                    {
                        this.state.showForm === commentObj._id ?
                            <div>
                                <Reply
                                    addReply={this.addReply}
                                    cancelReply={this.cancelReply}
                                    comment={commentObj.text}
                                    comment_id={commentObj._id}
                                    editReply={this.editReply}
                                    mode={'edit'} />
                            </div>
                            :
                            <div className="columns">
                                <div className="col-12 card-line font-size-2">
                                    <span className="comment"><strong> </strong><span >
                                        {commentObj.text}
                                        &nbsp;
                                        </span></span>
                                </div>

                                {commentObj.author && (
                                    <div className="col-12 card-line font-size-1">
                                        <span className="font-small" >Author: <strong>{commentObj.author.username} </strong>&nbsp; </span>
                                    </div>
                                )}

                                <div className="col-12 card-line font-size-1 wrap flex-start">
                                    <button className="btn btn-sm list-links"
                                        aria-label="upvote"
                                        // should move to separate component to avoid () => syntax
                                        onClick={() => this.commentUpvote(commentObj._id)}><i className="icon icon-upward"></i></button>
                                    &nbsp;
                                    <div className=" no-pointer">
                                        upvotes: {commentObj.upvotes.length} &nbsp;
                                    </div>
                                    {/* ****************** */}
                                    {/* Should move edit button to separate component */}
                          
                                    <Button
                                        handleClick={this.showForm}
                                        commentId={commentObj._id}
                                        icon="fa fa-edit"
                                        aria="edit"
                                    />


                                    <Button
                                        handleClick={this.deleteComment}
                                        commentId={commentObj._id}
                                        icon="fa fa-trash"
                                        aria="delete"
                                    />

                                    {/* <div className="btn btn-sm list-links toggle"
                                        onClick={() => this.deleteComment(commentObj._id)}
                                    >Delete &nbsp;
                                     </div> */}
                                </div>
                            </div>
                    }


                </div>
            </div>

        )


        return (
            <div className="columns">
                <div className="col-1"></div>
                <div className="col-11">
                    {comments}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    console.log('Comments mapStateToProps called, state: ');
    console.log(state);
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);