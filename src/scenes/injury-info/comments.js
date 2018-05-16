import React, { Component } from 'react';
//components
import Reply from './add-reply';
import Button from './button';
import Comment from './comment';

export default class Comments extends Component {
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
            author: this.props.user,
            treatment_id: this.props.treatment._id,
        };
        this.props.commentUpvote(commentData);
    }

    deleteComment(commentData) {
        const permission = window.confirm("Are you sure you want to delete your comment?");
        if (permission) {
            this.props.deleteComment(commentData);
        }
    }

    render() {
        //comments props from treatment.js
        // comments={this.props.comments}
        // toggleComments={this.toggleComments}
        // injuryId={this.props.injuryId}
        // editReply={this.editReply}
        // commentUpvote={this.commentUpvote}
        // deleteComment={this.deleteComment}
        // user={this.props.user}
        const commentsCopy = Object.assign([], this.props.comments);
        // Injury schema
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
                <div className="card">
                    {/* Reply in treatment.js needs same layout */}
                    {
                        this.state.showForm === commentObj._id ?
                            
                                <Reply
                                    addReply={this.addReply}
                                    cancelReply={this.cancelReply}
                                    comment={commentObj.text}
                                    comment_id={commentObj._id}
                                    editReply={this.editReply}
                                    mode={'edit'} />
                            
                            :
                            <Comment
                                text={commentObj.text}
                                author={commentObj.author}
                                id={commentObj._id}
                                upvotes={commentObj.upvotes}
                                treatment={this.props.treatment}
                                commentUpvote={this.commentUpvote}
                                showForm={this.showForm}
                                deleteComment={this.deleteComment}
                                user={this.props.user}
                            />
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
