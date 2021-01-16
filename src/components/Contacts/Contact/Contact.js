
import React, {useState} from 'react';
import classes from './Contact.css';
import Avatar from '../../../assets/images/BookmarkIcons/user';
import ProfileSummary from '../../Users/Dropdowns/ProfileSummary/ProfileSummary';
import OutsideAlerter from "../../../hooks/outsideClickHandler";

const contact = props => {

    const [viewingSummary, setViewingSummary] = useState(false);

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

    const enterContact = () => {
        startViewingSummary();
        if (summaryClosingTimer) {
            cancelCloseSummary();
        }
    }

    const leaveContact = () => {
        cancelOpenSummary()
        if (viewingSummary) {
            startClosingViewingSummary()
        }
    }

    const openChat = () => {
        props.fetchContactProfile(props.authToken, props.publicProfileKey, 'CONTACT', (profile) => {
            console.log('contact profile in callback -> ', profile);
            props.beginChat(profile, 'USER', 'USER')
        })
    }

    let onlineIndicator;
    if (props.online && props.online.includes(props.userId)) {
        onlineIndicator = <div className={classes.OnlineIndicator} />
    }

    let profileSummary;
    if (viewingSummary) {
        profileSummary = <ProfileSummary loc="HOME"  userKey={props.userKey} publicProfileKey={props.publicProfileKey} myFriends={props.friends} onMouseEnter={cancelCloseSummary} onMouseLeave={startClosingViewingSummary}/>
    }



    return (
        <React.Fragment>
            <div className={classes.Container} onMouseEnter={enterContact} onMouseLeave={leaveContact} onClick={openChat}>
                <div className={classes.ProfileImageContainer}>
                    <div className={classes.ProfileImage}>
                        {props.profileImage ? null : <Avatar fill="white" />}
                    </div>
                    {onlineIndicator}
                </div>
                <div className={classes.Name}>{props.name}</div>
            </div>
            <OutsideAlerter action={quickCloseSummary}>
                {profileSummary}
            </OutsideAlerter>
        </React.Fragment>
    );
}

export default contact;