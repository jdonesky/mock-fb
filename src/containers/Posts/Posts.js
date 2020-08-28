import React, { Component } from "react";
import Post from "../../components/Users/Post/Post";

class Posts extends Component {
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
