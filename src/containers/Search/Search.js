import React, { Component } from "react";
import { connect } from "react-redux";
import Users from "../../components/Users/Users";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import * as actions from "../../store/actions/index";
import { fieldBuilder } from "../../shared/utility";

class Search extends Component {
  state = {
    searchUserName: fieldBuilder(
      "input",
      "text",
      "search for users by name",
      "",
      { required: true },
      false,
      false
    ),
    users: [],
  };
  componentDidMount() {
    this.props.onFetchUsers(this.props.authToken);
    this.setState({
      users: this.props.users,
    });
  }

  //   componentDidUpdate(prevProps) {
  //     //  deep comparison of array of objects, this.props.users
  //     //  with prevProps.users
  //     // before setting state if something has changed 
//       // or just compare length? 
  //   }


  componentWillUnmount() {
    //   memory leak?
    // how to cancel connection to redux actions when unmounting ?
    console.log('Search component Unmounting, clearing local state')
    this.setState({
      searchUserName: "",
      users: [],
    });
  }

  filterUsers = (rePattern, arr) => {
    return arr.filter((obj) => obj.name.match(rePattern))
  };

  searchChangeHandler = (event) => {
    let searched = this.state.searchUserName.value;
    searched = event.target.value;
    const users = [...this.state.users]
    const filteredUsers = this.filterUsers(searched,users)
    console.log(filteredUsers)
    this.setState({
      searchUserName: {
        ...this.state.searchUserName,
        value: searched,
      },
      users: filteredUsers
    });
  };

  friendRequestHandler = (firebaseKey, userId) => {

  }

  render() {
    let users = null;
    if (this.state.users.length) {
      users = (
        <div>
          <Input
            value={this.state.searchUserName.value}
            changed={(event) => this.searchChangeHandler(event)}
            elementType={this.state.searchUserName.elementType}
            placeholder={this.state.searchUserName.elementConfig.placeholder}
          />
          <Users clicked={this.friendRequestHandler} users={this.state.users} />
        </div>
      );
    }
    if (this.state.usersLoading) {
      users = <Spinner />;
    }
    return <div>{users}</div>;
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
