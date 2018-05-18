import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import PropTypes from 'prop-types';
import getInjuryList from '../../actions/getInjuryList';
import { Link, Redirect } from 'react-router-dom';
//COMPONENTS
import InjuryListItem from './injury-list-item';
import InjuryForm from './injury-form';
//ACTIONS
//actions
import addInjury from '../../actions/add-injury'
import getInjuryInfo from '../../actions/getInjuryInfo'
import deleteInjury from '../../actions/delete-injury'
import editInjury from '../../actions/edit-injury'
import getUser from '../../actions/get-user'

//STYLES
import './styles.css';

class InjuryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: '',
            redirectTo: ''
        };
    }

    componentWillMount() {
        this.props.getUser();
        this.props.getInjuryList();
        this.props.showBackground();
        console.log('injury-list props:');
        
        console.log(this.props);
        
    }

    componentWillUnmount() {
        this.props.hideBackground();
    }

    injuryInfo(id) {
        //call getInjuryInfo to set store injuryInfo to clicked injury
        this.props.getInjuryInfo(id);
        //set state to redirect
        this.setState({
            redirectTo: 'injury-info'
        });
    }

    showForm(id) {
        this.setState({
            showForm: id
        })
    }

    cancel() {
        this.setState({
            showForm: ''
        });
    }

    delete(injuryData) {
        this.props.deleteInjury(injuryData);
    }

    editInjury(updatedInjury) {
        this.props.editInjury(updatedInjury);
        this.setState({
            showForm: ''
        });
    }

    render() {
        // console.log('injury-list props: ');      
        // console.log(this.props);
        if (this.state.redirectTo) {
     
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            const injuryList = this.props.injuryList.map((injury, i) =>
                <div key={i.toString()}>
                    {injury._id === this.state.showForm ? (
                        <InjuryForm
                            editInjury={this.editInjury.bind(this)}
                            cancel={this.cancel.bind(this)}
                            injury={injury} />
                    ) : (
                            <InjuryListItem
                                handleClick={this.injuryInfo.bind(this)}
                                delete={this.delete.bind(this)}
                                showForm={this.showForm.bind(this)}
                                injury={injury}
                                user={this.props.user} />
                        )}
                </div>
            );

            return (
                <div className="">
                    <div className="container">
                        {/* <div className="font-size-1">One</div>
                        <div className="font-size-2">One</div>
                        <div className="font-size-3">One</div>
                        <div className="font-size-4">One</div> */}
                        <div className="columns">
                            <div className="card title-opacity col-12">
                                <div className="col-4 col-mx-auto">
                                    <div className="columns">
                                        <div className="col-12 flex-space-between">
                                            <div className="font-size-3 text-black">Injury List</div>
                                            <div><Link to='/add-injury' className="btn font-size-1">Add injury</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* add search box */}
                            <ol className="col-12">
                                {injuryList}
                            </ol>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

// InjuryList.propTypes = {
//     injuryList: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, title: PropTypes.string, description: PropTypes.string }))

// }

function mapStateToProps(state) {
    return {
        injuryList: state.injuryList,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getInjuryList: getInjuryList,
        deleteInjury: deleteInjury,
        editInjury: editInjury,
        getInjuryInfo: getInjuryInfo,
        addInjury: addInjury,
        getUser: getUser,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InjuryList);