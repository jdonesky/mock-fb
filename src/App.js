import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Auth from './containers/Auth/Auth'

import asyncComponent from "./hoc/asyncComponent";

const AsyncUserProfile = asyncComponent(() => {
  return import("./containers/UserProfile/UserProfile");
});
const AsyncPosts = asyncComponent(() => {
  return import("./containers/Posts/Posts");
});
const AsyncFriends = asyncComponent(() => {
  return import("./containers/Friends/Friends");
});

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/user-profile" component={AsyncUserProfile} />
          <Route path="/friends" component={AsyncFriends} />
          <Route path="/activity-feed" component={AsyncPosts} />
          <Route component={Auth} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
