
import React from 'react';
import classes from './InlineDots.css'

const inlineDots = (props) => {

    // let containerClass
    // if (props.className) {
    //     containerClass = props.className
    // }

    return (
        <div className={props.className}>
            <div className={classes.spinner}>
                <div className={classes.bounce1}></div>
                <div className={classes.bounce2}></div>
                <div className={classes.bounce3}></div>
            </div>
        </div>
    );
}

export default inlineDots;