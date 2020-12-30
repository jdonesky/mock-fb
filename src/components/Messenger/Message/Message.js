import React, {useState} from 'react';
import classes from './Message.css';

const message = props => {

    const {userKey, myKey, type, payload} = props

    let alignment;
    if (userKey !== myKey) {
        alignment = 'flex-start';
    } else {
        alignment = 'flex-end';
    }

    let message;
    let messageType;
    switch (type) {
        case 'text':
            message = <div className={classes.Text}>{payload}</div>
            break;
        case 'photo':
            message = <div className={classes.Photo} style={{backgroundImage: `url${payload}`}} />
            break;
        case 'gif':
            message = <div className={classes.Gif} style={{backgroundImage: `url${payload}`}} />
            break;
    }



    return (
        <div className={classes.Container} style={{justifyContent: alignment}} >


        </div>
    )
}

export default message;