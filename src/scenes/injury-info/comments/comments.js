import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//components
import CommentForm from './comment-form';
import Button from '../button';
import Comment from './comment';
//actions
import commentUpvote from '../../../actions/comment-upvote';
import deleteComment from '../../../actions/delete-comment';
import addComment from '../../../actions/add-comment';
import editComment from '../../../actions/edit-comment';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: '',
        }
        this.showForm = this.showForm.bind(this);
        this.cancelComment = this.cancelComment.bind(this);
        this.editComment = this.editComment.bind(this);
        this.commentUpvote = this.commentUpvote.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    showForm(id) {
        this.setState({
            showForm: id
        });
    }

    addComment(comment) {
        this.props.addComment(this.props.treatment._id, comment); //calling addComment in index.js, not action
        this.props.toggleShowAddCommentForm();
    }

    editComment(commentData) {
        this.props.editComment(
            commentData);
        this.setState({
            showForm: '',
        })
    }

    cancelComment() {
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
        // editComment={this.editComment}
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
                    {
                        this.state.showForm === commentObj._id ?

                            <CommentForm
                                comment={commentObj}
                                cancelComment={this.cancelComment}
                                editComment={this.editComment}
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
                            <CommentForm
                                addComment={this.addComment}
                                cancelComment={this.props.toggleAddCommentForm}
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
        addComment: addComment,
        editComment: editComment,
        commentUpvote: commentUpvote,
        deleteComment: deleteComment,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);