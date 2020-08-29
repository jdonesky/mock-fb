import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import { fieldBuilder } from "../../shared/utility";

import classes from "./Auth.css";

class Auth extends Component {
  state = {
    formInputs: {
      email: fieldBuilder("input","text","email","",{required:true},false,false),
      password: fieldBuilder("input","text","password","",{required:true},false,false),
    },
  };

  changeHandler = (event, key) => {
    const updatedFormInput = { ...this.state.formInputs[key] };
    updatedFormInput.value = event.target.value;
    const updatedInputs = { ...this.state.formInputs };
    updatedInputs[key] = updatedFormInput;
    this.setState({
      formInputs: updatedInputs
    });
  };

  render() {
    let form = Object.keys(this.state.formInputs).map((key) => (
      <Input
        key={key}
        value={this.state.formInputs[key].value}
        placeholder={this.state.formInputs[key].elementConfig.placeholder}
        elementType={this.state.formInputs[key].elementType}
        changed={(event) => this.changeHandler(event, key)}
      />
    ));
    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <button>Sign-In</button>
        </form>
      </div>
    );
  }
}

export default Auth;
