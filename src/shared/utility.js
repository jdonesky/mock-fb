import axios from '../axios/db-axios-instance'

export const fieldBuilder = (
  elType,
  inputType,
  placeholder,
  value,
  validation, 
  valid,
  touched,
  label,
  options,
  extra,
  header
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
    label: label,
    options: options,
    extra: extra,
    header: header
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

const monthMap = {
  '0' : 'January',
  '1' : 'February',
  '2' : 'March',
  '3' : 'April',
  '4' : 'May',
  '5' : 'June',
  '6' : 'July',
  '7' : 'August',
  '8' : 'September',
  '9': 'October',
  '10': 'November',
  '11': 'December'
}

export const mapMonths = {
  'January': '0',
  'February' : '1',
  'March': '2',
  'April': '3',
  'May' : '4',
  'June' : '5',
  'July' : '6',
  'August' : '7',
  'September' : '8',
  'October' : '9',
  'November' : '10',
  'December' : '11'
}

export const reverseMapMonths = {
  '1' : 'January',
  '2' : 'February',
  '3' : 'March',
  '4' : 'April',
  '5' : 'May',
  '6' : 'June',
  '7' : 'July',
  '8' : 'August',
  '9' : 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}


export const convertDate = (date) => {
  const year = date.split('-')[0]
  const month = [date.split('-')[1]].map(month => monthMap[month]);
  const day = date.split('-')[2]
  return [month, day, year]
}


export const convertDatetime = (date, noCheck) => {

  const rawDate = date.toString().split(" ")
  let day = rawDate[2];
  const month = rawDate[1];
  const year = rawDate[3];
  let formatted = `${month} ${day}, ${year}`

  if (!noCheck) {
    const checkDate = new Date(date);
    const today = new Date();
    if (checkDate.getDate() === today.getDate() &&
        checkDate.getMonth() === today.getMonth() &&
        checkDate.getFullYear() === today.getFullYear()) {
      formatted = 'today'
    }
  }

  return formatted;
}


export const convertDashedDatetime = (date) => {

  const rawDate = date.split("T")[0].split("-")
  let day = rawDate[2];
  const month = reverseMapMonths[rawDate[1]];
  const year = rawDate[0];
  let formatted = `${month} ${day}, ${year}`

    const checkDate = new Date(date);
    const today = new Date();
    if (checkDate.getDate() === today.getDate() &&
        checkDate.getMonth() === today.getMonth() &&
        checkDate.getFullYear() === today.getFullYear()) {
      formatted = 'today'
    }

  return formatted;
}




export class KeyGenerator {

  static getKey = (authToken, cb) => {
    const url = "key.json?auth=" + authToken
    axios.get(url)
        .then(response => {
          this.key = (response.data || 0) + 1
          return axios.put(url, this.key)
        })
        .then(response => {
          cb(this.key)
        })
        .catch(err => console.log(err))

  }
}

export const checkBirthday = (date) => {
  let thisMonth = new Date().getMonth();
  const birthdayMonth = new Date(date).getMonth();
  return thisMonth == birthdayMonth + 1;
}

