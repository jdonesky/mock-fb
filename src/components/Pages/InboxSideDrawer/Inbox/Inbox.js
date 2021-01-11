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

    const {ownedPage} = props;
    const [availability, setAvailability] = useState(ownedPage && ownedPage.isOnline);
    const [displayPage, setDisplayPage] = useState(props.history.location.pathname.split('/')[3])
    const [viewingAvailability,setViewingAvailability] = useState(false);

    useEffect(() => {
        if (displayPage !== props.history.location.pathname.split('/')[3]) {
            setDisplayPage(props.history.location.pathname.split('/')[3]);
        }
    })

    useEffect(() => {
        if (ownedPage) {
            setAvailability(ownedPage.isOnline)
        }
    }, [ownedPage])

    useEffect(() => {
        if (!ownedPage && displayPage) {
            props.onFetchOwnedPage(props.authToken, displayPage)
        }
    }, [])

    const updateAvailability = (status) => {
        setAvailability(status)
        props.onSwitchAvailability(props.authToken, displayPage, {isOnline: status})
    }

    let isOnlineIndicator;
    if (availability) {
        isOnlineIndicator = <div className={classes.OnlineIndicator} style={{backgroundColor: "green"}}/>
    } else {
        isOnlineIndicator = <div className={classes.OnlineIndicator} style={{backgroundColor: "red"}}/>
    }

    let availabilityDropdown;
    if (viewingAvailability) {
        availabilityDropdown = (
            <ToggleAvailability
                name={ownedPage && ownedPage.name}
                isOnline={ownedPage && ownedPage.isOnline}
                availability={availability}
                updateAvailability={updateAvailability}
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
                            <div className={classes.MessageIconContainer} onClick={() => setViewingAvailability(prevState => {return !prevState})}>
                                {isOnlineIndicator}
                                <div className={classes.MessageIcon} ><Message /></div>
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
        onFetchOwnedPage: (authToken, pageKey) => dispatch(actions.fetchOwnedPageAttempt(authToken, pageKey)),
        onSwitchAvailability: (authToken, pageKey, newStatus) => dispatch(actions.switchPageAvailability(authToken, pageKey, newStatus))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(inbox));