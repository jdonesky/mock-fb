import React, { Component } from "react";
import { connect } from "react-redux";

import Post from "../../components/Users/Post/Post";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from './Posts.css'
import * as actions from "../../store/actions/index";
import withErrorHandler from '../../hoc/withErrorHandler'
import axios from '../../axios/db-axios-instance'

class Posts extends Component {
  componentDidMount() {
   
    if (this.props.isAuthenticated) {
      this.props.onFetchPosts("posts", this.props.userId);
    } else {
      this.props.onFetchPosts("posts");
    }
  }

  render() {
    let posts = null;
    if (this.props.posts) {
      posts = this.props.posts.map( post => {
        return (
        <Post 
          key={post.key}
          profilePic={post.profilePic}
          status={post.status}
          dateTime={post.dateTime}
        />
        )
      })
    }
    if (this.props.loading) {
      posts = <Spinner />
    }
    return (
      <div className={classes.Posts}>
        {posts}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    isAuthenticated: state.auth.token !== null,
    loading: state.posts.loading,
    error: state.posts.error,
    posts: state.posts.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPosts: (db, userId) =>
      dispatch(actions.fetchPostsAttempt(db, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Posts,axios));
