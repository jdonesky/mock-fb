import React from "react";
import User from "./User/User";

const users = (props) => props.users.map((user) => <User />);

export default users;
