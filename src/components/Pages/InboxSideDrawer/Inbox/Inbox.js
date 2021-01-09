import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './Inbox.css';
import * as actions from '../../../../store/actions/index';

import Searchbar from "../../../Search/Searchbar";
import DownArrow from "../../../../assets/images/down-arrow";
import Message from "../../../../assets/images/MessengerIcons/message";

const inbox = (props) => {

    const [displayProfile, setDisplayProfile] = useState(props.history.location.pathname.split('/')[3])
    const {ownedPage} = props;

    useEffect(() => {
        if (displayProfile !== props.history.location.pathname.split('/')[3]) {
            setDisplayProfile(props.history.location.pathname.split('/')[3]);
        }
    })

    useEffect(() => {
        if (!ownedPage && displayProfile) {
            props.onFetchOwnedPage(props.authToken, displayProfile)
        }
    }, [])

    let isOnlineIndicator;
    if (ownedPage && ownedPage.isOnline) {
        isOnlineIndicator = <div className={classes.OnlineIndicator} style={{backgroundColor: "green"}}/>
    } else if (ownedPage && !ownedPage.isOnline) {
        isOnlineIndicator = <div className={classes.OnlineIndicator} style={{backgroundColor: "red"}}/>
    }

    return (
        <div className={classes.Container}>
            <Searchbar />
            <section className={classes.ToolBar}>
                <div className={classes.ToolBarLeftBlock}>
                    <div className={classes.MainButton}>Main</div>
                    <div className={classes.DownArrow}><DownArrow /></div>
                </div>
                <div className={classes.ToolbarRightBlock}>
                    <div className={classes.MessageIconContainer}>
                        {isOnlineIndicator}
                        <div className={classes.MessageIcon}><Message /></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        ownedPage: state.pages.ownedPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOwnedPage: (authToken, pageKey) => dispatch(actions.fetchOwnedPageAttempt(authToken, pageKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(inbox);