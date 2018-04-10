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

        const practiceData = {
            description: "pain in elbow",
            title: "Tennis elbow",
            treatments: [{
                _id: "5a8a185f3dbc572f6c349c81", name: "stretch", description: "stretch", upvotes: 0,
                comments: [
                    { text: 'worked for me.  But then again, everything works for me.  That\s just how things go for me.', upvotes: 1, _id: 1},
                    { text: 'do these every day', upvotes: 0, _id: 2 },
                    { text: 'warm up first', upvotes: 99, _id: 3 }
                ]
            },
            { _id: "5a8f704f05f1287b39e0994f", name: "ice", description: "", upvotes: 0 },
            { _id: "5a8f71063f68287b56b9f45e", name: "rest", description: "", upvotes: 0 },
            { _id: "5a8f7144ddc8b57b6720830c", name: "heat", description: "heat", upvotes: 0 }]
        }

        //**************** this.props.injuryInfo.treatments
        let treatments = Object.assign([], this.props.injuryInfo.treatments); //this.props.injuryInfo.treatments
        const firstTreatment = Object.assign({}, treatments[0]);
        const comments = Object.assign({}, firstTreatment.comments);
        console.log('comments');
        console.log(comments);
        treatments = treatments.map((treatmentCopy, i) => {
            const treatment = Object.assign({}, treatmentCopy);

            return (
                <div className="treatment-container" key={i.toString()}>

                    {/* TREATMENTS  */}

                    <Treatment
                        showForm={this.showForm}
                        toggleDescription={this.toggleDescription}
                        treatment={treatment}
                        injuryId={this.props.injuryInfo._id}
                        comments={treatment.comments}
                        // *********************** treatmentCopy.comments
                        addReply={this.addReply}
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

                                <div className="card-bdy">
                                    <div className="card-title-line">
                                        <Link to='/injury-list'><button className="btn btn-sm arrow-left" aria-label="back"><i className="icon icon-arrow-left"></i></button></Link>
                                    </div>
                                    <div className="card-title-line">
                                        <h4 className="card-title ">&nbsp; {practiceData.title}</h4>
                                        {/* this.props.injuryInfo.title */}

                                    </div>
                                </div>
                                <div className="card-description">
                                {practiceData.description}

                                    {/* *****************{this.props.injuryInfo.description} */}
                                </div>
                                <div className="col-2- col-mr-auto">
                            <Link to='/add-treatment'
                                className="btn list-title">Add Treatment</Link>
                        </div>
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




// Problem accessing data from props:
        //trying to access comments with an index like an array comments[0] logs undefined, so this
        //is the only solution I could find.  I had tried JSON.parse and slice().

                // const treatmentsJSX = treatments.map((treatment, i) => {
        //     const comments = Object.assign([], treatment.comments);
        // });