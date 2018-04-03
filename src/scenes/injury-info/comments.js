import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//components
import Reply from './add-reply';
//actions
import editComment from '../../actions/edit-comment';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: '',
        }
        this.showForm = this.showForm.bind(this);
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
            injuryId: this.props.injuryId
        });
    }

    cancelReply() {
        this.setState({
            showForm: '',
        })
    }

    render() {
        console.log('comments props');
        console.log(this.props);
        const commentsCopy = Object.assign([], this.props.comments);
        console.log('comments[0]');
        console.log(commentsCopy[0].text);

        const comments = commentsCopy.map((commentObj, j) =>

            <div className="columns" key={j.toString()}>
                <div className="column col-6 col-mr-auto">

                    {/* {this.state.showForm === commentObj._id ?

            <Reply
                                editReply={this.editReply}
                                cancelReply={this.cancelReply}
                                mode={'edit'}
                                comment={commentObj}
            />
                            : */}
                    <div className="card-bdy">
                        <div className="">
                            <p>
                                {
                                    this.state.showForm !== '' ?
                                    <div className="upvotes">{commentObj.text}
                                        &nbsp;
                                    </div>

                                    :

                                    <div>
                                        <Reply
                                            addReply={this.addReply}
                                            cancelReply={this.cancelReply}
                                            mode={'add'} />
                                    </div>
                                }

                                <span className="upvotes">Upvotes: {commentObj.upvotes} &nbsp;
                        </span>
                            </p>
                        </div>

                        <p>
                            <span className="list-links"
                                onClick={() => this.showForm(commentObj._id)}
                            >Edit &nbsp;</span>
                            <span className="list-links">Delete &nbsp;
                            </span>
                        </p>
                    </div>
                    <div className="card-title-line">
                        <button className="btn btn-sm" aria-label="up vote"><i className="icon icon-upward"></i></button>
                    </div>
                </div>
            </div>
        )


        return (
            <div>
                {comments}
            </div >
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
        editComment: editComment
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);