import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import authReducer from "./store/reducers/auth";
import profileReducer from "./store/reducers/profile";
import postsReducer from "./store/reducers/posts";
import pagesReducer from "./store/reducers/pages";
import usersReducer from "./store/reducers/users";
import friendsReducer from "./store/reducers/friends";
import photosReducer from "./store/reducers/photos";
import messengerReducer from "./store/reducers/messenger";

import MessengerContextProvider from './context/messenger-context';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  posts: postsReducer,
  pages: pagesReducer,
  photos: photosReducer,
  users: usersReducer,
  friends: friendsReducer,
  messenger: messengerReducer
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

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
