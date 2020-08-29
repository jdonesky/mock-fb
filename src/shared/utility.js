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


