import React from 'react';
import classes from './Suggestion.css'

const suggestedLocation = (props) => {
    let icon;
    return (
        <div className={classes.Container} onClick={props.clicked}>
            <div className={classes.Icon}>{icon}</div>
            <div className={classes.Text}><span>{props.text}</span></div>
        </div>
    );
}

export default suggestedLocation;