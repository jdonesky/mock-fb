
import React from 'react';
import classes from "./Photo.css"

const photo = (props) => {
    return (
        <div className={classes.Container} style={{backgroundImage: `url(${props.photo})`, height: `${props.width * .25}px`}} />
    );
}

export default photo;
