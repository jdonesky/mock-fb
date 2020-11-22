
import React from 'react';
import classes from './Emoji.css'

const emoji = (props) => {
    return (
    <div className={classes.Emoji} style={{backgroundImage: props.gif ? `url(${props.gif})`: null}}/>
    )
}

export default emoji;