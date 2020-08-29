import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/profile";
import ProfilePlaceholder from "../../assets/images/placeholder-profile-pic.png";
import { fieldBuilder } from "../../shared/utility";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
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
      loading: false,
    };
    this.imageUploader = createRef();
  }

  componentDidMount() {
    this.setState({
      uploadedImage: this.props.profileImage,
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

  profileFormChangeHandler = (event, label) => {
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
    this.setState({
      loading: true,
    });
    event.preventDefault();
    const formData = {
      name: this.state.formInputs.name.value,
      age: this.state.formInputs.age.value,
      location: this.state.formInputs.location.value,
      uploadedImage: this.state.uploadedImage,
    };
    this.props.onProfileSubmit(formData);
    setTimeout(() => {
      this.setState({});
    }, 2000);
  };

  statusUpdateHandler = (event) => {
    let status = this.state.status;
    status = event.target.value;
    this.setState({
      status: status,
    });
  };

  statusSubmitHandler = () => {};

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
          // label={formField.label}
          elementType={formField.config.elementType}
          placeholder={formField.config.elementConfig.placeholder}
          value={formField.config.value}
          changed={(event) =>
            this.profileFormChangeHandler(event, formField.label)
          }
        />
      );
    });
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
            {/* <label>Status</label> */}
            <Input
              elementType="input"
              value={this.state.status}
              placeholder="status"
              changed={(event) => this.statusUpdateHandler(event)}
            />
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
    profileImage: state.profile.profileImage,
    name: state.profile.name,
    age: state.profile.age,
    location: state.profile.location,
    status: state.profile.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileSubmit: (formData) => dispatch(actions.storeProfileData(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
