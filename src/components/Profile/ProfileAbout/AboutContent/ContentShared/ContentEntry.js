
import React, {useEffect} from 'react';
import classes from "./ContentEntry.css";

const contentEntry = props => {

    let imageUrl;
    switch (props.category) {
        case 'work':
            imageUrl = 'https://cdn1.vectorstock.com/i/1000x1000/05/80/dark-briefcase-icon-on-a-white-background-vector-16670580.jpg'
            break;
        // case 'education':
        // case 'currLocation':
        // case 'fromLocation':
        // case 'relationship':
        // case 'contact':
        default:
            imageUrl = null;

    }

    return (
        <div className={classes.Entry}>
            <div className={classes.Icon} style={{backgroundImage: `url('${imageUrl}')`}}/>
            <span className={classes.MainText}>{props.mainText}</span>
            <span className={classes.SubText}>{props.subText}</span>
            <div className={classes.ShareIcon}/>
            <div className={classes.EditIcon}/>
        </div>
    );
}

export default contentEntry;