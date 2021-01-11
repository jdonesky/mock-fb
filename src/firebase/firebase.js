
import firebase from 'firebase/app';
import '@firebase/messaging';

const config = {
    messagingSenderId: "207163404136",
}

firebase.initializeApp(config);

let messaging;
if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
}

export {
    messaging
}