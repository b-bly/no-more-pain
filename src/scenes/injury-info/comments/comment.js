import React, { Component } from 'react';
//components
import Button from '../button'

export default class Comment extends Component {
    constructor(props) {
        super(props);
    }

    commentUpvote() {
        this.props.commentUpvote(this.props.comment);
    }
    
    showForm() {
        this.props.showForm(this.props.comment._id);
    }
    deleteComment() {
        const commentData = {
            treatmentId : this.props.treatment._id,
            commentId : this.props.comment._id,
        }
        const permission = window.confirm("Are you sure you want to delete your comment?");
        if (permission) this.props.deleteComment(commentData);
    }

    render() {
        let disableUpvote = this.props.user.loggedIn === false ? true : this.props.comment.author.id === this.props.user.id;
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
                <div className="flex-row">
                    <div className="flex-column align-items-center upvote">
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

                    <div className="flex-column">
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
                                <span className="font-small" >Author: <strong>{this.props.comment.author.username} </strong>&nbsp; </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-12 card-line font-size-1 wrap flex-start">
                    {/* ****************** */}
                    {/* Should move edit button to separate component */}
                    
                    <Button
                        handleClick={this.showForm.bind(this)}
                        icon="fa fa-edit"
                        aria="edit"
                    />


                    <Button
                        handleClick={this.deleteComment.bind(this)}
                        
                        icon="fa fa-trash"
                        aria="delete"
                    />
                </div>
            </div>

        );
    }
}