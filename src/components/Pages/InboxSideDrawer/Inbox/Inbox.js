import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './Inbox.css';
import * as actions from '../../../../store/actions/index';

import Searchbar from "../../../Search/Searchbar";
import DownArrow from "../../../../assets/images/down-arrow";
import Message from "../../../../assets/images/MessengerIcons/message";
import Filter from "../../../../assets/images/MessengerIcons/filter";

import ToggleAvailability from "./ToolbarDropdowns/ToggleAvailability/ToggleAvailability"
import OutsideAlerter from "../../../../hooks/outsideClickHandler";

const inbox = (props) => {

    const [displayPage, setDisplayPage] = useState(props.history.location.pathname.split('/')[3])
    const [viewingAvailability,setViewingAvailability] = useState(false);
    const {ownedPage} = props;

    useEffect(() => {
        if (displayPage !== props.history.location.pathname.split('/')[3]) {
            setDisplayPage(props.history.location.pathname.split('/')[3]);
        }
    })

    useEffect(() => {
        if (!ownedPage && displayPage) {
            props.onFetchOwnedPage(props.authToken, displayPage)
        }
    }, [])

    let isOnlineIndicator;
    if (ownedPage && ownedPage.isOnline) {
        isOnlineIndicator = <div className={classes.OnlineIndicator} style={{backgroundColor: "green"}}/>
    } else if (ownedPage && !ownedPage.isOnline) {
        isOnlineIndicator = <div className={classes.OnlineIndicator} style={{backgroundColor: "red"}}/>
    }

    let availabilityDropdown;
    if (viewingAvailability) {
        availabilityDropdown = (
            <ToggleAvailability
                name={ownedPage && ownedPage.name}
                isOnline={ownedPage && ownedPage.isOnline}
                pageKey={ownedPage && ownedPage.dbKey}
            />
        )
    }
    return (
        <div className={classes.Container} style={props.style || null}>
            <div className={classes.Header}>
                <Searchbar placeholder="Search Inbox" />
                <section className={classes.ToolBar}>
                    <div className={classes.ToolBarLeftBlock}>
                        <div className={classes.MainButton}>Main</div>
                        <div className={classes.DownArrow}><DownArrow /></div>
                    </div>
                    <div className={classes.ToolBarRightBlock}>
                        <OutsideAlerter action={() => setViewingAvailability(false)}>
                            <div className={classes.MessageIconContainer}>
                                {isOnlineIndicator}
                                <div className={classes.MessageIcon} onClick={() => setViewingAvailability(true)}><Message /></div>
                            </div>
                            {availabilityDropdown}
                        </OutsideAlerter>
                        <div className={classes.FilterIcon}>
                            <Filter />
                        </div>
                    </div>
                </section>
                <div className={classes.ToolbarBottom}/>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(inbox));