import React, { Component } from 'react';
import Reply from './add-reply';

export default class Treatment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treatmentId: '', //selected treatment
            commentId: '',
            commentParentId: '', //will need eventually for nested comments
        }
        this.showForm = this.showForm.bind(this);
        this.cancelReply = this.cancelReply.bind(this);
    }

    handleClick() {
        //this.props.handleClick(this.props.injury._id);
    }

    delete() {
        //this.props.delete(this.props.injury._id);
    }

    showForm() {
        this.setState({
            treatmentId: this.props.treatment._id
        });
        
    }

    cancelReply() {
        this.setState({
            treatmentId: ''
        })
    }

    toggleDescription() {
        this.props.toggleDescription(this.props.treatment._id);
    }

    render() {
        return (
            <div className="columns" >
                <div className="column col-4"></div>
                <div className="column col-6 col-mr-auto">
                    <div className="">
                        <div className="card-bdy">
                            <div className="card-title-line">
                                <p className="treatment-name" >{this.props.treatment.name} &nbsp;

                        <span className="upvotes">Upvotes: {this.props.treatment.upvotes} &nbsp;</span></p>
                            </div>
                            <div className="card-title-line">
                                <button className="btn btn-sm" aria-label="up vote"><i className="icon icon-upward"></i></button>
                            </div>
                        </div>
                        <div className="card-line toggle" >
                            <p className="upvotes"

                                onClick={this.toggleDescription.bind(this)}>
                                Description
                        {this.props.showDescription === this.props.treatment._id ?
                                    <span>: {this.props.treatment.description}</span>
                                    : null}
                                <span
                                onClick={this.showForm}
                                > Reply</span></p>

                        </div>
                        {/* ************************************************************ */}
                        {this.state.treatmentId !== '' && 
                        <div>
                            <Reply 
                            cancelReply={this.cancelReply}/>
                        </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}