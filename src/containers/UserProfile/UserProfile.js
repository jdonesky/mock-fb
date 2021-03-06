import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { fieldBuilder } from "../../shared/utility";
import * as actions from "../../store/actions/index";
import ProfilePlaceholder from "../../assets/images/placeholder-profile-pic.png";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
import axios from '../../axios/db-axios-instance'

import classes from "./UserProfile.css";


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInputs: {
        name: fieldBuilder(
          "input",
          "text",
          "name",
          "",
          { required: true },
          false,
          false
        ),
        age: fieldBuilder("input", "text", "age", "", false, false),
        location: fieldBuilder(
          "input",
          "text",
          "location",
          "",
          { required: true },
          false,
          false
        ),
      },
      uploadedImage: null,
      status: "",
    };
    this.imageUploader = createRef();
  }

  componentDidMount() {
    this.props.onFetchProfile(this.props.userId, this.props.authToken);
    // console.log('[userProfile] - componentDidMount', this.props.name)
    if (this.props.fetched) {
      this.setState({
        uploadedImage: this.props.profileImage,
        status: this.props.status,
        formInputs: {
          ...this.state.formInputs,
          name: {
            ...this.state.formInputs.name,
            value: this.props.name,
          },
          age: {
            ...this.state.formInputs.age,
            value: this.props.age,
          },
          location: {
            ...this.state.formInputs.location,
            value: this.props.location,
          },
        },
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('[userProfile] - componentDidUpdate', prevProps, prevState)
    if (
      this.props.name !== prevProps.name ||
      this.props.age !== prevProps.age ||
      this.props.location !== prevProps.location ||
      this.props.profileImage !== prevProps.profileImage
    ) {
      this.setState({
        uploadedImage: this.props.profileImage,
        status: this.props.status,
        formInputs: {
          ...this.state.formInputs,
          name: {
            ...this.state.formInputs.name,
            value: this.props.name,
          },
          age: {
            ...this.state.formInputs.age,
            value: this.props.age,
          },
          location: {
            ...this.state.formInputs.location,
            value: this.props.location,
          },
        },
      });
    }
  }

  profileChangeHandler = (event, label) => {
    const targetInput = { ...this.state.formInputs[label] };
    targetInput.value = event.target.value;
    this.setState({
      formInputs: {
        ...this.state.formInputs,
        [label]: targetInput,
      },
    });
  };

  imageUploadHandler = (event) => {
    const [file] = event.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.setState({
          uploadedImage: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  submitProfileHandler = (event) => {
    event.preventDefault();
    const userProfile = {
      userId: this.props.userId,
      key: this.props.key,
      name: this.state.formInputs.name.value,
      age: this.state.formInputs.age.value,
      location: this.state.formInputs.location.value,
      uploadedImage: this.state.uploadedImage,
    };
    this.props.onProfileSubmit(userProfile, this.props.authToken);
  };

  statusChangeHandler = (event) => {
    let status = this.state.status;
    status = event.target.value;
    this.setState({
      status: status,
    });
  };

  statusSubmitHandler = (event) => {
    event.preventDefault();
    const statusInfo = {
      status: this.state.status,
      userId: this.props.userId,
      profilePic: this.props.profileImage,
      dateTime: new Date(),
    };
    this.props.onStatusUpdate(this.props.authToken, statusInfo);
  };

  render() {
    let formArray = Object.keys(this.state.formInputs).map((key) => {
      return {
        label: key,
        key: key,
        config: this.state.formInputs[key],
      };
    });
    let form = formArray.map((formField) => {
      return (
        <Input
          key={formField.label}
          elementType={formField.config.elementType}
          placeholder={formField.config.elementConfig.placeholder}
          value={formField.config.value}
          changed={(event) => this.profileChangeHandler(event, formField.label)}
        />
      );
    });
    if (this.props.profileLoading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ProfileContainer}>
        <div
          onClick={() => this.imageUploader.current.click()}
          className={classes.ProfilePicContainer}
        >
          <img
            className={classes.ProfileImg}
            src={this.state.uploadedImage || ProfilePlaceholder}
            alt="profile pic"
          />
          <input
            ref={this.imageUploader}
            type="file"
            accept="image/*"
            multiple={false}
            onChange={this.imageUploadHandler}
            style={{
              display: "none",
            }}
          />
          <Button add="Success">Upload Picture</Button>
        </div>
        <form
          className={classes.FormContainer}
          onSubmit={this.submitProfileHandler}
        >
          {form}
          <Button clicked={this.submitProfileHandler} add="Success">
            Save
          </Button>
        </form>

        <div className={classes.StatusForm}>
          <form>
            {this.props.statusLoading ? (
              <Spinner />
            ) : (
              <Input
                elementType="input"
                value={this.state.status}
                placeholder="status"
                changed={(event) => this.statusChangeHandler(event)}
              />
            )}
            <Button add="Success" clicked={this.statusSubmitHandler}>
              Update
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    authToken: state.auth.token,
    key: state.profile.firebaseKey,
    profileImage: state.profile.profileImage,
    name: state.profile.name,
    age: state.profile.age,
    location: state.profile.location,
    status: state.profile.status,
    fetched: state.profile.fetched,
    profileLoading: state.profile.profileLoading,
    statusLoading: state.profile.statusLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileSubmit: (userProfile, authToken) =>
      dispatch(actions.storeProfileAttempt(userProfile, authToken)),
    onFetchProfile: (userId, authToken) =>
      dispatch(actions.fetchProfileAttempt(userId, authToken)),
    onStatusUpdate: (authToken, statusInfo) =>
      dispatch(actions.statusUpdateAttempt(authToken, statusInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UserProfile, axios));
