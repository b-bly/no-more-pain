import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//components
import CommentForm from './comment-form';
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
        this.addComment = this.addComment.bind(this);
    }

    showForm(id) {
        this.setState({
            showForm: id
        });
    }

    addComment(comment) {
        const commentData = {
            text: comment,
            treatment_id: this.props.treatment._id,
            upvotes: [],
            author: this.props.user,
            injury_id: this.props.injuryId,
        }
        this.props.addComment(commentData); //calling addComment in index.js, not action
        this.props.toggleAddCommentForm();
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
        const commentsCopy = Object.assign([], this.props.treatment.comments);
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
                <div className="column col-1"></div>
                <div className="column col-11">
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

        //comments props from treatment.js
        // toggleComments={this.toggleComments}
        // injuryId={this.props.injuryId}
        // editComment={this.editComment}
        // commentUpvote={this.commentUpvote}
        // deleteComment={this.deleteComment}
        // user={this.props.user}