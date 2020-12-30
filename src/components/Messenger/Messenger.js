
import React, {useState, useEffect, useContext, useRef} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './Messenger.css';
import {MessengerContext} from "../../context/messenger-context";

import Close from '../../assets/images/MessengerIcons/close';
import Minimize from '../../assets/images/MessengerIcons/minimize';
import Avatar from '../../assets/images/BookmarkIcons/user';
import Photo from '../../assets/images/polaroid';
import Gif from '../../assets/images/MessengerIcons/gif';
import Like from '../../assets/images/like';
import Spinner from '../UI/Spinner/Spinner';

const messenger = (props) => {

    const messengerContext = useContext(MessengerContext);
    const messageBar = useRef(null);
    const [focusing, setFocusing] = useState(false);

    const [theirProfile, setTheirProfile] = useState(null);
    const {activeChat} = props

    useEffect(() => {
        messageBar.current.focus();
    }, [])

    useEffect(() => {
        if (activeChat) {
            setTheirProfile(activeChat.parties.find(party => party.userKey !== props.firebaseKey))
        }
    }, [activeChat])

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
                    <div className={[classes.Control, classes.Minimize].join(" ")}><Minimize fill={iconsFill}/></div>
                    <div className={[classes.Control, classes.Close].join(" ")} onClick={() => messengerContext.closeMessenger()}><Close fill={iconsFill}/></div>
                </div>
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
        startingChat: state.messenger.startingChat,
        restartingChat: state.messenger.restartingChat,
        activeChat: state.messenger.activeChat,
        firebaseKey: state.profile.firebaseKey,
    }
}

export default connect(mapStateToProps)(withRouter(messenger));