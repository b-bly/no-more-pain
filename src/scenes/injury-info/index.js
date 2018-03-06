import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

//actions
import getInjuryInfo from '../../actions/getInjuryInfo';
import addReply from '../../actions/add-reply';
//components
import Treatment from './treatment';
//react router dom
import { Link } from 'react-router-dom';

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
    }
    componentWillMount() {
        // if (this.props.injuryInfo.title.length < 1) {
        //     this.props.getInjuryInfo();
        // }
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
        console.log('injury-info index, addReply, treatmentId, comment, injuryId: ');
        console.log(treatmentId);
        console.log(comment);
        console.log(this.props.injuryInfo._id);
        
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
            upvotes: 0,
            author: null,
            text: comment
        }
        this.props.addReply(replyObject);
    }

    render() {
        console.log('injury info props.injuryInfo._id: ');
        console.log(this.props.injuryInfo._id);
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

        let treatments = Object.assign([], this.props.injuryInfo.treatments);
        const firstTreatment = Object.assign({}, treatments[0]);
        const comments = Object.assign({}, firstTreatment.comments);
        console.log('comments');
        console.log(comments);
        treatments = treatments.map((treatmentCopy, i) => {
            const treatment = Object.assign({}, treatmentCopy);

            //     const comments = treatment.comments.map((commentObj, j) =>
            //         <div className="columns" key={j.toString()}>
            //             <div className="column col-5"></div>
            //             <div className="column col-6 col-mr-auto">
            //                 <div className="">
            //                     <div className="card-bdy">
            //                         <div className="card-title-line">
            //                             <p className="upvotes">{commentObj.comment}
            //                                 &nbsp;

            // <span className="upvotes">Upvotes: {commentObj.upvotes} &nbsp;</span></p>
            //                         </div>
            //                         <div className="card-title-line">
            //                             <button className="btn btn-sm" aria-label="up vote"><i className="icon icon-upward"></i></button>
            //                         </div>
            //                     </div>

            //                 </div>
            //             </div>
            //         </div>
            //     );
            return (
                <div className="treatment-container" key={i.toString()}>

                    {/* TREATMENTS  */}

                    <Treatment
                        showForm={this.showForm}
                        toggleDescription={this.toggleDescription}
                        treatment={treatment}
                        addReply = {this.addReply}
                    />

                    {/* COMMENTS */}

                    <div className="columns">
                        <div className="column col-5"></div>
                        <div className="column col-6 col-mr-auto treatment-title toggle"
                            onClick={this.toggleComments}
                        ><h4>Comments: </h4></div>
                    </div>
                    {this.state.showComments ?
                        <div className="upvotes">{comments}</div>
                        : null}
                </div>



            );
        });
        console.log(this.props.injuryInfo.treatments);

        // const treatmentsJSX = treatments.map((treatment, i) => {
        //     const comments = Object.assign([], treatment.comments);
        // });


        //trying to access comments with an index like an array comments[0] logs undefined, so this
        //is the only solution I could find.  I had tried JSON.parse and slice().

        // comments = comments.map((comment, i) =>
        //     <div className="columns" key={i.toString()}>
        //         <div className="column col-4"></div>
        //         <div className="column col-6 col-mr-auto">
        //             <div className="card">
        //                 <div className="card-header">
        //                     <div className="card-title-line">
        //                         <h4 className="card-title " >&nbsp; {comment} &nbsp;</h4>
        //                     </div>
        //                     <div className="card-title-line">
        //                         <button className="btn btn-sm" aria-label="up vote"><i className="icon icon-upward"></i></button>
        //                     </div>
        //                 </div>

        //             </div>
        //         </div>
        //     </div>
        // );

        // const name = this.props.injuryInfo.name;
        // const upvotes = this.props.injuryInfo.upvotes;

        return (
            <div>
                
                <div className="container">
                    {/* TITLE */}
                    <div className="center container">
                        <div className="col-3 col-ml-auto list-title"><h3>{this.props.injuryInfo.title} Treatments</h3></div>
                        <div className="col-2- col-mr-auto">
                            <Link to='/add-treatment'
                                className="btn list-title">Add Treatment</Link>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="columns">
                        <div className="column col-6 col-mx-auto">
                            <div className="card">

                                <div className="card-header">
                                    <div className="card-title-line">
                                        <Link to='/'><button className="btn btn-sm arrow-left" aria-label="back"><i className="icon icon-arrow-left"></i></button></Link>
                                    </div>
                                    <div className="card-title-line">
                                        <h4 className="card-title ">&nbsp; {this.props.injuryInfo.title}</h4>
                                    </div>
                                </div>
                                <small className="">
                                    {this.props.injuryInfo.description}
                                </small>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="columns">
                    <div className="column col-4"></div>
                    <div className="column col-6 col-mr-auto treatment-title"><h4>Treatments: </h4></div>
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
    console.log('InjuryInfo mapStateToProps called, state: ');
    console.log(state);
    return {
        injuryInfo: state.injuryInfo
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getInjuryInfo: getInjuryInfo,
        addReply: addReply
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