import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fieldBuilder } from "../../shared/utility";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";

import * as actions from "../../store/actions/index";

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
    authError: null
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

  confirmErrorHandler = () => {
    this.props.onResetError();
  };

  render() {
    let formFields = Object.keys(this.state.formInputs).map((key) => (
      <Input
        key={key}
        value={this.state.formInputs[key].value}
        placeholder={this.state.formInputs[key].elementConfig.placeholder}
        inputType={this.state.formInputs[key].elementConfig.inputType}
        elementType={this.state.formInputs[key].elementType}
        changed={(event) => this.changeHandler(event, key)}
      />
    ));

    let form = <form className={classes.Auth}>{formFields}</form>;

    let onAuthRedirect = this.props.isAuthenticated ? (
      <Redirect to="/" />
    ) : null;

    let errorModal = (
      <Modal show={this.props.error} close={this.confirmErrorHandler}>
        {this.props.error ? this.props.error : null}
      </Modal>
    );

    return (
      <div>
        {onAuthRedirect}
        {errorModal}
        {this.state.isSignup ? form : <div style={{ height: "110px" }}></div>}
        <div className={classes.SwitchMode}>
          <Button
            clicked={(event) => this.authSubmitHandler(event)}
            add="Success"
            // disabled={!this.state.formIsValid}
          >
            {this.state.isSignup ? "Sign-Up" : "Sign-In"}
          </Button>
          <Button clicked={this.switchModeHandler} add="Neutral">
            Or {this.state.isSignup ? "Sign-In" : "Sign-Up"}
          </Button>
        </div>
        {!this.state.isSignup ? form : <div style={{ height: "110px" }}></div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthSubmit: (email, password, isSignup) =>
      dispatch(actions.authAttempt(email, password, isSignup)),
    onResetError: () => dispatch(actions.authResetError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
