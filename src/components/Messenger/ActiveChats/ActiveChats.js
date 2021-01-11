
import React, {useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import classes from './ActiveChats.css';
import * as actions from '../../../store/actions/index';
import Avatar from '../../../assets/images/BookmarkIcons/user';
import Spinner from '../../UI/Spinner/Spinner';
import Label from '../../UI/Label/Label';
import {MessengerContext} from "../../../context/messenger-context";


const activeChats = props => {

   const messengerContext = useContext(MessengerContext);
   const {fetchActiveChat, localActiveChat, retrieveChat, showMessenger, showActiveChat} = messengerContext
   const {activeChat} = props

   useEffect(() => {
      console.log('In ActiveChat tab component')
      console.log('localActiveChat', localActiveChat);
      console.log('VS');
      console.log('activeChat', activeChat);
   })

   useEffect(() => {
         console.log('FETCHING ACTIVE CHAT (in ActiveChats component)')
         fetchActiveChat()
   }, [])

   const restartChat = () => {
      if (!showMessenger && activeChat) {
         console.log('restarting chat')
         console.log('activeChat', activeChat)
         retrieveChat(activeChat.key)
      } else {
         return;
      }
   }

   let activeChatTab;
   let theirProfile;
   if (localActiveChat && localActiveChat.parties && showActiveChat && !showMessenger) {
      theirProfile = localActiveChat.parties.find(party => party.userKey !== props.firebaseKey)
      activeChatTab = (
          <Label label={theirProfile.name} bottom='55px'>
             <div className={classes.ActiveChatTab} style={{backgroundImage: theirProfile.profileImage ? `url(${theirProfile.profileImage})` : null}}
                  onClick={restartChat}
             >
               {theirProfile.profileImage ? null : props.fetchingActiveChat || props.clearingActiveChat ? <Spinner /> : <Avatar fill="white" />}
             </div>
          </Label>
      )
   }



   return (
       <div className={classes.Container} style={{display: props.authToken ? 'flex' : 'none'}}>
          { activeChatTab }
       </div>
   )
}

const mapStateToProps = state => {
   return {
      authToken: state.auth.token,
      firebaseKey: state.profile.firebaseKey,
      activeChat: state.profile.activeChat,
      fetchingActiveChat: state.profile.fetchingActiveChat,
      clearingActiveChat: state.profile.clearingActiveChat,
      startingChat: state.messenger.startingChat,
      restartingChat: state.messenger.restartingChat
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onFetchActiveChat: (authToken, userKey) => dispatch(actions.fetchActiveChatAttempt(authToken, userKey)),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(activeChats);