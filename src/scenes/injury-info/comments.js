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

            <div className="" key={j.toString()}>
                <div className="container">
                    <div className="columns">
                        <div className="col-1"></div>
                        <div className="col-mr-auto col-10">
                            <div className="card">
                                <div className="columns card-bdy">
                                    <div className="col-12 card-line">
                                        {
                                            this.state.showForm === commentObj._id ?
                                                <div>
                                                    <Reply
                                                        addReply={this.addReply}
                                                        cancelReply={this.cancelReply}
                                                        mode={'add'} />
                                                </div>
                                                :
                                                <span><strong>Comment: </strong><span className="comment"> {commentObj.text} &nbsp;
                                        </span></span>

                                        }

                                    </div>



                                    <div className=" col-12 card-line toggle upvotes">
                                        <button className="btn btn-sm" aria-label="up vote"><i className="icon icon-upward"></i></button>
                                        &nbsp;
                                        <span className="upvotes">Upvotes: {commentObj.upvotes} &nbsp;
                                        </span>

                                        <span className="list-links"
                                            onClick={() => this.showForm(commentObj._id)}
                                        >Edit &nbsp;</span>
                                        <span className="list-links">Delete &nbsp;
                                </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className=" col-6"></div> */}
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