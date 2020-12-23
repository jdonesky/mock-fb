
import React from 'react';
import {connect} from 'react-redux';
import classes from './OwnedPagesDropdown.css';
import * as actions from '../../../../../store/actions/index';

const ownedPagesDropdown = props => {

    const managePage = (key) => {
        props.onFetchOwnedPage(props.authToken, key)
        props.close();
    }

    let ownedPages;
    if (props.myPages) {
        Object.keys(props.myPages).map(key => (
            <div
                className={classes.OwnPageButton}
                onClick={() => managePage(key)}
            >

            </div>
        ))
    }

    return (
        <div className={classes.DropdownContainer}>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        myPages: state.pages.myPages,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOwnedPage: (authToken, pageKey) => dispatch(actions.fetchOwnedPageAttempt(authToken, pageKey))
    }
}

export default connect(mapStateToProps)(ownedPagesDropdown);