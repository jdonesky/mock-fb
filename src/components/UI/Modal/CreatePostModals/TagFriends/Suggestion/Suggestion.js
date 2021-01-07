import React from 'react';
import classes from './Suggestion.css'
import Avatar from "../../../../../../assets/images/BookmarkIcons/user";

const suggestedLocation = (props) => {

    return (
        <div className={classes.Container} onClick={props.clicked}>
            <div className={classes.ProfileImageContainer}>
                <div className={classes.ProfileImage}>
                    {props.image || <Avatar fill="white" /> }
                </div>
            </div>
            <div className={classes.Text}><span>{props.name}</span></div>
        </div>
    );
}

export default suggestedLocation;