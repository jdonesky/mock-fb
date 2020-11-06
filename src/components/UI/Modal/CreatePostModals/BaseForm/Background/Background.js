
import React from 'react';
import classes from './Background.css'

const background = (props) => {
    return (
        <div
            className={classes.Background}
            style={{backgroundImage: `url(${props.svg})`, backgroundColor: `${props.color}`}}
            onClick={() => props.toggle(props.svg)}
        />
    )
}

export default background;