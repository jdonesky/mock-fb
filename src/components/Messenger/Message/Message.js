import React, {useState, useEffect, useRef} from 'react';
import classes from './Message.css';
import Avatar from '../../../assets/images/BookmarkIcons/user';
import Label from '../../UI/Label/Label';
import {useComponentDimensions} from "../../../hooks/getComponentDimensions";
import {convertMessageDatetime} from "../../../shared/utility";

const message = props => {

    const messageRef = useRef(null);
    const {userKey, myKey, theirProfileImage, type, content, date, pending} = props
    const {width, height} = useComponentDimensions(messageRef)
    const [labelOffset, setLabelOffset] = useState(null);

    useEffect(() => {
        setLabelOffset(width)
    }, [width])

    let alignment;
    let background;
    let color;
    let margin;
    let profileImage;
    let labelPosition;
    if (userKey !== myKey) {
        profileImage = (
            <div className={classes.ProfileImage} style={{backgroundImage: `url(${theirProfileImage})` || null}}>
                {theirProfileImage ? null : <Avatar fill="white"/>}
            </div>
        )
        alignment = 'flex-start';
        background = 'rgba(0,0,0,0.05)';
        color = '#000000'
        labelPosition = {left: labelOffset && `${labelOffset + 10}px`, top: '5px'}
    } else {
        alignment = 'flex-end';
        margin = '10px'
        background = 'rgba(0,0,0,0.05)';
        color = '#000000'
        background = '#337bff';
        color = 'white';
        labelPosition = {right: labelOffset && `${labelOffset + 20}px`, top: '5px'}
    }

    if (pending) {
        background = 'rgba(0,0,0,0.05)'
        color = 'rgba(0,0,0,0.1)'
    }


    let message;
    switch (type) {
        case 'text':
            message = <div className={classes.Text} ref={messageRef} style={{ backgroundColor: background, color: color, marginRight: margin || null }}>{content}</div>
            break;
        case 'photo':
            message = <div className={classes.Photo} ref={messageRef} style={{backgroundImage: `url${content}`}} />
            break;
        case 'gif':
            message = <div className={classes.Gif} ref={messageRef} style={{backgroundImage: `url${content}`}} />
            break;
    }

    return (
        <div className={classes.Container} style={{justifyContent : alignment}} >
            {profileImage}
            <Label label={convertMessageDatetime(date)} {...labelPosition} minWidth="80px" minHeight="20px">
                {message}
            </Label>

        </div>
    )
}

export default message;