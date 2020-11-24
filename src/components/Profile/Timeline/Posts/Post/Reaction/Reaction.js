
import React from 'react';
import classes from './Reaction.css'



const reaction = (props) => {

    let icon;
    switch (props.caption) {
        case 'Like':
            // icon =
            break;
        case 'Love':
            // icon =
            break;
        case 'Omg':
            // icon =
            break;
        case 'Cry':
            // icon =
            break;
        case 'Mad':
            // icon =
            break;
        case 'Sad':
            // icon =
            break;
        case 'Lmao':
            // icon =
            break;
        case 'No!':
            // icon =
            break;
        case 'Cool!':
            // icon =
            break;
        default:
            icon = null;

    }

    return (
        <div className={classes.ReactionContainer}>
            <div className={classes.Icon}>{icon}</div>
            <span className={classes.Name}>{props.name}</span>
        </div>
    )
}

export default reaction;