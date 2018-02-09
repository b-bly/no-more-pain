import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import getInjuryList from '../../actions/getInjuryList';
import { Link } from 'react-router-dom';
//COMPONENTS
//import AddInjuryForm from './add-injury-form';

class InjuryList extends Component {
    constructor(props) {
        super(props);
        this.state = { injuryList: [] };
    }
    componentWillMount() {
        //this.props.getInjuryList();
    }
    render() {
        console.log('injury list props: ');
        console.log(this.props);
        // const injuryList = this.props.injuryList.map((titleObj, i) =>
        //     <li key={i.toString()}> {titleObj.title} </li>
        // );
        const injuryListStatic = [{title: 'high hamstring tendonopathy'}, {title: 'lower back pain'}, {title: 'iliotibial band syndrome'}, {title: 'medial epicondolitis'}];
        const injuryList = injuryListStatic.map((titleObj, i) =>
        <li key={i.toString()}> {titleObj.title} </li>
    );
        return (
            <div>
                <p>Injury List</p>
                <ol>
                    {injuryList}
                </ol>              
                <Link to='/injury-info'>Injury Info</Link> <br></br>
                <Link to='/add-injury'>Add injury</Link>
                
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