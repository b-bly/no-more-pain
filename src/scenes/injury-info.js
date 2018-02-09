import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import getInjuryInfo from '../actions/getInjuryInfo';
import { Link } from 'react-router-dom';

class InjuryInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComments: false,
            showDescription: false
        }
        this.toggleDescription = this.toggleDescription.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
    }
    componentWillMount() {
        this.props.getInjuryInfo('High Hamstring Tendonopathy');
    }
    toggleComments() {
        this.setState({ showComments: !this.state.showComments });
    }
    toggleDescription() {
        this.setState({ showDescription: !this.state.showDescription });
    }
    render() {
        console.log('injury info props: ');
        console.log(this.props);
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


        let treatments = Object.assign([], this.props.injuryInfo.treatments);
        const firstTreatment = Object.assign({}, treatments[0]);
        const comments = Object.assign({}, firstTreatment.comments);
        console.log('treatments');
        console.log(comments);
        treatments = treatments.map((treatmentCopy, i) => {
            const treatment = Object.assign({}, treatmentCopy);

            const comments = treatment.comments.map((commentObj, j) =>
                <div className="columns" key={j.toString()}>
                    <div className="column col-5"></div>
                    <div className="column col-6 col-mr-auto">
                        <div className="">
                            <div className="card-bdy">
                                <div className="card-title-line">
                                    <p className="upvotes">{commentObj.comment}
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
                <div className="treatment-container" key={i.toString()}>
                    <div className="columns" >
                        <div className="column col-4"></div>
                        <div className="column col-6 col-mr-auto">
                            <div className="">
                                <div className="card-bdy">
                                    <div className="card-title-line">
                                        <p className="treatment-name" >{treatment.name} &nbsp;

                                    <span className="upvotes">Upvotes: {treatment.upvotes} &nbsp;</span></p>
                                    </div>
                                    <div className="card-title-line">
                                        <button className="btn btn-sm" aria-label="up vote"><i className="icon icon-upward"></i></button>
                                    </div>
                                </div>
                                <div className="card-line toggle" >
                                    <p className="upvotes"

                                        onClick={this.toggleDescription}>
                                        Description
                                    {this.state.showDescription ?
                                            <span>: {treatment.description}</span>
                                            : null}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

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
        getInjuryInfo: getInjuryInfo
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InjuryInfo);