
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
   const { storedActiveChat, authToken } = props;

   useEffect(() => {
      if (authToken) {
         props.onFetchActiveChat(authToken)
      }
   }, [authToken])

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
   if (storedActiveChat) {
      theirProfile = storedActiveChat.parties.find(party => party.userKey !== props.firebaseKey)
      activeChatTab = (
          <Label label={theirProfile.name}>
             <div className={classes.ActiveChatTab} style={{backgroundImage: theirProfile.profileImage ? `url(${theirProfile.profileImage})` : null}} onClick={restartChat}>
               {theirProfile.profileImage ? null : props.fetchingActiveChat ? <Spinner /> : <Avatar fill="white" />}
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