
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import classes from './Managed.css';

import FoldingSquare from '../../../UI/Spinner/SquareFold';
import PageEntry from './PageEntry/PageEntry';

const managed = props => {

    let managedPages;
    if (props.myPages && Object.keys(props.myPages).length) {
        managedPages = Object.keys(props.myPages).map(key => (
            <PageEntry
                key={key}
                profileImage={props.myPages[key].profileImage}
                name={props.myPages[key].name}
                category={props.myPages[key].category}
                likes={props.myPages[key].likes}
                follows={props.myPages[key].follows}
                notifications={props.myPages[key].notifications}
                messages={props.myPages[key].messages}
            />
        ))
    }

    if (props.fetchingMyPages) {
        managedPages = <FoldingSquare />
    }

    return (
        <div className={classes.ManagedContainer}>
            <div className={classes.Header}>Pages You Manage</div>
            {managedPages}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        myPages: state.pages.myPages,
        fetchingMyPages: state.pages.fetchingMyPages
    }
}


export default connect(mapStateToProps)(managed);