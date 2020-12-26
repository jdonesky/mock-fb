import React from 'react'
import classes from './Spinner.css'

const spinner = (props) => (
    <div className={classes.loader} style={{position: "relative", bottom: props.bottom, top: props.top, left: props.left, right: props.right, backgroundColor: props.backgroundColor}}/>
);

export default spinner;