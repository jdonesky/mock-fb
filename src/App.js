
import React, {useEffect, Suspense} from "react";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import FoldingSquare from './components/UI/Spinner/SquareFold'
import * as actions from "./store/actions/index";
import DeleteContextProvider from "./context/delete-context";
import LifeEventContextProvider from "./context/life-event-context";


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
    return import ("./containers/Search/Search")
})
const AsyncAuth = React.lazy(() => {
    return import("./containers/Auth/Auth");
});

const AsyncSignUp = React.lazy(() => {
    return import("./containers/Auth/SignUp")
})

const AsyncLogout = React.lazy(() => {
    return import("./containers/Logout/Logout");
});


const app = (props) => {

    useEffect(() => {
        props.onReloadApp();
    }, [])


    let routes = (
        <Switch>
            <Route path="/authentication" component={AsyncAuth}/>
            <Route path="/sign-up" component={AsyncSignUp}/>
            <Route path="/" component={AsyncPosts}/>
            <Route component={AsyncAuth}/>
        </Switch>
    );
    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/authentication" component={AsyncAuth}/>
                <Route path="/sign-up" component={AsyncSignUp}/>
                <Route path="/user-profile" component={AsyncUserProfile}/>
                <Route path="/friends" component={AsyncFriends}/>
                <Route path="/logout" component={AsyncLogout}/>
                <Route path="/search-users" component={AsyncSearch}/>
                <Route component={AsyncPosts}/>
            </Switch>
        );
    }

    return (
        <LifeEventContextProvider>
            <DeleteContextProvider>
                <Layout>
                    <Suspense fallback={<FoldingSquare />}>
                        {routes}
                    </Suspense>
                </Layout>
            </DeleteContextProvider>
        </LifeEventContextProvider>
    );

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReloadApp: () => dispatch(actions.autoSignIn()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(app);
