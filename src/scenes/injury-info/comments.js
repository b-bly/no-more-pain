import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//components
import Reply from './add-reply';
import Button from './button';
import Comment from './comment';
//actions
import commentUpvote from '../../actions/comment-upvote';
import deleteComment from '../../actions/delete-comment';
import addReply from '../../actions/add-reply';
import editReply from '../../actions/edit-reply';

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

    addReply(comment) {
        this.props.addReply(this.props.treatment._id, comment); //calling addReply in index.js, not action
        this.props.toggleShowAddCommentForm();
    }

    editReply(commentData) {
        this.props.editReply(
            commentData);
        this.setState({
            showForm: '',
        })
    }

    cancelReply() {
        this.setState({
            showForm: '',
        })
    }

    commentUpvote(commentData) {

        this.props.commentUpvote(commentData);
    }

    deleteComment(commentData) {

        this.props.deleteComment(commentData);

    }

    cancelAddComment() {
        this.props.cancelAddComment();
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
            <div key={j.toString()}>
                <div className="card">
                    {/* Reply in treatment.js needs same layout */}
                    {
                        this.state.showForm === commentObj._id ?

                            <Reply
                                comment={commentObj}
                                cancelReply={this.cancelReply}
                                editReply={this.editReply}
                                mode={'edit'} />

                            :
                            <Comment
                                comment={commentObj}
                                treatment={this.props.treatment}
                                user={this.props.user}
                                // actions
                                commentUpvote={this.commentUpvote}
                                showForm={this.showForm}
                                deleteComment={this.deleteComment}
                                
                            />
                    }
                </div>
            </div>

        )


        return (
            <div className="columns">
                <div className="col-1"></div>
                <div className="col-11">

                    {/* *** add comment form *** */}
                    {this.props.addCommentForm !== '' &&

                        <div className="card">
                            <Reply
                                addReply={this.addReply}
                                cancelReply={this.props.toggleAddCommentForm}
                                mode={'add'}
                            />
                        </div>

                    }

                    {comments}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addReply: addReply,
        editReply: editReply,
        commentUpvote: commentUpvote,
        deleteComment: deleteComment,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);