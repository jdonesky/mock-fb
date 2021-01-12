import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// import firebase from './firebase';
import registerServiceWorker from "./registerServiceWorker";

import authReducer from "./store/reducers/auth";
import profileReducer from "./store/reducers/profile";
import postsReducer from "./store/reducers/posts";
import pagesReducer from "./store/reducers/pages";
import usersReducer from "./store/reducers/users";
import friendsReducer from "./store/reducers/friends";
import photosReducer from "./store/reducers/photos";
import messengerReducer from "./store/reducers/messenger";
import activityReducer from "./store/reducers/activity";
import searchReducer from "./store/reducers/search";

import MessengerContextProvider from './context/messenger-context';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  posts: postsReducer,
  pages: pagesReducer,
  photos: photosReducer,
  users: usersReducer,
  friends: friendsReducer,
  messenger: messengerReducer,
  activity: activityReducer,
  search: searchReducer
});

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
  //composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter >
      <MessengerContextProvider>
        <App />
      </MessengerContextProvider>
    </BrowserRouter>
  </Provider>
);

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//       .register("../firebase-messaging-sw.js")
//       .then(function(registration) {
//         const messaging = firebase.messaging();
//         console.log('messaging');
//         messaging.requestPermission()
//             .then(response => {
//                 console.log('NOTIFICATION PERMISSION GRANTED');
//                 messaging.getToken().then(currentToken => {
//                     console.log('firebase token', currentToken)
//                 })
//             })
//             .catch(error => {
//                 console.log('PUSH MESSAGING IS NOT ALLOWED')
//             })
//         messaging.onMessage(payload => {
//             console.log('message received', payload)
//         })
//         console.log("Registration successful, scope is:", registration.scope);
//       })
//       .catch(function(error) {
//         console.log("Service worker registration failed, error:", error);
//       });
// }

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
