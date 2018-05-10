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
        this.injuryInfo = this.injuryInfo.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentWillMount() {
        this.props.getUser();
            this.props.getInjuryList();  
    }

    injuryInfo(id) {
        //call getInjuryInfo to set store injuryInfo to clicked injury
        this.props.getInjuryInfo(id);
        //set state to redirect
        this.setState({
            redirectTo: 'injury-info'
        });
    }

    delete(injuryData) {
        if (window.confirm('Are you sure?')) {
            this.props.deleteInjury(injuryData);
        }
    }

    showForm(id) {
        this.setState({
            showForm: id
        })
    }

    editInjury(updatedInjury) {
        this.props.editInjury(updatedInjury);
        this.setState({
            showForm: ''
        });
    }

    cancel() {
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
                                handleClick={this.injuryInfo}
                                delete={this.delete}
                                showForm={this.showForm.bind(this)}
                                injury={injury}
                                username={this.props.user.username}
                                userId={this.props.user.id} />

                        )}

                    {/* to do: only show edit/delete if user = current user */}

                </div>
            );
            //     const injuryListStatic = [{title: 'high hamstring tendonopathy'}, {title: 'lower back pain'}, {title: 'iliotibial band syndrome'}, {title: 'medial epicondolitis'}];
            //     const injuryList = injuryListStatic.map((titleObj, i) =>
            //     <li key={i.toString()}> {titleObj.title} </li>
            // );
            return (
                <div>
                    <div className="container">
                        <div className="center columns">
                            <div className="col-2 list-title"><h3>Injury List</h3></div>
                            <Link to='/add-injury' className="btn list-title">Add injury</Link>
                        </div>
                        {/* search box */}
                        <ol>
                            {injuryList}
                        </ol>


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
    // console.log('InjuryList mapStateToProps called, state: ');
    // console.log(state);

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