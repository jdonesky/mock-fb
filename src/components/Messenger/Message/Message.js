import React, {useState, useEffect} from 'react';
import classes from './Message.css';

const message = props => {

    const {userKey, myKey, type, content} = props

    useEffect(() => {
        console.log(props)
    })

    let alignment;
    if (userKey !== myKey) {
        alignment = 'flex-start';
    } else {
        alignment = 'flex-end';
    }

    let message;

    switch (type) {
        case 'text':
            message = <div className={classes.Text}>{content}</div>
            break;
        case 'photo':
            message = <div className={classes.Photo} style={{backgroundImage: `url${content}`}} />
            break;
        case 'gif':
            message = <div className={classes.Gif} style={{backgroundImage: `url${content}`}} />
            break;
    }



    return (
        <div className={classes.Container} style={{justifyContent: alignment}} >
            {message}
        </div>
    )
}

export default message;