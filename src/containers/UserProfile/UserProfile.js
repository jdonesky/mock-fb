import React, { Component, createRef } from "react";
import ProfilePlaceholder from "../../assets/images/placeholder-profile-pic.png";
import classes from "./UserProfile.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImage: null,
    };
    // this.uploadedImageRef = createRef();
  }

  imageUploadHandler = (event) => {
    const [file] = event.target.files;
    if (file) {
      const reader = new FileReader();
      // const { current } = this.uploadedImageRef;
      // current.file = file;
  
      reader.onload = (event) => {
        // current.src = event.target.result;
        this.setState({
          uploadedImage: event.target.result
        })
      };

      reader.readAsDataURL(file);
    }
  };

  render() {
    return (
      <div>
        <div>Profile Pic</div>
        <form>
          <input
            type="file"
            accept="image/*"
            multiple={false}
            onChange={this.imageUploadHandler}
          />
          <div className={classes.ProfilePic}>
            <img
              // ref={this.uploadedImageRef}
              src={this.state.uploadedImage || ProfilePlaceholder}
              alt="profile pic"
            />
          </div>
          <input placeholder="name" />
          <input placeholder="age" />
          <input placeholder="location" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profileImage: state.profile.profileImage
  }
}

export default UserProfile;
