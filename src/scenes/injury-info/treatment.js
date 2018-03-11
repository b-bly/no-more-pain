import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// components
import Reply from './add-reply';
import Comments from './comments';

//actions
import deleteTreatment from '../../actions/delete-treatment'

class Treatment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treatmentId: '', //selected treatment
            commentId: '',
            commentParentId: '', //will need eventually for nested comments
            showComments: false
        }
        this.showForm = this.showForm.bind(this);
        this.cancelReply = this.cancelReply.bind(this);
        this.addReply = this.addReply.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.deleteTreatment = this.deleteTreatment.bind(this);
    }

    handleClick() {
        //this.props.handleClick(this.props.injury._id);
    }

    deleteTreatment() {
        console.log('deleteTreatment');
        console.log(this.props.treatment._id);
        
        this.props.deleteTreatment(this.props.treatment._id, this.props.injuryId);
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

    addReply(comment) {
        this.props.addReply(this.state.treatmentId, comment);
    }

    toggleDescription() {
        this.props.toggleDescription(this.props.treatment._id);
    }

    toggleComments() {
        this.setState({
            showComments: !this.state.showComments
        });
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
                                description
                        {this.props.showDescription === this.props.treatment._id ?
                                    <span>: {this.props.treatment.description}</span>
                                    : null}
                                &nbsp;
                                &nbsp;
                                <span
                                    onClick={this.showForm}
                                > reply </span>
                                &nbsp;
                                &nbsp;
                                <span
                                    onClick={this.deleteTreatment}
                                > delete </span>
                                &nbsp;
                                &nbsp;
                                <span className="heading"
                                    onClick={this.toggleComments}>
                                    show comments </span>
                            </p>
                        </div>
                        {/* ************************************************************ */}
                        {this.state.treatmentId !== '' &&
                            <div>
                                <Reply
                                    addReply={this.addReply}
                                    cancelReply={this.cancelReply} />
                            </div>
                        }

                    </div>
                    <div>

                        {this.state.showComments === true &&
                            <Comments
                                comments={this.props.comments}
                                toggleComments={this.toggleComments}
                            />
                        }

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('Treatment mapStateToProps called, state: ');
    console.log(state);
    return {
        
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteTreatment: deleteTreatment
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Treatment);