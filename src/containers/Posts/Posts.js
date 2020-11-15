import React, { Component } from "react";
import { connect } from "react-redux";

import Post from "../../components/Users/Post/Post";
import FoldingSquare from "../../components/UI/Spinner/SquareFold";

import classes from './Posts.css'
import * as actions from "../../store/actions/index";
import withErrorHandler from '../../hoc/withErrorHandler'
import axios from '../../axios/db-axios-instance'

const posts = () => {
  // componentDidMount() {
  //
  //   if (this.props.isAuthenticated) {
  //     this.props.onFetchPosts("posts", this.props.userId);
  //   } else {
  //     this.props.onFetchPosts("posts");
  //   }
  // }
    return (<div>PLACEHOLDER</div>)
  // render() {
  //   let posts = null;
  //   if (this.props.posts) {
  //     posts = this.props.posts.map( post => {
  //       return (
  //       <Post
  //         key={post.key}
  //         profilePic={post.profilePic}
  //         status={post.status}
  //         dateTime={post.dateTime}
  //       />
  //       )
  //     })
  //   }
  //   if (this.props.loading) {
  //     posts = <FoldingSquare />
  //   }
  //   return (
  //     <div className={classes.Posts}>
  //       {posts}
  //     </div>
  //   );
  // }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    postsKey: state.profile.postsKey,
    isAuthenticated: state.auth.token !== null,
    loadingNewPost: state.posts.loadingNewPost,
    loadingSelfPosts: state.posts.loadingSelfPosts,
    error: state.posts.error,
    posts: state.posts.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPosts: (db, userId) =>
      dispatch(actions.fetchSelfPostsAttempt(db, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(posts,axios));
