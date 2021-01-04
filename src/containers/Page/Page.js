

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

    const [basePath, setBasePath] = useState(props.history.location.pathname.split("/")[1])
    const [pathRoot, setPathRoot] = useState(props.history.location.pathname.split("/")[2])
    const [displayPage, setDisplayPage] = useState(props.match.params.id)

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
    if (pathRoot === 'manage') {
        if (props.ownedPage) {
            name = props.ownedPage.name;
            category = props.ownedPage.category;
        }
    } else {
        if (props.othersPage) {
            name = props.othersPage.name
            category = props.othersPage.name
        }
    }

    let page = (
            <div className={classes.WhiteBackFill}>
                <Header pathRoot={pathRoot} displayPage={displayPage} name={name} category={category} />
                <NavigationBar />
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
        ownedPage: state.pages.ownedPage,
        othersPage: state.pages.othersPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOwnedPage: (authToken, pageKey) => dispatch(actions.fetchOwnedPageAttempt(authToken, pageKey))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(page, axios));
