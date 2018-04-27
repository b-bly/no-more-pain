import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import PropTypes from 'prop-types';
import getInjuryList from '../../actions/getInjuryList';
import { Link, Redirect } from 'react-router-dom';
//COMPONENTS
//import AddInjuryForm from './add-injury-form';
import InjuryForm from './injury-form';
//ACTIONS
import getInjuryInfo from '../../actions/getInjuryInfo'
import deleteInjury from '../../actions/delete-injury'
import updateInjury from '../../actions/update-injury'

//STYLES
import './styles.css';

class InjuryListItem extends Component {
    //When you pass a parameter to an onClick function, you can't just write it like
    //handleClick(parameter) or react will call it repeatedly.
    //I am externalizing item to avoid using an arrow
    //function, which creates a new function every click
    //https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md#protips
    //https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
    handleClick() {
        this.props.handleClick(this.props.injury._id);
    }

    delete() {
        this.props.delete(this.props.injury._id);
    }

    showForm() {
        this.props.showForm(this.props.injury._id);
    }

    render() {
        return (
            <div>
                <li className="injury-list-item"
                    onClick={this.handleClick.bind(this)}
                >{this.props.injury.title}</li>
                <a className="list-links"
                    onClick={this.showForm.bind(this)}>edit</a>
                &nbsp;
            <a className="list-links"
                    onClick={this.delete.bind(this)}>delete</a>
            </div>
        );
    }
}

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

    injuryInfo(id) {
        console.log('injuryInfo called, id:');
        console.log(id);
        //call getInjuryInfo to set store injuryInfo to clicked injury
        this.props.getInjuryInfo(id);
        //set state to redirect
        this.setState({
            redirectTo: 'injury-info'
        });
    }

    delete(id) {
        console.log('injury-list, delete called, id: ');
        console.log(id);
        this.props.deleteInjury(id);
    }

    showForm(id) {
        this.setState({
            showForm: id
        })
    }

    componentWillMount() {
        if (this.props.injuryList.length < 1) {
            this.props.getInjuryList();
        }
        
    }

    updateInjury(updatedInjury) {
        this.props.updateInjury(updatedInjury);
        console.log('updateInjury called, updatedInjury: ');
        console.log(updatedInjury);
        
        this.setState({
            showForm: ''
        });
    }

    cancel () {
        this.setState({
            showForm: ''
        });
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            console.log('injury list props: ');
            console.log(this.props);
            const injuryList = this.props.injuryList.map((injury, i) =>
                <div key={i.toString()}>
                    {injury._id === this.state.showForm ? (
                        <InjuryForm
                        updateInjury={this.updateInjury.bind(this)} 
                        cancel={this.cancel.bind(this)}
                        injury={injury} />
                    )
                        : (
                            <InjuryListItem
                                handleClick={this.injuryInfo}
                                delete={this.delete}
                                showForm={this.showForm.bind(this)}
                                injury={injury} />

                        )}

                    {/* to do: only show edit/delete if user = current user */}

                </div>
            );
            //     const injuryListStatic = [{title: 'high hamstring tendonopathy'}, {title: 'lower back pain'}, {title: 'iliotibial band syndrome'}, {title: 'medial epicondolitis'}];
            //     const injuryList = injuryListStatic.map((titleObj, i) =>
            //     <li key={i.toString()}> {titleObj.title} </li>
            // );
            return (
                <div className="container">
                    <div className="center columns">
                        <div className="col-2 list-title"><h3>Injury List</h3></div>
                        <Link to='/add-injury' className="btn list-title">Add injury</Link>
                    </div>
                    {/* search box */}
                    <ol>
                        {injuryList}
                    </ol>
                    <Link to='/injury-info'>Injury Info</Link> <br></br>


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
        injuryList: state.injuryList
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getInjuryList: getInjuryList,
        deleteInjury: deleteInjury,
        updateInjury: updateInjury,
        getInjuryInfo: getInjuryInfo
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InjuryList);