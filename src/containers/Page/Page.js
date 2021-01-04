

import React, {useEffect, useState} from "react";
import {Switch, Route} from 'react-router';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import withErrorHandler from "../../hoc/withErrorHandler";
import Header from '../../components/Page/Header/Header';
import NavigationBar from '../../components/Page/NavigationBar/NavigationBar';
import Home from '../../components/Page/Home/Home';

import axios from '../../axios/db-axios-instance';
import classes from "./Page.css";
import SquareFold from "../../components/UI/Spinner/SquareFold";


const page = (props) => {

    const [basePath, setBasePath] = useState(props.history.location.pathname.split("/")[1]);
    const [pathRoot, setPathRoot] = useState(props.history.location.pathname.split("/")[2]);
    const [displayPage, setDisplayPage] = useState(props.match.params.id);

    const {authToken, firebaseKey, ownedPageKeys} = props

    useEffect(() => {
        console.log(props.othersPage)
    })

    useEffect(() => {
        if (displayPage) {
            if (pathRoot === 'manage') {
                props.onFetchOwnedPage(authToken, displayPage);
            } else {
                props.onFetchOthersPage(authToken, displayPage);
            }
        }
    }, [displayPage])

    useEffect(() => {
        if (authToken && firebaseKey) {
            props.onFetchOwnedPageKeys(authToken, firebaseKey);
        }
    },[authToken, firebaseKey])

    useEffect(() => {
        if (displayPage) {
            if (pathRoot === 'manage') {
                props.onFetchOwnedPage(props.authToken, displayPage)
            }
        }
    },[displayPage])

    useEffect(() => {
        if (props.match.params.id !== displayPage) {
            setDisplayPage(props.match.params.id);
        }
    })

    let name;
    let category;
    let owned;
    if (pathRoot === 'manage') {
        if (props.ownedPage) {
            name = props.ownedPage.name;
            category = props.ownedPage.category;
        }
    } else {
        if (props.othersPage) {
            name = props.othersPage.name
            category = props.othersPage.name
            if (ownedPageKeys) {
                owned = ownedPageKeys.includes(props.othersPage.dbKey);
            }
        }
    }

    let page;
    if (props.fetchingOwnedPage || props.fetchingOthersPage) {
        page = <SquareFold />
    } else {
        page = (
            <div className={classes.WhiteBackFill}>
                <Header pathRoot={pathRoot} displayPage={displayPage} name={name} category={category} owned={owned}/>
                <NavigationBar owned={owned}/>
                <div className={classes.SharedCliff} />
                <div className={classes.FlexContentPositioner}>
                    <div className={classes.SharedContentBackdrop}>
                        <div className={classes.SharedContentFlexContainer}>
                            <Switch>
                                <Route exact path={`/${basePath}/${pathRoot}/${displayPage}`} component={Home} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    return page;
}


const mapStateToProps = (state) => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        ownedPage: state.pages.ownedPage,
        othersPage: state.pages.othersPage,
        ownedPageKeys: state.pages.ownedPageKeys,
        fetchingOwnedPage: state.pages.fetchingOwnedPage,
        fetchingOthersPage: state.pages.fetchingOthersPage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOwnedPageKeys: (authToken, userKey) => dispatch(actions.fetchOwnedPageKeysAttempt(authToken, userKey)),
        onFetchOwnedPage: (authToken, pageKey) => dispatch(actions.fetchOwnedPageAttempt(authToken, pageKey)),
        onFetchOthersPage: (authToken, pageKey) => dispatch(actions.fetchOthersPageAttempt(authToken, pageKey)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(page, axios));
