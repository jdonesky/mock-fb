
import React, {useEffect, Suspense} from "react";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import FoldingSquare from './components/UI/Spinner/SquareFold'
import * as actions from "./store/actions/index";
import DeleteContextProvider from "./context/delete-context";
import LifeEventContextProvider from "./context/life-event-context";
import PostContextProvider from "./context/post-context";
import PageContextProvider from "./context/page-context";
import ProfileContextProvider from "./context/edit-profile-context";
import ViewAsContextProvider from "./context/view-as-context";

import firebase from "./firebase";
import {checkForNewMessages} from "./shared/utility";
import {checkForActiveUsers} from "./shared/utility";

const AsyncActiveChatTab = React.lazy(() => {
    return import('./components/Messenger/ActiveChats/ActiveChat')
});

const AsyncAuth = React.lazy(() => {
    return import("./containers/Auth/Auth");
});
const AsyncSignUp = React.lazy(() => {
    return import("./containers/Auth/SignUp");
})

const AsyncHome = React.lazy(() => {
    return import("./containers/Home/Home");
})

const AsyncBookmarks = React.lazy(() => {
    return import("./components/Navigation/Bookmarks/Bookmarks");
})

const AsyncUserProfile = React.lazy(() => {
    return import("./containers/UserProfile/UserProfile");
});

const AsyncFriends = React.lazy(() => {
    return import("./containers/Friends/Friends");
});

const AsyncPages = React.lazy(() => {
    return import("./containers/Pages/Pages");
})

const AsyncPage = React.lazy(() => {
    return import("./containers/Page/Page");
})

const AsyncSearch = React.lazy(() => {
    return import ("./containers/Search/Search");
})

const AsyncLogout = React.lazy(() => {
    return import("./containers/Logout/Logout");
});

const AsyncDeleteModal = React.lazy(() => {
    return import("./components/UI/Modal/DeleteModal/DeleteModal")
})

const AsyncCreatePostModal = React.lazy(() => {
    return import("./components/UI/Modal/CreatePostModals/CreatePost")
})

const AsyncCreateLifeEventModal = React.lazy(() => {
    return import("./components/UI/Modal/LifeEventModals/LifeEventModal")
})

const AsyncEditProfileModal = React.lazy(() => {
    return import("./components/UI/Modal/EditModals/EditProfile/EditProfileModal")
})

const AsyncEditPageModal = React.lazy(() => {
    return import("./components/UI/Modal/EditModals/EditPage/EditPageModal");
})

const AsyncMessengerModal = React.lazy(() => {
    return import("./components/Messenger/Messenger");
})

const AsyncViewAsModal = React.lazy(() => {
    return import("./components/UI/Modal/ViewAsModals/ViewAs");
})

const app = (props) => {

    const {authToken, userId, firebaseKey, onFetchMyProfile, myPublicProfileKey, onFetchMyPublicProfile, onSaveNotificationToken, onLoadNewMessages, onFetchFollowingIds, onUpdateFollowedOnline, onFetchActiveStatus, onReloadApp} = props;

    useEffect(() => {
        onReloadApp();
        if (authToken) {
            onFetchMyProfile(userId, authToken);
        }
    }, [authToken, userId, onFetchMyProfile, onReloadApp])

    useEffect(() => {
        if (myPublicProfileKey) {
            onFetchMyPublicProfile(authToken, myPublicProfileKey)
        }
    }, [myPublicProfileKey])

    useEffect(() => {
        if (firebaseKey) {
            // console.log('FIREBASE KEY RETRIEVED -> ', firebaseKey)
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker
                    .register("../firebase-messaging-sw.js")
                    .then(function (registration) {
                        const messaging = firebase.messaging();
                        messaging.requestPermission()
                            .then(response => {
                                // console.log('NOTIFICATION PERMISSION GRANTED');
                                messaging.getToken().then(currentToken => {
                                    // console.log('firebase token', currentToken)
                                    onSaveNotificationToken(authToken, firebaseKey, currentToken)
                                })
                            })
                            .catch(error => {
                                console.log('PUSH MESSAGING IS NOT ALLOWED')
                            })
                        messaging.onMessage(payload => {
                            // console.log('message received', payload)
                        })
                        // console.log("Registration successful, scope is:", registration.scope);
                    })
                    .catch(function (error) {
                        console.log("Service worker registration failed, error:", error);
                    });
            }
            checkForNewMessages(firebaseKey, (newMessages) => {
                onLoadNewMessages(newMessages)
            })

            onFetchFollowingIds(authToken, userId, ids => {
                checkForActiveUsers(authToken, ids, online => {
                    console.log('active users, passed through from checkForActiveUsers callback -> ONLINE IN APP', online);
                    onUpdateFollowedOnline(online);
                })
            })

            onFetchActiveStatus(authToken, userId);

        }
    }, [firebaseKey])

    let routes = (
        <Switch>
            <Route path="/authentication" component={AsyncAuth}/>
            <Route path="/sign-up" component={AsyncSignUp}/>
            <Route component={AsyncAuth}/>
        </Switch>
    );
    if (props.authToken) {
        routes = (
            <Switch>
                <Route path="/authentication" component={AsyncAuth}/>
                <Route path="/sign-up" component={AsyncSignUp}/>
                <Route path="/user-profile/:id" component={AsyncUserProfile} />
                <Route path="/friends" component={AsyncFriends}/>
                <Route path="/pages" component={AsyncPages} />
                <Route path="/page/view/:id" component={AsyncPage} />
                <Route path="/logout" component={AsyncLogout}/>
                <Route path="/search-users" component={AsyncSearch}/>
                <Route path="/bookmarks" component={AsyncBookmarks}/>
                <Route path="/home" component={AsyncHome}/>
                <Route component={AsyncHome}/>
            </Switch>
        );
    }

    return (
            <PageContextProvider>
                <PostContextProvider>
                    <ProfileContextProvider>
                        <LifeEventContextProvider>
                            <ViewAsContextProvider>
                                <DeleteContextProvider>
                                    <Layout>
                                        <Suspense fallback={<FoldingSquare />}>
                                            <AsyncDeleteModal />
                                            <AsyncCreatePostModal />
                                            <AsyncCreateLifeEventModal />
                                            <AsyncEditPageModal />
                                            <AsyncMessengerModal />
                                            <AsyncActiveChatTab />
                                            <AsyncEditProfileModal />
                                            <AsyncViewAsModal />
                                            {routes}
                                        </Suspense>
                                    </Layout>
                                </DeleteContextProvider>
                            </ViewAsContextProvider>
                        </LifeEventContextProvider>
                    </ProfileContextProvider>
                </PostContextProvider>
            </PageContextProvider>
    );

}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        myPublicProfileKey: state.profile.publicProfileKey
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReloadApp: () => dispatch(actions.autoSignIn()),
        onFetchMyProfile: (userId, authToken) => dispatch(actions.fetchProfileAttempt(userId, authToken)),
        onFetchMyPublicProfile: (authToken, publicProfileKey) => dispatch(actions.fetchMyPublicProfileAttempt(authToken, publicProfileKey)),
        onSaveNotificationToken: (authToken, userKey, token) => dispatch(actions.saveNotificationTokenAttempt(authToken, userKey, token)),
        onLoadNewMessages: (messages) => dispatch(actions.updateNewMessages(messages)),
        onFetchFollowingIds: (authToken, userId, cb) => dispatch(actions.fetchFollowingIdsAttempt(authToken, userId, cb)),
        onUpdateFollowedOnline: (userStatus) => dispatch(actions.updateFollowedOnline(userStatus)),
        onFetchActiveStatus: (authToken, userId) => dispatch(actions.fetchActiveStatusAttempt(authToken, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(app);
