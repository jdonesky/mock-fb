import React, { useEffect} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";

const Logout = (props) => {

  useEffect(() => {
    props.onLogout();
    props.onClearProfile();
    props.onClearUsers();
    props.onClearPhotos();
    props.onClearPosts();
    props.onClearFriends();
    props.onClearLocalChatRecord();
    props.onClearLocalActiveChat();
  }, [])

  return <Redirect to="/authentication" />;

}


const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.authLogout()),
    onClearProfile: () => dispatch(actions.clearProfile()),
    onClearUsers: () => dispatch(actions.clearUsers()),
    onClearPhotos: () => dispatch(actions.clearPhotos()),
    onClearPosts: () => dispatch(actions.clearPosts()),
    onClearFriends: () => dispatch(actions.clearFriends()),
    onClearLocalChatRecord: () => dispatch(actions.clearLocalChatRecord()),
    onClearLocalActiveChat: () => dispatch(actions.clearLocalActiveChat())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
