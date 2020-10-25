
import React from 'react';
import classes from './InlineDots.css'
const inlineDots = () => {
    return (
        <div className={classes["lds-ellipsis"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default inlineDots;