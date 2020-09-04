import React from "react";
import User from "./User/User";

const users = (props) =>
  props.users.map((user) => {
    return <User key={user.dbKey} name={user.name} userImage={user.profileImage} />;
  });

export default users;
