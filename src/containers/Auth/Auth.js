import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fieldBuilder, validityCheck } from "../../shared/utility";
import Input from "../../components/UI/Input/Input";
import SignUp from './SignUp';
import Modal from "../../components/UI/Modal/Modal";
import * as actions from "../../store/actions/index";
import classes from "./Auth.css";
import Spinner from "../../components/UI/Spinner/Spinner";


const auth = props => {

  const [signingUp, setSigningUp] = useState(false);

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
    setSigningUp(true);
  };

  const confirmErrorHandler = () => {
    if (props.error) {
      props.onResetError();
    }
  };

  let formFields = Object.keys(formInputs).map((key) => {
    if (key === 'password') {
      return (
          <Input
              key={key}
              autocomplete="current-password"
              elementType={formInputs[key].elementType}
              type={formInputs[key].elementConfig.type}
              placeholder={formInputs[key].elementConfig.placeholder}
              value={formInputs[key].value}
              touched={formInputs[key].touched}
              changed={(event) => changeHandler(event, key)}
              invalid={!formInputs[key].valid}
              // className={classes.Input}
          />
      )
    } else {
      return (
          <Input
          key={key}
          elementType={formInputs[key].elementType}
          type={formInputs[key].elementConfig.type}
          placeholder={formInputs[key].elementConfig.placeholder}
          value={formInputs[key].value}
          touched={formInputs[key].touched}
          changed={(event) => changeHandler(event, key)}
          invalid={!formInputs[key].valid}
          // classname={classes.Input}
      />)
    }
  });

  const cancelSignup = () => setSigningUp(false);

  const signUpModal = (
        <Modal show={signingUp ? 1 : 0} close={cancelSignup} addClass={classes.SignUpModal}>
          <SignUp />
        </Modal>
  )


  let authRedirect = props.isAuthenticated ? (
      <Redirect to="/user-profile/me" />
  ) : null;

  let errorMessage;
  if (props.error) {
    switch(props.error) {
      case 'INVALID_EMAIL':
        errorMessage = 'Please enter a valid email address'
        break
      case 'INVALID_PASSWORD':
        errorMessage = 'Looks like that password is incorrect.'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "No account found. Sign up or enter another email address"
        break;
      case 'MISSING_PASSWORD':
        errorMessage = 'Please enter your password'
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'Looks like an account already exists with that email address'
        break;
      case 'WEAK_PASSWORD':
        errorMessage = 'Please use a password with at least 6 characters'
        break;
      default:
        errorMessage = 'There was an error on our side. Please reload and try again'
    }
  }

  const errorModal = (
    <Modal show={props.error} close={confirmErrorHandler} type="error">
        {props.error ? <span>{errorMessage}</span> : null}
    </Modal>
  );

  return (
      <div className={classes.AuthPage}>
        {authRedirect}
        {signUpModal}
        {errorModal}
        <div className={classes.AuthContainer}>
          <div className={classes.TextContainer}>
            <div className={classes.Title}><b>dumb facebook</b></div>
            <div className={classes.SubTitle}>connect with your dumb friends and the world around you on the dumb facebook</div>
          </div>
          <form className={classes.Form} onSubmit={authSubmitHandler}>
            {formFields}
            <button className={classes.LoginButton} type="submit" >{props.loading ? <Spinner bottom="47px" />  : 'Log In'}</button>
            <div className={classes.Break}/>
            <button className={classes.SignUpButton} type="button" onClick={switchModeHandler}>Create New Account</button>
          </form>
        </div>
      </div>
  );

}

const mapStateToProps = (state) => {
  return {
    authToken: state.auth.token,
    userId: state.auth.userId,
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
    loading: state.auth.loading
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
