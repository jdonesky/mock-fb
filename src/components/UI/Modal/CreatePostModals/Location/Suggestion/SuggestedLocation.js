import React from 'react';
import classes from './SuggestedLocation.css'
import House from "../../../../../../assets/images/home";
import Pin from "../../../../../../assets/images/Pin";

const suggestedLocation = (props) => {

    let icon;
    if (props.type === 'current') {
        icon = <House fill="white" />
    } else {
        icon = <Pin fill="white" />
    }

    return (
        <div className={classes.Container} onClick={props.clicked}>
            <div className={classes.Icon}>
                {icon}
            </div>
            <div className={classes.Text}><span>{props.name}</span></div>
        </div>
    );
}

export default suggestedLocation;