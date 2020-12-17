
import React from 'react';
import classes from './Request.css';

const request = prop => {

    return (
        <div className={classes.Container}>
            <div className={classes.ProfileImageBlock}>

            </div>
            <div className={classes.InfoAndControlsContainer}>
                <div className={classes.ControlsContainer}></div>
            </div>
        </div>
    );
}


export default request;