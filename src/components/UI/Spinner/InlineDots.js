
import React from 'react';
import classes from './InlineDots.css'

const inlineDots = (props) => {

    return (
            <div className={classes.spinner} style={{position: props.top ? 'relative' : null, top: props.top ? props.top : null}}>
                <div className={classes.bounce1}></div>
                <div className={classes.bounce2}></div>
                <div className={classes.bounce3}></div>
            </div>
    );
}

export default inlineDots;