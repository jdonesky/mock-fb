import * as firebase from "firebase-admin";

import "firebase/messaging";

const initializedFirebaseApp = firebase.initializeApp({
    // Project Settings => Add Firebase to your web app
    messagingSenderId: "207163404136"
});

const messaging = initializedFirebaseApp.messaging();

messaging.usePublicVapidKey(
    // Project Settings => Cloud Messaging => Web Push certificates
    "BMyb41QU_Qwt2DhA0tIUQxsXMwCKOwnWn44iLr7jSUmEzf3F6v5zuX0ce9cFaf9haTGjYK87pSA5k5IdiJmvQSo"
);

export { messaging };