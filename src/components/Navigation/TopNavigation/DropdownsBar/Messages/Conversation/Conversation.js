
import React, {useState} from 'react';
import classes from './Conversation.css';
import Avatar from '../../../../../../assets/images/BookmarkIcons/user';
import {getElapsedTime} from "../../../../../../shared/utility";

const conversation = props => {

    const { reopenChat, removeFromNewMessages, parties, messages, newMessage, myUserKey} = props;
    const [read, setRead] = useState(false);

    let otherParty;
    if (parties) {
        otherParty = parties.find(party => party.userKey !== myUserKey)
    }

    let unreadIndicator;
    const lastMessageClass = [classes.LastMessage]
    if (newMessage && !read) {
        unreadIndicator = <div className={classes.UnreadIndicator}/>
        lastMessageClass.push(classes.UnreadText)
    }

    const goToChat = () => {
        setRead(true);
        reopenChat();
        removeFromNewMessages('USER', otherParty.userKey)
    }

    return (
        <div className={classes.Container} onClick={goToChat}>
            <div className={classes.ProfileImageBlock}>
                <div className={classes.ProfileImage} style={{backgroundImage: otherParty && otherParty.profileImage ? `url(${otherParty.profileImage})` : null}}>
                    {otherParty && otherParty.profileImage ? null : <Avatar fill="white"/>}
                </div>
            </div>
            <div className={classes.TextBlock}>
                <div className={classes.Name}>
                    {otherParty && otherParty.name}
                </div>
                {messages && messages.length ?
                 <div className={lastMessageClass.join(" ")}>{`${messages[0].content.slice(0,20)}${messages[0].content.length > 20 ? '...' : ''} • ${getElapsedTime(messages[0].date)}`}</div>
                 : null }

            </div>
            {unreadIndicator}
        </div>
    )

}

export default conversation;