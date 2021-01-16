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
    props.onClearMessenger();
    props.onClearPages();
    props.onClearActivity();
    props.onClearSearch();
  }, [])

  return <Redirect to="/authentication" />;

}


const mapStateToProps = state => {
  return {
    activeChat: state.profile.activeChat
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.authLogout()),
    onClearProfile: () => dispatch(actions.logoutClearProfile()),
    onClearUsers: () => dispatch(actions.logoutClearUsers()),
    onClearPhotos: () => dispatch(actions.logoutClearPhotos()),
    onClearPosts: () => dispatch(actions.logoutClearPosts()),
    onClearFriends: () => dispatch(actions.logoutClearFriends()),
    onClearMessenger: () => dispatch(actions.logoutClearMessenger()),
    onClearPages: () => dispatch(actions.logoutClearPosts()),
    onClearActivity: () => dispatch(actions.logoutClearActivity()),
    onClearSearch: () => dispatch(actions.logoutClearSearch()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
