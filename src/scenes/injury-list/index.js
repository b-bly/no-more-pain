import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import PropTypes from 'prop-types';
import getInjuryList from '../../actions/getInjuryList';
import { Link } from 'react-router-dom';
//COMPONENTS
//import AddInjuryForm from './add-injury-form';
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
        this.props.onClick(this.props.injury._id);
    }
    render() {
        return (
            <li className="injury-list-item"
            onClick={this.handleClick.bind(this)}
            >{this.props.injury.title}</li>
        );
    }
}

class InjuryList extends Component {
    constructor(props) {
        super(props);
        this.state = { injuryList: [] };
        this.injuryInfo = this.injuryInfo.bind(this);
    }
    injuryInfo(id) {
        console.log('injuryInfo called, id:');
        console.log(id);
    }

    componentWillMount() {
        this.props.getInjuryList();
    }
    render() {
        console.log('injury list props: ');
        console.log(this.props);
        const injuryList = this.props.injuryList.map((injury, i) =>
            <div key={i.toString()}>
                <InjuryListItem 
                    onClick={this.injuryInfo} 
                    injury={injury} />
                    
                {/* to do: only show edit/delete if user = current user */}
                <a className="list-links">edit</a> <a className="list-links">delete</a>
            </div>
        );
        //     const injuryListStatic = [{title: 'high hamstring tendonopathy'}, {title: 'lower back pain'}, {title: 'iliotibial band syndrome'}, {title: 'medial epicondolitis'}];
        //     const injuryList = injuryListStatic.map((titleObj, i) =>
        //     <li key={i.toString()}> {titleObj.title} </li>
        // );
        return (
            <div>
                <div className="center container">
                    <div className="col-2 list-title"><h3>Injury List</h3></div>
                    <Link to='/add-injury' className="btn col-1 list-title">Add injury</Link>
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
        getInjuryList: getInjuryList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InjuryList);