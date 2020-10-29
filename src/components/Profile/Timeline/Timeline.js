
import React from 'react';
import classes from './Timeline.css'

const timeLine = (props) => {
    return (
        <div className={classes.Timeline}>
            {props.children}
        </div>
    )
}

export default timeLine;