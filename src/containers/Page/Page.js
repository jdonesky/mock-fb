

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

    // useEffect(() => {
    //     if (ownedPageKeys) {
    //         console.log('my owned keys', ownedPageKeys)
    //         if (props.othersPage) {
    //             console.log('this page key', props.othersPage.adminUserKey)
    //             console.log('in page - this page key in my owned keys ? ', ownedPageKeys.includes(props.othersPage.dbKey))
    //         }
    //     }
    // })

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

    let page = (
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

    if (pathRoot === 'manage' && props.fetchingOwnedPage) {
        page = <SquareFold />
    } else if (pathRoot === 'discover' && props.fetchingOthersPage ) {
        page = <SquareFold />
    }

    return page;
}


const mapStateToProps = (state) => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        ownedPage: state.pages.ownedPage,
        othersPage: state.pages.othersPage,
        ownedPageKeys: state.pages.ownedPageKeys
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOwnedPageKeys: (authToken, userKey) => dispatch(actions.fetchOwnedPageKeysAttempt(authToken, userKey)),
        onFetchOwnedPage: (authToken, pageKey) => dispatch(actions.fetchOwnedPageAttempt(authToken, pageKey))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(page, axios));
