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
// import userReducer from "./store/reducers/user";
// import friendsReducer from "./store/reducers/friends";
import profileReducer from "./store/reducers/profile";
import postsReducer from "./store/reducers/posts";

const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer,
  // friends: friendsReducer,
  profile: profileReducer,
  posts: postsReducer,
});

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
