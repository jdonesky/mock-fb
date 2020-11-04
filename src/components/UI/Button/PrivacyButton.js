
import React from 'react';
import Button from './Button'
import Globe from '../../../assets/images/earth'
import Lock from '../../../assets/images/padlock'
import Friends from '../../../assets/images/friends'
import classes from './PrivacyButton.css'

const privacyButton = (props) => {
    let icon;
    let text;
    switch (props.privacy) {
        case 'public':
            icon = <Globe />
            text = 'Public'
            break;
        case 'private':
            icon = <Lock />
            text = 'Only me'
            break;
        case 'friends':
            icon = <Friends />
            text = 'Friends'
            break;
        default:
            icon = <Globe />
    }

    const iconContainer = <span className={classes.IconContainer}>{icon}</span>
    return (
        <Button className={props.className} addClass="Neutral" type="privacy" clicked={props.clicked}>{iconContainer}{text}</Button>
    );
};

export default privacyButton;
