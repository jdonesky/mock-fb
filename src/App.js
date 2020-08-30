import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import * as actions from './store/actions/index'

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

const AsyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  
  componentDidMount() {
    this.props.onReloadApp()
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/authentication" component={AsyncAuth} />
          <Route path="/user-profile" component={AsyncUserProfile} />
          <Route path="/friends" component={AsyncFriends} />
          <Route path="/activity-feed" component={AsyncPosts} />
          {/* <Route component={Auth} /> */}
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onReloadApp: () => dispatch(actions.autoSignIn())
  }
}

export default connect(null,mapDispatchToProps)(App);
