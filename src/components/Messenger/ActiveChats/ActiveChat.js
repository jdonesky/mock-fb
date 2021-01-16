
import React, {useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import classes from './ActiveChat.css';
import * as actions from '../../../store/actions/index';
import Avatar from '../../../assets/images/BookmarkIcons/user';
import Spinner from '../../UI/Spinner/Spinner';
import Label from '../../UI/Label/Label';
import {MessengerContext} from "../../../context/messenger-context";


const activeChat = props => {

   const messengerContext = useContext(MessengerContext);
   const {localActiveChat, retrieveChat, showMessenger, showActiveChat} = messengerContext
   const {authToken, activeChat} = props

   const restartChat = () => {
      if (!showMessenger && localActiveChat) {
         if (localActiveChat.key) {
            retrieveChat(localActiveChat.key)
         } else {
            return;
         }
      }
   }


   let activeChatTab;
   let theirProfile;
   if (localActiveChat && localActiveChat.parties && showActiveChat) {
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
      startingChat: state.profile.startingChat,
      restartingChat: state.profile.restartingChat
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onFetchActiveChat: (authToken, userKey) => dispatch(actions.fetchActiveChatAttempt(authToken, userKey)),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(activeChat);