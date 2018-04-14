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
        this.cancelReply = this.cancelReply.bind(this);
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

            <div className="columns" key={j.toString()}>

                <div className="col-1"></div>
                <div className="col-10 col-mr-auto">
                    <div className="card columns">
                    
                        <div className="col-12 card-line">

                            {
                                this.state.showForm === commentObj._id ?
                                    <div>
                                        <Reply
                                            addReply={this.addReply}
                                            cancelReply={this.cancelReply}
                                            comment={commentObj.text}
                                            mode={'edit'} />
                                    </div>
                                    :
                                    <div>
                                        <div className="col-12 card-line">
                                            <span><strong>Comment: </strong><span className="comment"> {commentObj.text} &nbsp;
                                        </span></span>
                                        </div>

                                        <div className=" col-12 card-line list-links">
                                            <button className="btn btn-sm" aria-label="up vote"><i className="icon icon-upward"></i></button>
                                            &nbsp;
                                        <span className="list-links">Upvotes: {commentObj.upvotes} &nbsp;
                                        </span>

                                            <span className="list-links toggle"
                                                onClick={() => this.showForm(commentObj._id)}
                                            >Edit &nbsp;</span>
                                            <span className="list-links toggle">Delete &nbsp;
                                        </span>
                                        </div>
                                    </div>
                            }





                        </div>
                    </div>
                </div>
                {/* <div className=" col-6"></div> */}
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