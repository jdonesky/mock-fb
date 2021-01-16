
import React, {useState, useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './ContactsSidedrawer.css';
import Contact from './Contact/Contact';
import {MessengerContext} from "../../context/messenger-context";

const contactsSidedrawer = props => {

    const messengerContext = useContext(MessengerContext)
    const { authToken, myPublicProfile, online, onFetchPublicProfile } = props;
    const [ usersOnline, setUsersOnline ] = useState(null);

    useEffect(() => {
        if (online) {
            setUsersOnline(online.map(obj => {
                let key = Object.keys(obj)[0]
                if (obj[key]) {
                    return key;
                }
            }))
        }
    }, [online])

    const openChat = (theirProfile, theirType, myType) => {
        messengerContext.startChat(theirProfile, theirType, myType)
    }

    let myContacts;
    if (myPublicProfile && myPublicProfile.friends) {
        myContacts = myPublicProfile.friends.map(friend => (
            <Contact
                key={friend.userKey}
                name={friend.name}
                userKey={friend.userKey}
                publicProfileKey={friend.publicProfileKey}
                userId={friend.userId}
                profileImage={friend.profileImage}
                online={usersOnline}
                authToken={authToken}
                fetchContactProfile={onFetchPublicProfile}
                beginChat={openChat}
            />
        ))
    }

    return (
        <div className={classes.Container}>
            {myContacts}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        myPublicProfile: state.profile.publicProfile,
        online: state.friends.online
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPublicProfile: (authToken, key, type, cb) => dispatch(actions.fetchPublicProfileAttempt(authToken, key, type, cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(contactsSidedrawer);