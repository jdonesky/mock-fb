import React from 'react';
import classes from './Suggestion.css'
import NoGenderPlaceholder from "../../../../../../assets/images/profile-placeholder-gender-neutral";

const suggestedLocation = (props) => {

    return (
        <div className={classes.Container} onClick={props.clicked}>
            <div className={classes.ProfileImageContainer}>
                <div className={classes.ProfileImage}>
                    {props.image || <NoGenderPlaceholder /> }
                </div>
            </div>
            <div className={classes.Text}><span>{props.name}</span></div>
        </div>
    );
}

export default suggestedLocation;