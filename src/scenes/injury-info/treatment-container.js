// React / redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

//actions
import editTreatment from '../../actions/edit-treatment';
import deleteTreatment from '../../actions/delete-treatment';
import treatmentUpvote from '../../actions/treatment-upvote';
//components
import Treatment from './treatment';

class TreatmentsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: '',
            showDescription: false
        }

        this.toggleDescription = this.toggleDescription.bind(this);
        this.editTreatment = this.editTreatment.bind(this);
        this.treatmentUpvote = this.treatmentUpvote.bind(this);

    }

    toggleDescription(id) {
        this.setState({ showDescription: id });
    }

    showForm(id) {
        this.setState({
            showForm: id
        })
    }

    editTreatment(newTreatment) {
        this.props.editTreatment(newTreatment);
    }

    treatmentUpvote(treatmentUpvoteData) {
        this.props.treatmentUpvote(treatmentUpvoteData);
    }

    deleteTreatment(treatmentData) {
        this.props.deleteTreatment(treatmentData);
    }

    render() {
        console.log('injury info props.injuryInfo: ');
        console.log(this.props.injuryInfo);

        //**************** this.props.injuryInfo.treatments
        let treatments = Object.assign([], this.props.injuryInfo.treatments); //this.props.injuryInfo.treatments
        treatments = treatments.map((treatmentCopy, i) => {
            const treatment = Object.assign({}, treatmentCopy);

            return (
                <div className="treatment-container" key={i.toString()}>

                    {/* TREATMENTS  */}
                    <Treatment
                        {...this.props}
                        treatment={treatment}
                        addReply={this.addReply}//*
                        editTreatment={this.editTreatment}
                        treatmentUpvote={this.treatmentUpvote}
                        deleteTreatment={this.deleteTreatment}
                    />
                </div>
            );
        });

        return (
            <div>

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
        editTreatment: editTreatment,
        deleteTreatment: deleteTreatment,
        treatmentUpvote: treatmentUpvote,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TreatmentsContainer);