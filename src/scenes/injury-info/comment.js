import React, { Component } from 'react';
//components
import Button from './button'

export default class Comment extends Component {
    constructor(props) {
        super(props);
    }

    commentUpvote(id) {
        this.props.commentUpvote(id);
    }
    showForm(id) {
        this.props.showForm(id);
    }
    deleteComment(id) {
        this.props.deleteComment(id);
    }

    render() {
        return (
            //text={this.props.text}
            //author={this.props.author}  //.username, .id
            //id={this.props.id}
            //upvotes={this.props.upvotes}

            <div className="columns">
                <div className="col-12 card-line font-size-2">
                    <span className="comment"><strong> </strong><span >
                        {this.props.text}
                        &nbsp;
                    </span></span>
                </div>

                {this.props.author && (
                    <div className="col-12 card-line font-size-1">
                        <span className="font-small" >Author: <strong>{this.props.author.username} </strong>&nbsp; </span>
                    </div>
                )}

                <div className="col-12 card-line font-size-1 wrap flex-start">
                    <Button 
                        handleClick={this.commentUpvote.bind(this)}
                        data={this.props.id} //comment id
                        icon="fa fa-thumbs-up"
                        aria="upvote"
                    />

                    &nbsp;
                <div className="no-pointer">
                        upvotes: {this.props.upvotes.length} &nbsp;
                </div>
                    {/* ****************** */}
                    {/* Should move edit button to separate component */}

                    <Button
                        handleClick={this.showForm.bind(this)}
                        data={this.props.id} // comment id
                        icon="fa fa-edit"
                        aria="edit"
                    />


                    <Button
                        handleClick={this.deleteComment.bind(this)}
                        data={this.props.id}
                        icon="fa fa-trash"
                        aria="delete"
                    />

                    {/* <div className="btn btn-sm list-links toggle"
                    onClick={() => this.deleteComment(this.props.id)}
                >Delete &nbsp;
                 </div> */}
                </div>
            </div>
        );
    }
}