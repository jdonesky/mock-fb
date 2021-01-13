
import React from 'react';
import classes from './Conversation.css';
import Avatar from '../../../../../../assets/images/BookmarkIcons/user';

const conversation = props => {

    const { reopenChat, parties, messages, newMessage, myUserKey} = props;

    let otherParty;
    if (parties) {
        otherParty = parties.find(party => party.userKey !== myUserKey)
    }

    let unreadIndicator;
    const lastMessageClass = [classes.LastMessage]
    if (newMessage) {
        unreadIndicator = <div className={classes.UnreadIndicator}/>
        lastMessageClass.push(classes.UnreadText)
    }

    return (
        <div className={classes.Container} onClick={reopenChat}>
            <div className={classes.ProfileImageBlock}>
                <div className={classes.ProfileImage} style={{backgroundImage: otherParty && otherParty.profileImage ? `url(${otherParty.profileImage})` : null}}>
                    {otherParty && otherParty.profileImage ? null : <Avatar fill="white"/>}
                </div>
            </div>
            <div className={classes.TextBlock}>
                <div className={classes.Name}>
                    {otherParty && otherParty.name}
                </div>
                {messages && messages.length ? <div className={lastMessageClass.join(" ")}>{`${messages[0].content.slice(0,20)}${messages[0].content.length > 20 ? '...' : ''}`}</div> : null}
            </div>
            {unreadIndicator}
        </div>
    )

}

export default conversation;