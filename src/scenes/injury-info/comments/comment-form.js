import React, { Component } from 'react'

// Style
import '../styles.css';
import '../../../index.css';

export default class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillMount() {
        if (this.props.mode === 'edit') {
            this.setState({
                text: this.props.comment.text
            });
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    // comment={commentObj.text}
    // comment_id={commentObj._id}
    handleSubmit(event) {
        event.preventDefault()
        console.log('comment-form component, state: ');
        console.log(this.state);
        if (this.props.mode === 'add') {
            this.props.addComment(this.state.text);
        } else if (this.props.mode === 'edit') {
            const commentData = Object.assign({}, this.props.comment);
            commentData.text = this.state.text;
            this.props.editComment(commentData);
            
        }
        //need to figure out how to get access to injury and treatment ids  
    }

    cancel() {
        this.props.cancelComment();
    }

    render() {
        return (


            <div className="">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group col-12">

                        <textarea className="form-input"
                            type="text"
                            id=""
                            name="text"
                            placeholder="Comment"
                            value={this.state.text}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group col-12">

                        <input className="btn "
                            type="button"
                            value="Cancel"
                            onClick={this.cancel}
                        />
                        &nbsp;

                        <input
                            className="btn btn-primary "
                            type="submit"
                            value="Submit"
                            onClick={this.handleSubmit}
                        />
                    </div>
                </form>
            </div>

        );
    }
}

