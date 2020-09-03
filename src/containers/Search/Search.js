import React, { Component } from "react";
import { connect } from "react-redux";
import Users from "../../components/Users/User/User";

class Search extends Component {
  state = {
    users: [],
  };
  componentDidMount() {}

  render() {
    return (
      <div>
        <div>Search Bar</div>
        <div>Users</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      onFetchUsers: () => dispatch()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
