
import React, {useState, useEffect} from 'react';
import classes from './Request.css';

import Avatar from '../../../assets/images/BookmarkIcons/user';
import Dots from '../../../assets/images/dots';
import Spinner from '../../UI/Spinner/Spinner';

const request = props => {

    const {acceptingRequest, denyingRequest, keyInProcess} = props
    const [requestAccepted, setRequestAccepted] = useState(false);
    const [requestDenied, setRequestDenied] = useState(false);

    useEffect(() => {
        console.log('this users key', props.userKey)
        console.log('accepting request? ', props.acceptingRequest)
        console.log('denying request? ', props.denyingRequest)
    })

    useEffect(() => {
        if (keyInProcess === props.userKey) {
            if (acceptingRequest) {
                setRequestAccepted(true)
            } else if (denyingRequest) {
                setRequestDenied(true)
            }
        }
    }, [acceptingRequest, denyingRequest])


    const confirm = () => {
        props.acceptReq(props.publicProfileKey);
        setRequestAccepted(true);
    }

    const deny = () => {
        props.denyReq(props.publicProfileKey);
        setRequestDenied(true);
    }

    let requestBody = (
        <React.Fragment>
            {props.mutualFriends ? <div className={classes.MutualFriends}>{`${props.mutualFriends.length} mutual friend${props.mutualFriends.length === 1 ? '' : 's'}`}</div> : null}
            <div className={classes.ControlsContainer} style={{flex: props.mutualFriends ? null : '1'}}>
                <div className={[classes.Control, classes.ConfirmControl].join(" ")} onClick={confirm}>
                    {props.acceptingRequest ? <Spinner /> : 'Confirm'}
                </div>
                <div className={classes.Control} onClick={deny}>
                    {props.denyingRequest ? <Spinner /> : 'Delete'}
                </div>
            </div>
        </React.Fragment>
    )

    let isFriend = false;
    if (props.myNewFriends) {
        isFriend = props.myNewFriends.map(friend => friend.userKey).includes(props.userKey)
    }

    if (requestAccepted || isFriend) {
        requestBody = (
            <div className={classes.ActionContainer}>
                <div className={classes.ActionMessage}>Request accepted</div>
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
        <div className={classes.Container} style={{ minHeight: props.mutualFriends ? null : '95px'}} onClick={() => props.display(props.userKey)}>
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