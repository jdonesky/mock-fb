export const fieldBuilder = (
  elType,
  inputType,
  placeholder,
  value,
  validation, 
  valid,
  touched
) => {
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
};


export const validityCheck = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.trim().length  >= rules.minLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid
  }

  return isValid
}


