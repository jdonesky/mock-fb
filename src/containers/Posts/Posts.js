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

export default Posts;
