import React, { Component } from "react";
import { connect } from 'react-redux'

import Post from "../../components/Users/Post/Post";
import * as actions from "../../store/actions/index";

class Posts extends Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <ul>
          <Post />
          <Post />
          <Post />
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    authToken: state.auth.token,
    loading: state.posts.loading,
    error: state.posts.error,
    posts: state.posts.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPosts: () => dispatch(actions.fetchPostsAttempt())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Posts);
