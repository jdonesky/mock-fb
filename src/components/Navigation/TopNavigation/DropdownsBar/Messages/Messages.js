
import React, {useEffect, useState, useContext} from 'react';
import {connect} from 'react-redux';
import classes from './Messages.css';
import * as actions from '../../../../../store/actions/index';
import Searchbar from '../../../../Search/Searchbar';
import Conversation from './Conversation/Conversation';
import Dots from '../../../../../assets/images/dots';
import ComposeMessage from '../../../../../assets/images/MessengerIcons/composeMessage';
import {MessengerContext} from "../../../../../context/messenger-context";
import {checkForNewMessages} from "../../../../../shared/utility";
import underConstructionModal from "../../../../UI/Modal/UnderConstructionModal/UnderConstructionModal";
import {UnderConstructionContext} from "../../../../../context/under-construction-context";

const messagesDropdown = props => {

    const messengerContext = useContext(MessengerContext);
    const underConstruction = useContext(UnderConstructionContext)
    const { retrieveChat, removeFromNewMessages } = messengerContext;
    const { authToken, firebaseKey, myPublicProfileKey, onFetchMyChats, onFetchFriends, onLoadNewMessages, myChats, newMessages, friends } = props
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        onFetchMyChats(authToken, myPublicProfileKey);
        checkForNewMessages(firebaseKey, (newMessages) => {
            onLoadNewMessages(newMessages)
        })
        onFetchFriends(authToken, myPublicProfileKey)
    }, [])

    const filterResults = (name) => {
        let filtered = [];
        if (friends) {
            filtered = friends.filter(friend => friends.name.split(" ")[0].slice(0, name.length) === name || friends.name.split(" ")[1].slice(0, name.length) === name)
        }
        if (myChats) {
            filtered = [...filtered, myChats.parties.map(party => party.userKey !== firebaseKey)]
        }
    }

    const reopenChat = (chatKey) => {
        retrieveChat(chatKey);
    }

    let updatedChats;
    if (myChats) {
        updatedChats = [...myChats].map(chat => ({...chat, messages: [...Object.keys(chat.messages).map(key => ({...chat.messages[key]}))].sort((a,b) => new Date(b.date) - new Date(a.date))}));
        if (newMessages) {
            const chatsToUpdate = newMessages.map(message => message.chatKey)
            updatedChats = updatedChats.map(chat => {
                if (chatsToUpdate.includes(chat.chatKey) && chat.messages && chat.messages[0].userKey !== firebaseKey) {
                    return {...chat, newMessage: true}
                }
                return chat;
            })
        }
    }

    let chats;
    if (updatedChats) {
        chats = updatedChats.map(chat => (
            <Conversation key={chat.chatKey} {...chat} reopenChat={() => reopenChat(chat.chatKey)} removeFromNewMessages={removeFromNewMessages} myUserKey={firebaseKey}/>
        ))
    }



    return (
        <div className={classes.DropdownContainer}>
            <section className={classes.Header}>
                <div className={classes.Title}>Messenger</div>
                <div className={classes.HeaderButtons}>
                    {/*<div className={classes.HeaderButton}>*/}
                    {/*    <div className={classes.HeaderButtonIcon}>*/}
                    {/*        <Dots />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className={classes.HeaderButton} onClick={underConstruction.openModal}>
                        <div className={[classes.HeaderButtonIcon,classes.ComposeIcon].join(" ")}>
                            <ComposeMessage />
                        </div>
                    </div>
                </div>
            </section>
            <Searchbar filterResults={filterResults} className={classes.SearchBar} iconClass={classes.SearchGlass} placeholder="Search Messenger"/>
            <section className={classes.ChatsContainer}>
                {chats}
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        myPublicProfileKey: state.profile.publicProfileKey,
        myChats: state.messenger.myChats,
        newMessages: state.messenger.newMessages,
        friends: state.friends.friends
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMyChats: (authToken, userKey) => dispatch(actions.fetchMyChatsAttempt(authToken, userKey)),
        onLoadNewMessages: (authToken, userKey) => dispatch(actions.updateNewMessages(authToken, userKey)),
        onFetchFriends: (authToken, publicProfileKey) => dispatch(actions.fetchFriendsAttempt(authToken, publicProfileKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(messagesDropdown);