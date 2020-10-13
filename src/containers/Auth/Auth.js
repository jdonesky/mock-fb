import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fieldBuilder, validityCheck } from "../../shared/utility";
import Input from "../../components/UI/Input/Input";
import Modal from "../../components/UI/Modal/Modal";
import * as actions from "../../store/actions/index";
import classes from "./Auth.css";


const auth = props => {
  const [formInputs, setFormInputs] = useState(
      {
      email: fieldBuilder(
        "input",
        "text",
        "Email",
        "",
        { required: true, isEmail: true },
        false,
        false
      ),
      password: fieldBuilder(
        "input",
        "password",
        "Password",
        "",
        { required: true, minLength: 6 },
        false,
        false
      ),
    })

  const [formIsValid, setFormIsValid] = useState(true);

  const changeHandler = (event, key) => {
    const updatedFormInput = { ...formInputs[key] };
    updatedFormInput.value = event.target.value;
    updatedFormInput.valid = validityCheck(updatedFormInput.value, updatedFormInput.validation )
    updatedFormInput.touched = true
    const updatedInputs = { ...formInputs };
    updatedInputs[key] = updatedFormInput;
    setFormInputs(updatedInputs)

    let formIsValid = true;
    for (let input in formInputs) {
      formIsValid = updatedFormInput.valid && formIsValid
    }
    setFormIsValid(formIsValid)
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuthSubmit(
        formInputs.email.value,
        formInputs.password.value,
        false
    );
  };

  const switchModeHandler = () => {
    props.history.push('/sign-up')
  };

  const confirmErrorHandler = () => {
    if (props.error) {
      props.onResetError();
    }
  };


  let formFields = Object.keys(formInputs).map((key) => (
    <Input
      key={key}
      elementType={formInputs[key].elementType}
      type={formInputs[key].elementConfig.type}
      placeholder={formInputs[key].elementConfig.placeholder}
      value={formInputs[key].value}
      touched={formInputs[key].touched}
      changed={(event) => changeHandler(event, key)}
      invalid={!formInputs[key].valid}
    />
  ));

  let authRedirect = props.isAuthenticated ? (
    <Redirect to="/" />
  ) : null;

  const errorModal = (
    <Modal show={props.error} close={confirmErrorHandler}>
      {props.error ? props.error : null}
    </Modal>
  );

  return (
      <React.Fragment>
        {authRedirect}
        {errorModal}
        <form className={classes.Form} onSubmit={authSubmitHandler}>
          {formFields}
          <button className={classes.LoginButton} type="submit" /*disabled={formIsValid} */>Log In</button>
          <div className={classes.Break}/>
          <button className={classes.SignUpButton} type="button" onClick={switchModeHandler}>Create New Account</button>
        </form>
      </React.Fragment>
  );

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

export default connect(mapStateToProps, mapDispatchToProps)(auth);
