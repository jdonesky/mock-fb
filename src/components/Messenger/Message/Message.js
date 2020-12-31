import React, {useState, useEffect} from 'react';
import classes from './Message.css';

const message = props => {

    const {userKey, myKey, type, content, pending} = props

    useEffect(() => {
        console.log(props)
    })

    let alignment;
    let background;
    let color;
    if (userKey !== myKey) {
        alignment = 'flex-start';
        background = 'rgba(0,0,0,0.05)';
        color = '#000000'
    } else {
        alignment = 'flex-end';
        background = 'rgba(0,0,0,0.05)';
        color = '#000000'
        background = '#337bff';
        color = 'white';
    }

    if (pending) {
        background = 'rgba(0,0,0,0.05)'
        color = 'rgba(0,0,0,0.1)'
    }

    let message;
    switch (type) {
        case 'text':
            message = <div className={classes.Text} style={{ backgroundColor: background, color: color }}>{content}</div>
            break;
        case 'photo':
            message = <div className={classes.Photo} style={{backgroundImage: `url${content}`}} />
            break;
        case 'gif':
            message = <div className={classes.Gif} style={{backgroundImage: `url${content}`}} />
            break;
    }

    return (
        <div className={classes.Container} style={{justifyContent : alignment}}>
            {message}
        </div>
    )
}

export default message;