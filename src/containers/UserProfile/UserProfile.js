import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/profile";
import ProfilePlaceholder from "../../assets/images/placeholder-profile-pic.png";
import classes from "./UserProfile.css";

class UserProfile extends Component {
  state = {
    uploadedImage: null,
  };

  componentDidMount() {
    console.log("[UserProfile] componentDidMount");

    this.setState({
      uploadedImage: this.props.profileImage,
    });
  }

  imageUploadHandler = (event) => {
    const [file] = event.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // this.setState({
        //   uploadedImage: event.target.result,
        // });
        this.props.onUploadProfileImage(event.target.result);
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

const mapStateToProps = (state) => {
  return {
    profileImage: state.profile.profileImage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadProfileImage: (fileUpload) =>
      dispatch(actions.storeProfilePic(fileUpload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
