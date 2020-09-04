import React, { Component } from "react";
import { connect } from "react-redux";
import Users from "../../components/Users/Users";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

class Search extends Component {
  state = {
    users: [],
  };
  componentDidMount() {
    this.props.onFetchUsers(this.props.authToken);
    this.setState({
      users: this.props.users,
    });
  }

  componentDidUpdate(prevProps) {
    //  perform a deep comparison of users array of objects
    // before setting state if something has changed in users prop?
  }

  render() {
    let users = null;
    if (this.state.users.length) {
      users = <Users users={this.state.users} />;
    }
    if (this.state.usersLoading) {
      users = <Spinner />;
    }
    return (
      <div>
        <div>Search Bar</div>
        {users}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authToken: state.auth.token,
    users: state.users.users,
    usersLoading: state.users.usersLoading,
    requestLoading: state.users.requestLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsers: (authToken) => dispatch(actions.fetchUsersAttempt(authToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
