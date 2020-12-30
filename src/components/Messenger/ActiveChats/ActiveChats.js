
import React, {useState,useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import classes from './ActiveChats.css';
import * as actions from '../../../store/actions/index';
import Avatar from '../../../assets/images/BookmarkIcons/user';
import Spinner from '../../UI/Spinner/Spinner';
import {MessengerContext} from "../../../context/messenger-context";

const activeChats = props => {

   const messengerContext = useContext(MessengerContext);
   const [activeChat, setActiveChat] = useState(null);
   const { storedActiveChat, authToken } = props;

   useEffect(() => {
      props.onFetchActiveChat(authToken)
   }, [authToken])

   useEffect(() => {
      if (storedActiveChat) {
         setActiveChat(storedActiveChat)
      }
   }, [storedActiveChat])

   let activeChatTab;
   let theirProfile;
   if (storedActiveChat) {
      theirProfile = storedActiveChat.parties.find(party => party.userKey !== props.firebaseKey)
      activeChatTab = (
          <div className={classes.ActiveChatTab} style={{backgroundImage: theirProfile.profileImage ? `url(${theirProfile.profileImage})` : null}}>
             {theirProfile.profileImage ? null : props.fetchingActiveChat ? <Spinner /> : <Avatar fill="white" />}
          </div>
      )
   }

   return (
       <div className={classes.Container} style={{display: authToken ? 'flex' : 'none'}}>
          {activeChatTab}
       </div>
   )
}

const mapStateToProps = state => {
   return {
      authToken: state.auth.token,
      firebaseKey: state.profile.firebaseKey,
      storedActiveChat: state.messenger.activeChat,
      fetchingActiveChat: state.messenger.fetchingActiveChat,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onFetchActiveChat: (authToken) => dispatch(actions.fetchActiveChatAttempt(authToken))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(activeChats);