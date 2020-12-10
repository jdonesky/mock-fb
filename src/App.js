
import React, {useEffect, Suspense} from "react";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import FoldingSquare from './components/UI/Spinner/SquareFold'
import * as actions from "./store/actions/index";
import DeleteContextProvider from "./context/delete-context";
import LifeEventContextProvider from "./context/life-event-context";
import PostContextProvider from "./context/post-context";


const AsyncAuth = React.lazy(() => {
    return import("./containers/Auth/Auth");
});
const AsyncSignUp = React.lazy(() => {
    return import("./containers/Auth/SignUp");
})

const AsyncHome = React.lazy(() => {
    return import("./containers/Home/Home");
})
const AsyncUserProfile = React.lazy(() => {
    return import("./containers/UserProfile/UserProfile");
});
const AsyncPosts = React.lazy(() => {
    return import("./containers/Posts/Posts");
});
const AsyncFriends = React.lazy(() => {
    return import("./containers/Friends/Friends");
});
const AsyncSearch = React.lazy(() => {
    return import ("./containers/Search/Search");
})

const AsyncLogout = React.lazy(() => {
    return import("./containers/Logout/Logout");
});

const AsyncDeleteModal = React.lazy(() => {
    return import("./components/UI/Modal/DeleteModal")
})

const AsyncCreatePostModal = React.lazy(() => {
    return import("./components/UI/Modal/CreatePostModals/CreatePost")
})

const AsyncCreateLifeEventModal = React.lazy(() => {
    return import("./components/UI/Modal/LifeEventModals/LifeEventModal")
})

const app = (props) => {

    const {authToken, userId, onFetchProfile, onReloadApp} = props;

    useEffect(() => {
        onReloadApp();
        if (authToken) {
            onFetchProfile(userId, authToken);
        }
    }, [authToken, userId, onFetchProfile, onReloadApp])


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
                <Route path="/user-profile" component={AsyncUserProfile}/>
                <Route path="/friends" component={AsyncFriends}/>
                <Route path="/logout" component={AsyncLogout}/>
                <Route path="/search-users" component={AsyncSearch}/>
                <Route path="/home" component={AsyncHome}/>
                <Route component={AsyncHome}/>
            </Switch>
        );
    }

    return (
        <PostContextProvider>
            <LifeEventContextProvider>
                <DeleteContextProvider>
                    <Layout>
                        <Suspense fallback={<FoldingSquare />}>
                            <AsyncDeleteModal />
                            <AsyncCreatePostModal />
                            <AsyncCreateLifeEventModal />
                            {routes}
                        </Suspense>
                    </Layout>
                </DeleteContextProvider>
            </LifeEventContextProvider>
        </PostContextProvider>
    );

}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        authToken: state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReloadApp: () => dispatch(actions.autoSignIn()),
        onFetchProfile: (userId, authToken) => dispatch(actions.fetchProfileAttempt(userId, authToken)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(app);
