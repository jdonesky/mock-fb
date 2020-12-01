
import React from 'react';
import classes from './Friend.css';

const friend = (props) => {
    return (
        <div className={classes.FriendContainer}>
            <div className={classes.ProfileImage}></div>
            <div className={classes.NameTag}>
                <h3>{props.name}</h3>
            </div>
        </div>
    );
}

export default friend;