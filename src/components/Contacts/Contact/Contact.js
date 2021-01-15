
import React from 'react';
import classes from './Contact.css';
import Avatar from '../../../assets/images/BookmarkIcons/user';

const contact = props => {

    let onlineIndicator;
    if (props.online) {
        onlineIndicator = <div className={classes.OnlineIndicator} />
    }

    return (
        <div className={classes.Container}>
            <div className={classes.ProfileImageContainer}>
                <div className={classes.ProfileImage}>
                    {props.profileImage ? null : <Avatar fill="white" />}
                </div>
            </div>
            <div className={classes.Name}>{props.name}</div>
        </div>
    );
}

export default contact;