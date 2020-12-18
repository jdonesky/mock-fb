
import React from 'react';
import classes from './Request.css';

import Avatar from '../../../assets/images/BookmarkIcons/user';

const request = props => {

    const confirm = () => {

    }

    const deny = () => {

    }

    return (
        <div className={classes.Container}>
            <div className={classes.ProfileImageBlock}>
                <div className={classes.ProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}}>
                    {props.profileImage ? null : <Avatar fill="white"/>}
                </div>
            </div>
            <div className={classes.InfoAndControlsContainer}>
                <div className={classes.Name}>{props.name}</div>
                <div className={classes.ControlsContainer}>
                    <div className={[classes.Control, classes.ConfirmControl].join(" ")}>
                        Confirm
                    </div>
                    <div className={classes.Control}>
                        Delete
                    </div>
                </div>
            </div>
        </div>
    );
}


export default request;