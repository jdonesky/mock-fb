
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

import Spinner from '../UI/Spinner/Spinner';
import Label from '../UI/Label/Label';
import InlineDots from '../UI/Spinner/InlineDots';
import Message from './Message/Message'


const messenger = (props) => {

    const messengerContext = useContext(MessengerContext);
    const messageBar = useRef(null);
    const [focusing, setFocusing] = useState(true);
    const [theirProfile, setTheirProfile] = useState(null);
    // const [chatRecord, setChatRecord] = useState(null);
    const {activeChat, chatRecord} = props

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
            console.log(chatRecord);
        }
    }, [chatRecord])

    const goToTheirProfile = () => {
        if (theirProfile) {
            if (props.history.location.pathname !== `/user-profile/${theirProfile.userKey}`) {
                props.history.push(`/user-profile/${theirProfile.userKey}`)
            }
        }
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
    } else {
        if (chatRecord && chatRecord.messages) {
            messages = chatRecord.messages.map(msg => (
                <Message />
            ))
        }
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
                    <Label label="Minimize chat" bottom='40px' left="-35px" width="100px">
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
                <div className={classes.AddMediaButton}><Photo fill={iconsFill}/></div>
                <div className={classes.AddMediaButton}><Gif fill={iconsFill}/></div>
                <div className={classes.MessageBarContainer}>
                    <input className={classes.MessageBar} placeholder="Aa" ref={messageBar} onFocus={() => setFocusing(true)} onBlur={() => setFocusing(false)}/>
                </div>
                <div className={classes.LikeButton}><Like fill={iconsFill}/></div>
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
        activeChat: state.messenger.activeChat,
        chatRecord: state.messenger.chatRecord,
        firebaseKey: state.profile.firebaseKey,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchChatRecord: (authToken, chatKey) => dispatch(actions.fetchChatRecordAttempt(authToken, chatKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(messenger));