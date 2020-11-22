
import React from 'react';
import classes from './Gif.css';

const gif = (props) => {

    return (
        <div
            className={classes.GifContainer}
            style={{backgroundImage: props.gif ? `url(${props.gif})`: null}}
            onClick={() => props.clicked(props.gif)}
        />
    );
}

export default gif;