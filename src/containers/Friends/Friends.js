import React, { Component } from "react";
import {connect} from 'react-redux'
import User from '../../components/Users/User/User'
import Spinner from '../../components/UI/Spinner/Spinner'

import * as actions from '../../store/actions/index'


class Friends extends Component {


  componentDidMount() {
    // this.props.onFetchFriends(this.props.userId, this.props.authToken)
  }


  render() {

    let friends;

    if (this.props.loading) {
      friends = <Spinner />;
    }

    if (this.props.friends) {
        friends = this.props.friends.map(friend => {
          return <User name={friend.name} userImage={friend.uploadedImage} />
        })
    }

    return (
      <div>
        {friends}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    authToken: state.auth.token,
    friends: state.friends.friends,
    loading: state.friends.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // onFetchFriends : (userId, authToken) => dispatch(actions.fetchFriendsAttempt(userId,authToken))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Friends);
