import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { fieldBuilder } from "../../shared/utility";
import { authAttempt, autoLogin } from "../../store/actions/index";

import classes from "./Auth.css";

class Auth extends Component {
  state = {
    formInputs: {
      email: fieldBuilder(
        "input",
        "text",
        "email",
        "",
        { required: true },
        false,
        false
      ),
      password: fieldBuilder(
        "input",
        "text",
        "password",
        "",
        { required: true },
        false,
        false
      ),
    },
    isSignup: false,
    formIsValid: false,
  };

  changeHandler = (event, key) => {
    const updatedFormInput = { ...this.state.formInputs[key] };
    updatedFormInput.value = event.target.value;
    const updatedInputs = { ...this.state.formInputs };
    updatedInputs[key] = updatedFormInput;
    this.setState({
      formInputs: updatedInputs,
    });
  };

  authSubmitHandler = (event) => {
    event.preventDefault();
    const authData = {
      email: this.state.formInputs.email.value,
      password: this.state.formInputs.password.value,
      isSignup: this.state.isSignup,
    };
    this.props.onAuthSubmit(
      authData.email,
      authData.password,
      authData.isSignup
    );
  };

  switchModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  render() {
    let formFields = Object.keys(this.state.formInputs).map((key) => (
      <Input
        key={key}
        value={this.state.formInputs[key].value}
        placeholder={this.state.formInputs[key].elementConfig.placeholder}
        elementType={this.state.formInputs[key].elementType}
        changed={(event) => this.changeHandler(event, key)}
      />
    ));

    let form = <form className={classes.Auth}>{formFields}</form>;

    return (
      <div>
        {this.state.isSignup ? form : <div style={{ height: "140px" }}></div>}
        <div className={classes.SwitchMode}>
          <Button
            clicked={(event) => this.authSubmitHandler(event)}
            add="Success"
            disabled={!this.state.formIsValid}
          >
            {this.state.isSignup ? "Sign-Up" : "Sign-In"}
          </Button>
          <Button clicked={this.switchModeHandler} add="Neutral">
            (Switch to {this.state.isSignup ? "Sign-In)" : "Sign-Up)"}
          </Button>
        </div>
        {!this.state.isSignup ? form : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthSubmit: (email, password, isSignup) =>
      dispatch(authAttempt(email, password, isSignup)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
