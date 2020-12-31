
import React, {useState, useEffect, useContext, useRef} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './Messenger.css';
import {MessengerContext} from "../../context/messenger-context";
import {convertMessageDatetime} from "../../shared/utility";
import * as actions from '../../store/actions/index';

import Close from '../../assets/images/MessengerIcons/close';
import Minimize from '../../assets/images/MessengerIcons/minimize';
import Avatar from '../../assets/images/BookmarkIcons/user';
import Photo from '../../assets/images/polaroid';
import Gif from '../../assets/images/MessengerIcons/gif';
import Like from '../../assets/images/like';
import Airplane from '../../assets/images/MessengerIcons/airplane';

import Spinner from '../UI/Spinner/Spinner';
import Label from '../UI/Label/Label';
import InlineDots from '../UI/Spinner/InlineDots';
import Message from './Message/Message'


const messenger = (props) => {

    const messengerContext = useContext(MessengerContext);
    const messageBar = useRef(null);
    const [focusing, setFocusing] = useState(true);
    const [theirProfile, setTheirProfile] = useState(null);
    const [conversation, setConversation] = useState(null);
    const {activeChat, chatRecord} = props

    const [textMessage,setTextMessage] = useState('')
    const [photo, setPhoto] = useState(null);
    const [gif, setGif] = useState(null);

    useEffect(() => {
        console.log('conversation', conversation);
        console.log('chat-record', chatRecord)
    })

    useEffect(() => {
        if (conversation && chatRecord && chatRecord.messages) {
            if (conversation.length !== chatRecord.messages.length) {
                props.onFetchChatRecord(props.authToken, activeChat && activeChat.key)
            }
        }

    }, [conversation, chatRecord])

    useEffect(() => {
        messageBar.current.focus();
    }, [])

    useEffect(() => {
        if (activeChat) {
            setTheirProfile(activeChat.parties.find(party => party.userKey !== props.firebaseKey))
            props.onFetchChatRecord(props.authToken, activeChat.key)
        }
    }, [activeChat])

    useEffect(() => {
        if (chatRecord) {
            setConversation(chatRecord.messages)
        }
    }, [chatRecord])

    const goToTheirProfile = () => {
        if (theirProfile) {
            if (props.history.location.pathname !== `/user-profile/${theirProfile.userKey}`) {
                props.history.push(`/user-profile/${theirProfile.userKey}`)
            }
        }
    }

    const updateText = (event) => {
        setTextMessage(event.target.value)
    }

    const sendMessage = (type, payload) => {
        const message = {
            userKey: props.firebaseKey,
            type: type,
            content: payload,
            date: new Date()
        }
        if (activeChat) {
            props.onSendMessage(props.authToken, activeChat.key, message)
        }
        setConversation(prevState => {
            return [...prevState, {...message, pending: props.sendingMessage? true : false}]
        })
        setTextMessage('');
        setPhoto(null);
        setGif(null);
    }

    let iconsFill;
    if (focusing) {
        iconsFill = "#3078fc"
    } else {
        iconsFill = "rgba(0,0,0,0.2)"
    }

    let theirProfileImage;
    let theirName;
    if (theirProfile) {
        theirProfileImage = theirProfile.profileImage
        theirName = theirProfile.name
    }

    let messages;
    if (props.fetchingChatRecord) {
        messages = <InlineDots />
    }
    if (conversation) {
        messages = conversation.map(msg => (
            <Message
                key={msg.id}
                userKey={msg.userKey}
                myKey={props.firebaseKey}
                type={msg.type}
                content={msg.content}
                date={msg.date}
                pending={msg.pending}
            />
        ))
    }

    let rightButton;
    let leftButtons;
    let messageBarLength;
    let messageBarMarginLeft;
    if (textMessage === '') {
        leftButtons = (
            <React.Fragment>
                <div className={classes.AddMediaButton}><Photo fill={iconsFill}/></div>
                <div className={classes.AddMediaButton}><Gif fill={iconsFill}/></div>
            </React.Fragment>
        )
        rightButton = <div className={classes.SendButton}><Like fill={iconsFill}/></div>
        messageBarLength = "250px"
    } else {
        rightButton = <div className={classes.SendButton} onClick={() => sendMessage('text', textMessage)}><Airplane fill={iconsFill}/></div>
        messageBarLength = "290px"
        messageBarMarginLeft = "10px"
    }


    return (
        <div
            className={[classes.Container, messengerContext.showMessenger ?  classes.ShowMessenger : null].join(" ")}
        >
            <section className={classes.Header}>
                <div className={classes.IdBlock}>
                    <div className={classes.HeaderProfileImage} style={{backgroundImage: theirProfileImage ? `url(${theirProfileImage})`: null}} onClick={goToTheirProfile}>
                        {theirProfileImage ? null : props.startingChat || props.restartingChat ? <Spinner /> : <Avatar fill="white" />}
                    </div>
                    <div className={classes.HeaderName}>{theirName}</div>
                </div>
                <div className={classes.ControlsBlock}>
                    <Label label="Minimize chat" bottom='40px' left="-35px" width="90px">
                        <div className={[classes.Control, classes.Minimize].join(" ")}><Minimize fill={iconsFill}/></div>
                    </Label>
                    <Label label="Close chat" bottom='40px' left="-20px"  width="70px">
                        <div className={[classes.Control, classes.Close].join(" ")} onClick={() => messengerContext.closeMessenger()}><Close fill={iconsFill}/></div>
                    </Label>
                </div>
            </section>
            <section className={classes.ConversationContainer}>
                <div className={classes.ConversationStarter}>
                    <div className={classes.ConversationStarterProfilePic} style={{backgroundImage: theirProfileImage ? `url(${theirProfileImage})`: null}} onClick={goToTheirProfile}>
                        {theirProfileImage ? null : props.startingChat || props.restartingChat ? <Spinner /> : <Avatar fill="white" />}
                    </div>
                    <div className={classes.ConversationStarterName}>{theirProfile && theirProfile.name}</div>
                    <div className={classes.ConversationStarterDate}>{activeChat ? convertMessageDatetime(activeChat.startDate) : ''}</div>
                    <div className={classes.ConversationStarterCaption}>{activeChat ? 'You are now connected on dumb messenger' : ' '}</div>
                </div>
                {messages}
            </section>
            <section className={[classes.Footer,messengerContext.showMessenger ?  classes.ShowMessageBar : null].join(" ")}>
                {leftButtons}
                <div className={classes.MessageBarContainer} style={{width: messageBarLength, marginLeft: messageBarMarginLeft || null }}>
                    <input className={classes.MessageBar} placeholder="Aa" ref={messageBar} onChange={(event) => updateText(event)} onFocus={() => setFocusing(true)} onBlur={() => setFocusing(false)}/>
                </div>
                {rightButton}
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        startingChat: state.messenger.startingChat,
        restartingChat: state.messenger.restartingChat,
        fetchingChatRecord: state.messenger.fetchingChatRecord,
        sendingMessage: state.messenger.sendingMessage,
        activeChat: state.messenger.activeChat,
        chatRecord: state.messenger.chatRecord,
        firebaseKey: state.profile.firebaseKey,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchChatRecord: (authToken, chatKey) => dispatch(actions.fetchChatRecordAttempt(authToken, chatKey)),
        onSendMessage: (authToken, chatKey, message) => dispatch(actions.sendMessageAttempt(authToken, chatKey, message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(messenger));