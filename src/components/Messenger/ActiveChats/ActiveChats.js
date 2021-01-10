
import React, {useState,useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import classes from './ActiveChats.css';
import * as actions from '../../../store/actions/index';
import Avatar from '../../../assets/images/BookmarkIcons/user';
import Spinner from '../../UI/Spinner/Spinner';
import Label from '../../UI/Label/Label';
import {MessengerContext} from "../../../context/messenger-context";


const activeChats = props => {

   const messengerContext = useContext(MessengerContext);
   const [activeChat, setActiveChat] = useState(null);
   const { storedActiveChat, authToken, firebaseKey, clearingActiveCa} = props;

   useEffect(() => {
      if (clearingActiveChat) {
         props.onFetchActiveChat(authToken, firebaseKey)
      }
   }, [clearingActiveChat])

   useEffect(() => {
      if (authToken && firebaseKey) {
         console.log('FETCHING ACTIVE CHAT (in ActiveChats component)')
         props.onFetchActiveChat(authToken, firebaseKey)
      }
   }, [authToken, firebaseKey])

   useEffect(() => {
      if (storedActiveChat) {
         setActiveChat(storedActiveChat)
      }
   }, [storedActiveChat])

   const restartChat = () => {
      if (!messengerContext.showMessenger) {
         messengerContext.retrieveChat(storedActiveChat.key)
      }
   }

   let activeChatTab;
   let theirProfile;
   if (storedActiveChat && storedActiveChat.parties) {
      theirProfile = storedActiveChat.parties.find(party => party.userKey !== props.firebaseKey)
      activeChatTab = (
          <Label label={theirProfile.name} bottom='55px'>
             <div className={classes.ActiveChatTab} style={{backgroundImage: theirProfile.profileImage ? `url(${theirProfile.profileImage})` : null}} onClick={restartChat}>
               {theirProfile.profileImage ? null : props.fetchingActiveChat || props.clearingActiveChat ? <Spinner /> : <Avatar fill="white" />}
             </div>
          </Label>
      )
   }

   return (
       <div className={classes.Container} style={{display: authToken ? 'flex' : 'none'}}>
          { messengerContext.showMessenger ? null : activeChatTab}
       </div>
   )
}

const mapStateToProps = state => {
   return {
      authToken: state.auth.token,
      firebaseKey: state.profile.firebaseKey,
      storedActiveChat: state.profile.activeChat,
      fetchingActiveChat: state.messenger.fetchingActiveChat,
      clearingActiveChat: state.messenger.clearingActiveChat
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onFetchActiveChat: (authToken, userKey) => dispatch(actions.fetchActiveChatAttempt(authToken, userKey)),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(activeChats);