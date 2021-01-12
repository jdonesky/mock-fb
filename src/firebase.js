
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: process.env.REACT_APP_SERVICE_CREDENTIAL,
    databaseURL: "https://mockfb2.firebaseio.com"
})


// import * as firebase from 'firebase';
//
// const config = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: "mockfb2.firebaseapp.com",
//     databaseURL: "https://mockfb2.firebaseio.com",
//     projectId: "mockfb2",
//     storageBucket: "mockfb2.appspot.com",
//     messagingSenderId: "207163404136",
//     appId: "1:207163404136:web:25261ffc539cdd2244b0dd",
//     measurementId: "G-1L5QZ16MNK"
// };
//
// firebase.initializeApp(config);
//
// export default firebase;
