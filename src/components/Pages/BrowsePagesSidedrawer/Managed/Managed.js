
import React from 'react';
import {connect} from 'react-redux';
import classes from './Managed.css';

import PageEntry from './PageEntry/PageEntry';

const managed = props => {

    let managedPages;
    if (props.myPages && Object.keys(props.myPages).length) {
        managedPages = Object.keys(props.myPages).map(page => (
            <PageEntry
                profileImage={page.profileImage}
                name='Name'
                category='Category'
            />
        ))
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
        myPages: state.pages.myPages
    }
}


export default connect(mapStateToProps)(managed);