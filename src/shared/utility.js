import axios from '../axios/db-axios-instance'
import Axios from 'axios';
import firebase from '../firebase';

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

  if (rules.isTel) {
    const pattern = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
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
  '0' : 'January',
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

export const reverseMapZeroMonths = {
  '00' : 'January',
  '01' : 'January',
  '02' : 'February',
  '03' : 'March',
  '04' : 'April',
  '05' : 'May',
  '06' : 'June',
  '07' : 'July',
  '08' : 'August',
  '09' : 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}


export const convertDate = (date) => {
  const year = date.split('-')[0]
  const month = reverseMapZeroMonths[date.split('-')[1]] || reverseMapMonths[date.split('-')[1]];
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
  const month = reverseMapMonths[rawDate[1]] || reverseMapZeroMonths[rawDate[1]];
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


export const convertMessageDatetime = (date) => {
  let formatted = new Date(date).toDateString()
  let hours = new Date(date).getHours()
  let minutes = new Date(date).getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  let morningOrAfter;
  if (hours > 12) {
    hours -= 12;
    morningOrAfter = 'pm';
  } else {
    morningOrAfter = 'am';
  }

 let final;
  const checkDate = new Date(date);
  const today = new Date();
  if (checkDate.getDate() === today.getDate() &&
      checkDate.getMonth() === today.getMonth() &&
      checkDate.getFullYear() === today.getFullYear()) {
    final = `${hours}:${minutes} ${morningOrAfter}`
  } else {
     if ( checkDate.getFullYear() === today.getFullYear()) {
        final = formatted.split(' ')[0] + ', ' + formatted.split(' ')[1] + ' ' + formatted.split(' ')[3]
        final = final + ', ' + `${hours}:${minutes} ${morningOrAfter}`;
     } else {
       final = formatted
     }
  }
  return final;

}

export const getElapsedTime = (date, calc) => {

  const then = new Date(date);
  const now = new Date();

  let timeDiff = now.getTime() - then.getTime();
  timeDiff = timeDiff / 1000;

  const seconds = Math.floor(timeDiff % 60);
  timeDiff = Math.floor(timeDiff / 60);
  const minutes = timeDiff % 60;
  timeDiff = Math.floor(timeDiff / 60);
  const hours = timeDiff % 24;
  timeDiff = Math.floor(timeDiff / 24);
  const days = timeDiff;
  let totalHours = hours + (days * 24);
  let totalHoursAsString = totalHours < 10 ? "0" + totalHours : totalHours + "";

  if (!calc) {
    if (totalHoursAsString === "00") {
      return `${minutes} ${minutes > 1 || minutes === 0 ? 'minutes' : 'minute'} ago`;
    } else if (totalHours < 24 && totalHours >= 1) {
      return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`
    } else if (days >= 1 && days < 7) {
      return `${days} ${days > 1 ? 'days' : 'day'} ago`;
    } else if (days > 7) {
      return convertMessageDatetime(date);
    }
  } else if (calc === 'CALC') {
    return days
  }
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
  return thisMonth === birthdayMonth + 1;
}


export const geocode = (address, cb) => {
  if (address) {
    Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyD4T1w5B2QyiyC4gFZ_f1dmvZ8_ghJkX0E`)
        .then(response => {
          cb('SUCCESS', response.data.results)
        })
        .catch(error => {
          cb('FAIL', error)
        })
  }
}

export const checkComponentVisibility = (ref) => {

  const rect = ref.getBoundingClientRect();

  let out = {top: null, bottom: null, left: null, right: null};

  if (rect.top <= 70) {
    out = {...out, top: 70 - rect.top}
  }
  if (rect.left <= 0) {
    out = {...out, left:  0 - rect.left}
  }
  if (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight)) {
    out = {...out, bottom: rect.bottom - window.innerHeight}
  }
  if (rect.right >= (window.innerWidth || document.documentElement.clientWidth)) {
    out = {...out, right: rect.right - window.innerWidth}
  }

  return out;

}

// export const createActivityRecord = () => {
//
// }

export const checkForNewMessages = (userKey, cb) => {
  const newMessages = firebase.database().ref(`/users/${userKey}/newMessages`)
  newMessages.on('value', snapshot => {
    let messages = [];
    snapshot.forEach( childSnapshot => {
      const child = childSnapshot.val()
      messages.push(child);
    })
    cb(messages)
  })
}

export const checkForActiveUsers = (authToken, followIds, cb) => {
  console.log('follow Ids in checkForActiveUsers -> ', followIds);
  if (followIds) {
    let queries = [];
    for (let i=0; i < followIds.length; i++) {
      console.log('making query for ', followIds[i])
      queries.push([firebase.database().ref(`/follows/${followIds[i]}/isOnline`), followIds[i]]);
    }
    console.log('queries -> ', queries)

    queries.forEach(query => {
      query[0].on('value', snapshot => {
        let userStatus = {[query[1]]: snapshot.val()}
        cb(userStatus)
      })
    });
  }
}

// export const checkForActiveFriends = (authToken, followIds, cb) => {
//   console.log(followIds)
//   let promises = [];
//   for (let id of followIds) {
//     promises.push(axios.get(`/follows/${id}/isOnline.json?auth=${authToken}`))
//   }
//   console.log('promises -> ', promises);
//   Promise.all(promises)
//       .then( async responses => {
//         console.log(responses);
//         const online = await responses.map((response,i ) => response.data ? {isOnline: response.data, userId: followIds[i]} : null)
//         console.log('success fetched activeFriends -> ', online);
//         cb(online);
//       })
//       .catch(error => {
//         console.log('failed fetching active friends -> ', error)
//       })
//
// }