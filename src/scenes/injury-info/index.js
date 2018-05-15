// React / redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

//actions
import getInjuryInfo from '../../actions/getInjuryInfo';
import addReply from '../../actions/add-reply';
import editReply from '../../actions/edit-reply';
import editTreatment from '../../actions/edit-treatment';
import treatmentUpvote from '../../actions/treatment-upvote';
import commentUpvote from '../../actions/comment-upvote';
import deleteComment from '../../actions/delete-comment';

//components
import Treatment from './treatment';



//need to modify injuryInfo to include _id and title or import injuryList props in mapstatetoprops

class InjuryInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: '',
            showComments: false,
            showDescription: false
        }

        this.toggleDescription = this.toggleDescription.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.addReply = this.addReply.bind(this);
        this.editReply = this.editReply.bind(this);
        this.editTreatment = this.editTreatment.bind(this);
        this.treatmentUpvote = this.treatmentUpvote.bind(this);
        this.commentUpvote = this.commentUpvote.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }
    componentWillMount() {

    }

    editTreatment(newTreatment) {
        this.props.editTreatment(newTreatment);
    }

    toggleComments() {
        this.setState({ showComments: !this.state.showComments });
    }

    toggleDescription(id) {
        this.setState({ showDescription: id });
    }

    showForm(id) {
        this.setState({
            showForm: id
        })
    }

    addReply(treatmentId, comment) {

        // const commentsSchema = {
        //     injury_id: Schema.Types.ObjectId,
        //     treatment_id: Schema.Types.ObjectId,
        //     parent_id: Schema.Types.ObjectId,
        //     posted: { type: Date, default: Date.now },
        //     upvotes: Number,
        //     author: {
        //               id: Schema.Types.ObjectId,
        //               username: String
        //              },
        //     text: String
        // }


        const replyObject = {
            injury_id: this.props.injuryInfo._id,
            treatment_id: treatmentId,
            parent_id: null, //move values to state?
            //upvotes will be [] by default
            author: null,
            text: comment
        }
        this.props.addReply(replyObject);
    }

    editReply(commentObject) {
        this.props.editReply(commentObject);
    }

    treatmentUpvote(treatmentUpvoteData) {
        this.props.treatmentUpvote(treatmentUpvoteData);
    }

    commentUpvote(commentData) {
        this.props.commentUpvote(commentData);
    }

    deleteComment(commentId) {
        this.props.deleteComment(commentId, this.props.injuryInfo._id);
    }

    render() {
        console.log('injury info props.injuryInfo: ');
        console.log(this.props.injuryInfo);
        //injuryInfo data:
        // [ anonymous {
        //     id: 1,
        //     title: 'High Hamstring Tendonopathy',
        //     description: 'Pain in the butt.',
        //     treatments: 
        //      { name: 'squats',
        //        comments: [Object],
        //        description: 'Do two sets of 20',
        //        upvotes: '0' } } ]

        //recursive walk thorugh json object:
        //need this if replies to replies are allowed
        // https://stackoverflow.com/questions/19323699/iterating-through-json-object-javascript

        // const practiceData = {
        //     description: "pain in elbow",
        //     title: "Tennis elbow",
        //     treatments: [{
        //         _id: "5a8a185f3dbc572f6c349c81", name: "stretch", description: "stretch", upvotes: 0,
        //         comments: [
        //             { text: 'worked for me.  But then again, everything works for me.  That\s just how things go for me.', upvotes: 1, _id: 1},
        //             { text: 'do these every day', upvotes: 0, _id: 2 },
        //             { text: 'warm up first', upvotes: 99, _id: 3 }
        //         ]
        //     },
        //     { _id: "5a8f704f05f1287b39e0994f", name: "ice", description: "", upvotes: 0 },
        //     { _id: "5a8f71063f68287b56b9f45e", name: "rest", description: "", upvotes: 0 },
        //     { _id: "5a8f7144ddc8b57b6720830c", name: "heat", description: "heat", upvotes: 0 }]
        // }

        //**************** this.props.injuryInfo.treatments
        let treatments = Object.assign([], this.props.injuryInfo.treatments); //this.props.injuryInfo.treatments
        treatments = treatments.map((treatmentCopy, i) => {
            const treatment = Object.assign({}, treatmentCopy);

            return (
                <div className="treatment-container" key={i.toString()}>

                    {/* TREATMENTS  */}

                    <Treatment
                        showForm={this.state.showForm}
                        toggleDescription={this.toggleDescription}
                        treatment={treatment}
                        treatmentId={treatment._id}
                        injuryId={this.props.injuryInfo._id}
                        comments={treatment.comments}
                        // *********************** treatmentCopy.comments
                        addReply={this.addReply}
                        editReply={this.editReply}
                        editTreatment={this.editTreatment}
                        treatmentUpvote={this.treatmentUpvote}
                        commentUpvote={this.commentUpvote}
                        user={this.props.user}
                        deleteComment={this.deleteComment}
                    />

                </div>
            );
        });

        return (
            <div>
                <div className="container">
                    <div className="columns">
                        <div className="col-6 col-mx-auto">
                            <div className="card">
                                <div className="flex-start">
                                    <div className="">
                                        <Link to='/injury-list'>
                                            <button className="btn btn-sm arrow-left" aria-label="back">
                                                <i className="icon icon-arrow-left"></i>
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="">
                                        <span className="card-title font-size-3">
                                            &nbsp;
                                            {this.props.injuryInfo.title}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 font-size-2">
                                    {this.props.injuryInfo.description}
                                </div>
                                {/* <div className="col-2 col-mr-auto">

                                </div> */}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="columns">
                    <div className="col-4"></div>
                    <div className="col-6 col-mr-auto column">
                        <div className="treatment-title flex-space-between">
                            <div className="font-size-3">Treatments: </div>
                            <div><Link to='/add-treatment'
                                className="btn">Add Treatment</Link>
                            </div>
                        </div>
                    </div>

                </div>
                {/* TREATMENTS LIST */}
                {treatments}
            </div>
        );
    }
}

// InjuryList.propTypes = {
//     injuryList: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, title: PropTypes.string, description: PropTypes.string }))

// }

function mapStateToProps(state) {
    return {
        injuryInfo: state.injuryInfo,
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getInjuryInfo: getInjuryInfo,
        addReply: addReply,
        editReply: editReply,
        editTreatment: editTreatment,
        treatmentUpvote: treatmentUpvote,
        commentUpvote: commentUpvote,
        deleteComment: deleteComment,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InjuryInfo);

// NESTED ROUTE EXAMPLE
// const App = () => (
//     <BrowserRouter>
//       {/* here's a div */}
//       <div>
//         {/* here's a Route */}
//         <Route path="/tacos" component={Tacos}/>
//       </div>
//     </BrowserRouter>
//   )

//   // when the url matches `/tacos` this component renders
//   const Tacos  = ({ match }) => (
//     // here's a nested div
//     <div>
//       {/* here's a nested Route,
//           match.url helps us make a relative path */}
//       <Route
//         path={match.url + '/carnitas'}
//         component={Carnitas}
//       />
//     </div>
//   )




// Problem accessing data from props:
        //trying to access comments with an index like an array comments[0] logs undefined, so this
        //is the only solution I could find.  I had tried JSON.parse and slice().

                // const treatmentsJSX = treatments.map((treatment, i) => {
        //     const comments = Object.assign([], treatment.comments);
        // });


//Card
//x  get rid of description button
// Title: fjdkls;a
// Description:
// Upvotes on left margin -- thumbs up with vote number underneath
// toggle comments by clicking a '...' below first comment?
// Decide which fonts will be black / gray / bold