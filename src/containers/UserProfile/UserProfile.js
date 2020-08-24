import React, { Component } from "react";

import ProfilePlaceholder from '../../assets/images/placeholder-profile-pic.png'


class UserProfile extends Component {
  imageUploadHandler = (event) => {};

  render() {
    return (
      <div>
        <div>Profile Pic</div>
        <form>
          <input
            type="file"
            accept="image/*"
            multiple="false"
            onChange={this.imageUploadHandler}
          />
          <div>
            <img src={ProfilePlaceholder} alt="profile pic" />
          </div>
          <input placeholder="name"/>
          <input placeholder="age"/>
          <input placeholder="location"/>
        </form>
      </div>  
    );
  }
}

export default UserProfile;
