import React from "react";
import User from "./User/User";

const users = React.memo(({loadedUsers}) =>  loadedUsers ?
        loadedUsers.map((user) => {
            return <User key={user.key} name={user.name} userImage={user.uploadedImage} />;
        }) : "no user found"
)
export default users;
