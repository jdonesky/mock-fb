
import React from 'react';
import classes from "./Photo.css"

const photo = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.Backdrop} style={{backgroundImage: `url(${props.photo})`}}/>
        </div>
    );
}

export default photo;
