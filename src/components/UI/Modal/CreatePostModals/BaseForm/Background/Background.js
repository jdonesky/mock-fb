
import React from 'react';
import classes from './Background.css'

const background = (props) => {
    return (
        <div
            className={classes.Background}
            style={{backgroundImage: `url(${props.svg})`, backgroundColor: `${props.color}`}}
        />
    )
}

export default background;