
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
import AutoScroll from './AutoScroll';


const messenger = (props) => {

    const messengerContext = useContext(MessengerContext);
    const messageBar = useRef(null);
    const [focusing, setFocusing] = useState(true);
    const [theirProfile, setTheirProfile] = useState(null);
    const [conversation, setConversation] = useState(null);

    const { activeChat, chatRecord, ownedPage } = props
    const { localActiveChat, clearActiveChat, resetMessengerStarter } = messengerContext

    const [textMessage,setTextMessage] = useState('')
    const [photo, setPhoto] = useState(null);
    const [gif, setGif] = useState(null);


    useEffect(() => {
        if (resetMessengerStarter) {
            setTheirProfile(null)
        }
    })

    useEffect(() => {
        if (!localActiveChat) {
            setTheirProfile(null);
        }
        if (activeChat && localActiveChat) {
            if (localActiveChat.key !== activeChat.key) {
                setTheirProfile(null);
            }
        }
    })

    useEffect(() => {
        messageBar.current.focus();
    }, [])

    // useEffect(() => {
    //     if (localActiveChat && localActiveChat.parties) {
    //         setTheirProfile(localActiveChat.parties.find(party => party.userKey !== props.firebaseKey))
    //     }
    // }, [localActiveChat])

    useEffect(() => {
        if (activeChat && localActiveChat) {
            if (activeChat.key === localActiveChat.key) {
                if (activeChat && activeChat.parties) {
                    setTheirProfile(activeChat.parties.find(party => party.userKey !== props.firebaseKey))
                }
                if (activeChat && activeChat.key) {
                    props.onFetchChatRecord(props.authToken, activeChat.key)
                }
            }
        }

    }, [activeChat])


    // useEffect(() => {
    //     if (chatRecord) {
    //         if (chatRecord && chatRecord.messages) {
    //             const messages = []
    //             for (let key in chatRecord.messages) {
    //                 const outerMessage = chatRecord.messages[key]
    //                 const recipientInfoKey = Object.keys(outerMessage)[0]
    //                 const innerMessage = {...outerMessage[recipientInfoKey], key: key}
    //                 messages.push(innerMessage)
    //             }
    //             setConversation(messages)
    //         }
    //     }
    // }, [chatRecord])


    /// KEEP THIS = MAPPING NORMAL MESSAGE STRUCTURE

    useEffect(() => {
        if (chatRecord) {
            console.log(chatRecord)
            if (chatRecord && chatRecord.messages) {
                const mappedChatRecord = Object.keys(chatRecord.messages).map(key => ({
                    ...chatRecord.messages[key],
                    key: key
                }))
                console.log('mappedChatRecord', mappedChatRecord)
                setConversation(mappedChatRecord)
            }
        }
    }, [chatRecord])


    useEffect(() => {
        if (conversation && chatRecord && chatRecord.messages) {
            if (conversation.length !== Object.keys(chatRecord.messages).length) {
                console.log(' conversation and chat record !== length, re-fetching chatRecord')
                props.onFetchChatRecord(props.authToken, activeChat && activeChat.key);
            }
        }
        else if (conversation && conversation.length === 1 && chatRecord && !chatRecord.messages) {
            props.onFetchChatRecord(props.authToken, activeChat && activeChat.key);
        }

    }, [conversation, chatRecord])

    const closeChat = () => {
        clearActiveChat();
    }

    const goToTheirProfile = () => {
        if (theirProfile) {
            if (props.history.location.pathname !== `/user-profile/${theirProfile.userKey}`) {
                if (theirProfile.userKey === props.firebaseKey) {
                    props.history.push(`/user-profile/me`)

                } else {
                    props.history.push(`/user-profile/${theirProfile.userKey}`)
                }
            }
        }
    }

    const updateText = (event) => {
        setTextMessage(event.target.value)
    }

    const sendMessage = (type, payload, event) => {
        if (event) {
            event.preventDefault()
        }
        let myType;
        let myKey;
        let myName;
        let recipientType;
        let recipientKey;
        if (localActiveChat) {
            console.log('localActiveChat', localActiveChat);
            console.log('myType? localActiveChat.parties.find... ', localActiveChat.parties.find(party => party.userKey === props.firebaseKey).type)

            if (ownedPage) {
                myType = localActiveChat.parties.find(party => party.userKey === props.firebaseKey || party.userKey === ownedPage.dbKey).userType
            } else {
                myType = 'USER';
            }
            if (myType) {
                if (myType === 'USER') {
                    myKey = props.firebaseKey;
                    myName = props.myName;
                } else {
                    myKey = ownedPage.dbKey;
                    myName = ownedPage.name;
                }
            }
            recipientType = localActiveChat && localActiveChat.parties.find(party => party.userKey !== myKey).type
            recipientKey = localActiveChat && localActiveChat.parties.find(party => party.userKey !== myKey).userKey
        }

        const message = {
            userName: myName,
            userKey: myKey,
            userType: myType,
            recipientType: recipientType,
            recipientKey: recipientKey,
            type: type,
            content: payload,
            date: new Date()
        }

        if (activeChat) {
            props.onSendMessage(props.authToken, activeChat.key, message)
        }
        if (conversation) {
            setConversation(prevState => {
                return [...prevState, {...message, pending: true, key: -1}]
            })
        } else {
            setConversation([{...message, pending: true, key: -1}])
        }
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

    if (conversation) {
        messages = conversation.map(msg => (
            <Message
                key={msg.key}
                id={msg.key}
                userKey={msg.userKey}
                myKey={props.firebaseKey}
                theirProfileImage={theirProfileImage}
                type={msg.type}
                content={msg.content}
                date={msg.date}
                pending={msg.pending}
            />
        ))
    }

    if (props.startingChat || props.restartingChat) {
        messages = <InlineDots top="30px"/>
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

    let fetchingIndicator;
    if (props.fetchingChatRecord) {
        fetchingIndicator = <InlineDots />
    }

    let startingIndicator;
    if (props.startingChat) {
        startingIndicator = (
            <div className={classes.StartingIndicator}>
                <div>Connecting</div>
                <InlineDots top="23px" right="35px" />
            </div>
        )
    }

    let restartingIndicator;
    if (props.restartingChat) {
        restartingIndicator = (
            <div className={classes.StartingIndicator}>
                <div>Reconnecting</div>
                <InlineDots top="23px" right="25px" />
            </div>
        )
    }

    return (
        <div
            className={[classes.Container, messengerContext.showMessenger ?  classes.ShowMessenger : null].join(" ")}
        >
            <section className={classes.Header}>
                <div className={classes.IdBlock}>
                    <div className={classes.HeaderProfileImage} style={{backgroundImage: theirProfileImage ? `url(${theirProfileImage})`: null}} onClick={goToTheirProfile}>
                        {theirProfileImage ? null : props.startingChat || props.restartingChat || props.fetchingChatRecord || props.fetchingActiveChat ? <Spinner /> : <Avatar fill="white" />}
                    </div>
                    <div className={classes.HeaderName}>{props.startingChat || props.restartingChat || props.fetchingChatRecord || props.fetchingActiveChat ? ' ' : theirName}</div>
                </div>
                {fetchingIndicator}
                <div className={classes.ControlsBlock}>
                    <Label label="Minimize" bottom='40px' left="-35px" width="60px">
                        <div className={[classes.Control, classes.Minimize].join(" ")} onClick={() => messengerContext.minimizeMessenger()}><Minimize fill={iconsFill}/></div>
                    </Label>
                    <Label label="Close" bottom='40px' width="50px">
                        <div className={[classes.Control, classes.Close].join(" ")} onClick={closeChat}><Close fill={iconsFill}/></div>
                    </Label>
                </div>
            </section>
            <section className={classes.ConversationContainer}>
                <div className={classes.ConversationStarter}>
                    <div className={classes.ConversationStarterProfilePic} style={{backgroundImage: theirProfileImage ? `url(${theirProfileImage})`: null}} onClick={goToTheirProfile}>
                        {theirProfileImage ? null : props.startingChat || props.restartingChat ? <Spinner /> : <Avatar fill="white" />}
                    </div>
                    {restartingIndicator}
                    {startingIndicator}
                    <div className={classes.ConversationStarterName}>{theirProfile && theirProfile.name}</div>
                    <div className={classes.ConversationStarterDate}>{activeChat && activeChat.startDate ? convertMessageDatetime(activeChat.startDate) : ''}</div>
                    <div className={classes.ConversationStarterCaption}>{activeChat ? 'You are now connected on dumb messenger' : ' '}</div>
                </div>
                {messages}
                <AutoScroll />
            </section>
            <section className={[classes.Footer,messengerContext.showMessenger ?  classes.ShowMessageBar : null].join(" ")}>
                {leftButtons}
                <div className={classes.MessageBarContainer} style={{width: messageBarLength, marginLeft: messageBarMarginLeft || null }}>
                    <form onSubmit={(event) => sendMessage('text', textMessage, event)}>
                        <input className={classes.MessageBar} value={textMessage} placeholder="Aa" ref={messageBar} onChange={(event) => updateText(event)} onFocus={() => setFocusing(true)} onBlur={() => setFocusing(false)}/>
                    </form>
                </div>
                {rightButton}
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        myName: state.profile.firstName + ' ' + state.profile.lastName,
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        startingChat: state.profile.startingChat,
        restartingChat: state.profile.restartingChat,
        activeChat: state.profile.activeChat,
        noActiveChat: state.profile.noActiveChat,
        fetchingActiveChat: state.profile.fetchingActiveChat,
        fetchingChatRecord: state.messenger.fetchingChatRecord,
        sendingMessage: state.messenger.sendingMessage,
        chatRecord: state.messenger.chatRecord,
        ownedPage: state.pages.ownedPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchActiveChat: (authToken, userKey) => dispatch(actions.fetchActiveChatAttempt(authToken, userKey)),
        onFetchChatRecord: (authToken, chatKey) => dispatch(actions.fetchChatRecordAttempt(authToken, chatKey)),
        onSendMessage: (authToken, chatKey, message) => dispatch(actions.sendMessageAttempt(authToken, chatKey, message)),
        onClearActiveChat: (authToken, userKey) => dispatch(actions.clearActiveChatAttempt(authToken, userKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(messenger));