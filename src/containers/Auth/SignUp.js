import React, {useState} from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { fieldBuilder, validityCheck } from "../../shared/utility";
import Input from '../../components/UI/Input/Input'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import Modal from "../../components/UI/Modal/Modal";

const signUp = props => {



  const [formInputs, setFormInputs] = useState(
      {
        firstName: fieldBuilder(
            "input",
            "text",
            "First name",
            "",
            {required: true},
            false,
            false
        ),
        lastName: fieldBuilder(
            "input",
            "text",
            "Last name",
            "",
            {required: true},
            false,
            false
        ),
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
        birthday: fieldBuilder(
            "input",
            "date",
            'Birthday',
            "",
            {required: true},
            false,
            false
        )
      })

  const [formIsValid, setFormIsValid] = useState(false);

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

  const createAccountHandler = (event) => {
      event.preventDefault()
      props.onSignUp(
          formInputs.email.value,
          formInputs.password.value,
          true,
          {firstName: formInputs.firstName.value,
           lastName: formInputs.lastName.value,
           birthday: formInputs.birthday.value}
          )
  }

  const confirmErrorHandler = () => {
      props.onResetError();
  }

  const formFields = Object.keys(formInputs).map(key => (
      <Input
          key={key}
          elementType={formInputs[key].elementType}
          value={formInputs[key].value}
          type={formInputs[key].elementConfig.type}
          placeholder={formInputs[key].elementConfig.placeholder}
          valid={formInputs[key].valid}
          touched={formInputs[key].touched}
          changed={(event) => changeHandler(event, key)}
      />
      )
  )
  const authRedirect = props.token !== null ? <Redirect to="/user-profile" /> : null
  const errorModal = (
        <Modal show={props.error} close={confirmErrorHandler}>
            {props.error ? props.error : null}
        </Modal>
  );

  return (
      <React.Fragment>
          {authRedirect}
          {errorModal}
          <form className={classes.Form} onSubmit={(event) => createAccountHandler(event)}>
              <h1>Sign Up</h1>
              <p>It's quick and easy.</p>
              <div className={classes.Break} style={{width: "100%"}}/>
              {formFields}
              <button className={classes.SignUpButton} type="submit">Sign Up</button>
          </form>
      </React.Fragment>
  );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (email,password,isSignUp,userData) => dispatch(actions.authAttempt(email,password,isSignUp,userData)),
        onResetError: () => dispatch(actions.authResetError())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(signUp);