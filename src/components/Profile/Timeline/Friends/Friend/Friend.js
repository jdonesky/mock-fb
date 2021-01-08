

import React, {useState,useEffect} from 'react';
import classes from './Friend.css';
import Avatar from '../../../../../assets/images/BookmarkIcons/user';
import getWindowDimensions from "../../../../../hooks/getWindowDimensions";
import ProfileSummary from '../../../../Users/Dropdowns/ProfileSummary/ProfileSummary';
import OutsideAlerter from "../../../../../hooks/outsideClickHandler";

const friend = props => {

    const {width, height} = getWindowDimensions()
    const [viewingSummary, setViewingSummary] = useState(false);

    useEffect(() => {
        return () => {
            if (summaryOpeningTimer) {
                clearTimeout(summaryOpeningTimer);
            }
            if (summaryClosingTimer) {
                clearTimeout(summaryClosingTimer);
            }
        }
    }, [])

    let summaryOpeningTimer;
    const startViewingSummary = () => {
        summaryOpeningTimer = setTimeout(() => {
            setViewingSummary(true);
        }, 500)
    }

    const cancelOpenSummary = () => {
        clearTimeout(summaryOpeningTimer)
    }

    let summaryClosingTimer;
    const startClosingViewingSummary = () => {
        summaryClosingTimer = setTimeout(() => {
            setViewingSummary(false)
        }, 200)
    }

    const quickCloseSummary = () => {
        setViewingSummary(false);
    }

    const cancelCloseSummary = () => {
        clearTimeout(summaryClosingTimer);
    }

    const enterProfileImage = () => {
        startViewingSummary();
        if (summaryClosingTimer) {
            cancelCloseSummary();
        }
    }

    const leaveProfileImage = () => {
        cancelOpenSummary()
        if (viewingSummary) {
            startClosingViewingSummary()
        }
    }

    let profileSummary;
    if (viewingSummary) {
        profileSummary = <ProfileSummary loc="FRIEND" userKey={props.userKey} publicProfileKey={props.publicProfileKey} myFriends={props.myFriends} onMouseEnter={cancelCloseSummary} onMouseLeave={startClosingViewingSummary}/>
    }

    return (
        <React.Fragment>
            <div className={classes.Container} >
                <div className={classes.ProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null, height: `${width * .25}px`}} onClick={props.nav} onMouseEnter={enterProfileImage} onMouseLeave={leaveProfileImage}>
                    {props.profileImage ? null : <Avatar fill="white"/>}
                </div>
                <div className={classes.Name} onClick={props.nav}>{props.name}</div>
            </div>
            <OutsideAlerter action={quickCloseSummary}>
                {profileSummary}
            </OutsideAlerter>
        </React.Fragment>
    )
}

export default friend;