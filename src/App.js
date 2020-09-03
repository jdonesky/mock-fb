import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import * as actions from "./store/actions/index";

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

const AsyncSearch = asyncComponent(() => {
  return import ("./containers/Search/Search")
})

const AsyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});
const AsyncLogout = asyncComponent(() => {
  return import("./containers/Logout/Logout");
});

class App extends Component {
  componentDidMount() {
    this.props.onReloadApp();
  }

  render() {
    const defaultRoutes = (
      <Switch>
        <Route path="/authentication" component={AsyncAuth} />
        <Route path="/" component={AsyncPosts} />
        <Route component={AsyncAuth} />
      </Switch>
    );

    const authenticatedRoutes = (
      <Switch>
        <Route path="/authentication" component={AsyncAuth} />
        <Route path="/user-profile" component={AsyncUserProfile} />
        <Route path="/friends" component={AsyncFriends} />
        <Route path="/logout" component={AsyncLogout} />
        <Route path="/search-users" component={AsyncSearch}/>
        <Route component={AsyncPosts} />
      </Switch>
    );

    return (
      <Layout>
        {this.props.isAuthenticated ? authenticatedRoutes : defaultRoutes}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReloadApp: () => dispatch(actions.autoSignIn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
