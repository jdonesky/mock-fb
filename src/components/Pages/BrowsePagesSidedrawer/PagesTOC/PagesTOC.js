
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import classes from './PagesTOC.css';
import * as actions from '../../../../store/actions/index';

const pagesTOC = props => {

    const {authToken, userKey, onFetchMyPages, myPages} = props

    useEffect(() => {
        console.log('FIRED FETCH MY PAGES ON MOUNT');
        onFetchMyPages(authToken, userKey)
    }, [authToken, userKey, onFetchMyPages])

    useEffect(() => {
        console.log('MY PAGES - ', myPages)
    }, [myPages])

    return (
        <div className={classes.tocContainer}>
            {myPages ? myPages.map(page => <div style={{height: '10px', width: '10px', backgroundColor: "rgba(0,0,0,.5)"}}/>) : null }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        userKey: state.profile.firebaseKey,
        myPages: state.pages.myPages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMyPages: (authToken, userKey) => dispatch(actions.fetchMyPagesAttempt(authToken, userKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(pagesTOC)