import React, { Component } from 'react';
//components
import Button from '../button'

export default class Comment extends Component {

    commentUpvote() {
        this.props.commentUpvote(this.props.comment);
    }

    showForm() {
        this.props.showForm(this.props.comment._id);
    }
    deleteComment() {
        const commentData = {
            treatmentId: this.props.treatment._id,
            commentId: this.props.comment._id,
        };
        const permission = window.confirm("Are you sure you want to delete your comment?");
        if (permission) this.props.deleteComment(commentData);
    }

    render() {
        let disableUpvote = true;
        if (this.props.comment.author &&
            this.props.user.loggedIn === true) { //need to check if there is an author and a user or it will throw
            //an undefined error.
            disableUpvote = false;
        }
        console.log('comment.js rendered, props: ');
        
        console.log(this.props);
        
        // props
        // text={commentObj.text}
        // author={commentObj.author}
        // id={commentObj._id}
        // upvotes={commentObj.upvotes}
        return (
            //CSS changes
            // add column to comment columns, 
            // reduce card padding
            // increase padding on comment columns

            <div className="">
                <div className="">
                    <div className="upvotes-container">
                        <div className="flex-column align-items-center">
                            <Button
                                handleClick={this.commentUpvote.bind(this)}
                                icon="fa fa-thumbs-up"
                                aria="upvote"
                                disable={disableUpvote}
                            />

                            <div className=" font-size-2 upvote">
                                {this.props.comment.upvotes.length}
                            </div>

                        </div>
                    </div>


                    <div className="font-size-2">
                        <span className="comment"><strong> </strong>
                            <span>
                                {this.props.comment.text}
                                &nbsp;
                                </span>
                        </span>
                    </div>

                    {this.props.comment.author && (
                        <div className="font-size-1">
                            <span >Author: <strong>{this.props.comment.author.username} </strong>&nbsp; </span>
                        </div>
                    )}

                </div>

                <div className="col-12 font-size-1 wrap flex-end">
                    {/* ****************** */}
                    {/* Should move edit button to separate component */}

                    <Button
                        handleClick={this.showForm.bind(this)}
                        icon="fa fa-edit"
                        aria="edit"
                        className="right-row-buttons"
                    />


                    <Button
                        handleClick={this.deleteComment.bind(this)}
                        icon="fa fa-trash"
                        aria="delete"
                        className="right-row-buttons"
                    />
                </div>
            </div>

        );
    }
}