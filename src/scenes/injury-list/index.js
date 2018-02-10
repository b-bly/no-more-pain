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

class InjuryList extends Component {
    constructor(props) {
        super(props);
        this.state = { injuryList: [] };
    }
    componentWillMount() {
        this.props.getInjuryList();
    }
    render() {
        console.log('injury list props: ');
        console.log(this.props);
        const injuryList = this.props.injuryList.map((titleObj, i) =>
            <div key={i.toString()}>
                <li> {titleObj.title} </li>
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
                {/* search box, add injury  */}
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