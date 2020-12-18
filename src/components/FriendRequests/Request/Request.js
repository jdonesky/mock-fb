
import React, {useState} from 'react';
import classes from './Request.css';

import Avatar from '../../../assets/images/BookmarkIcons/user';
import Dots from '../../../assets/images/dots';

const request = props => {

    const [requestAccepted, setRequestAccepted] = useState(false);
    const [requestDenied, setRequestDenied] = useState(false);

    const confirm = () => {
        // props.acceptReq(props.publicProfileKey);
        setRequestAccepted(true);
    }

    const deny = () => {
        // props.denyReq(props.publicProfileKey);
        setRequestDenied(true);
    }

    let requestBody = (
        <div className={classes.ControlsContainer}>
            <div className={[classes.Control, classes.ConfirmControl].join(" ")} onClick={confirm}>
                Confirm
            </div>
            <div className={classes.Control} onClick={deny}>
                Delete
            </div>
        </div>
    )

    if (requestAccepted) {
        requestBody = (
            <div className={classes.ActionContainer}>
                <div className={classes.ActionMessage}>Request accepted</div>
                <div className={classes.EditButton}>
                    <Dots />
                </div>
            </div>
        )
    }
    if (requestDenied) {
        requestBody = (
            <div className={classes.ActionContainer}>
                <div className={classes.ActionMessage}>Request removed</div>
                <div className={classes.EditButton}>
                    <Dots />
                </div>
            </div>
        )
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
                {requestBody}
            </div>
        </div>
    );
}


export default request;