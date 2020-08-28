import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/profile";
import ProfilePlaceholder from "../../assets/images/placeholder-profile-pic.png";
import Input from "../../components/UI/Input/Input";
import classes from "./UserProfile.css";

function fieldBuilder(
  elType,
  inputType,
  placeholder,
  value,
  validation,
  valid,
  touched
) {
  return {
    elementType: elType,
    elementConfig: {
      type: inputType,
      placeholder: placeholder,
    },
    value: value,
    validation: validation,
    valid: valid,
    touched: touched,
  };
}

class UserProfile extends Component {
  state = {
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
      age: fieldBuilder(
        "input",
        "text",
        "age",
        "",
        { required: true },
        false,
        false
      ),
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

  componentDidMount() {
    console.log("[UserProfile] componentDidMount", this.state);

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

  componentDidUpdate() {
    console.log("[UserProfile]", this.state);
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
    event.preventDefault();
    const formData = {
      name: this.state.formInputs.name.value,
      age: this.state.formInputs.age.value,
      location: this.state.formInputs.location.value,
      uploadedImage: this.state.uploadedImage,
    };
    this.props.onProfileSubmit(formData);
  };

  statusUpdateHandler = (event) => {
    let status = this.state.status;
    status = event.target.value;
    this.setState({
      status: status,
    });
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
      <div className={classes.UserProfile}>
        <form onSubmit={this.submitProfileHandler}>
          <div className={classes.ProfilePic}>
            <img
              src={this.state.uploadedImage || ProfilePlaceholder}
              alt="profile pic"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            multiple={false}
            onChange={this.imageUploadHandler}
          />
          {form}
          <button type="submit">SAVE PROFILE CHANGES</button>
        </form>
        <div className={classes.Status}>
          <form>
            {/* <label>Status</label> */}
            <Input
              elementType="input"
              value={this.state.status}
              placeholder="status"
              changed={(event) => this.statusUpdateHandler(event)}
            />
            <button>UPDATE STATUS</button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileSubmit: (formData) => dispatch(actions.storeProfileData(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
