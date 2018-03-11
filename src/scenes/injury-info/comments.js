import React, { Component } from 'react';

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        console.log('comments props');
        console.log(this.props);
        const commentsCopy = Object.assign([], this.props.comments);
        console.log('comments[0]');
        console.log(commentsCopy[0].text);

        const comments = commentsCopy.map((commentObj, j) =>
            <div className="columns" key={j.toString()}>
                <div className="column col-5"></div>
                <div className="column col-6 col-mr-auto">
                    <div className="">
                        <div className="card-bdy">
                            <div className="card-title-line">
                                <p className="upvotes">{commentObj.text}
                                    &nbsp;

            <span className="upvotes">Upvotes: {commentObj.upvotes} &nbsp;</span></p>
                            </div>
                            <div className="card-title-line">
                                <button className="btn btn-sm" aria-label="up vote"><i className="icon icon-upward"></i></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );

        return (
            <div>
                {comments}
            </div>
        );
    }
}