import React, {useState, useEffect} from 'react';
import classes from './Message.css';
import Avatar from '../../../assets/images/BookmarkIcons/user';

const message = props => {

    const {userKey, myKey, theirProfileImage, type, content, pending} = props

    let alignment;
    let background;
    let color;
    let margin;
    let profileImage;
    if (userKey !== myKey) {
        profileImage = (
            <div className={classes.ProfileImage} style={{backgroundImage: `url(${theirProfileImage})` || null}}>
                {theirProfileImage ? null : <Avatar fill="white"/>}
            </div>
        )
        alignment = 'flex-start';
        background = 'rgba(0,0,0,0.05)';
        color = '#000000'
    } else {
        alignment = 'flex-end';
        margin = '10px'
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
            message = <div className={classes.Text} style={{ backgroundColor: background, color: color, marginRight: margin || null }}>{content}</div>
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
            {profileImage}
            {message}
        </div>
    )
}

export default message;