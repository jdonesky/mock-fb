

import React, {useEffect, useState, Suspense} from "react";
import {Switch, Route} from 'react-router';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import withErrorHandler from "../../hoc/withErrorHandler";
import Header from '../../components/Page/Header/Header';
import NavigationBar from '../../components/Page/NavigationBar/NavigationBar';

import axios from '../../axios/db-axios-instance';
import classes from "./Page.css";
import SquareFold from "../../components/UI/Spinner/SquareFold";
import getWindowDimensions from "../../hooks/getWindowDimensions";


const page = (props) => {

    const [displayPage, setDisplayPage] = useState(props.match.params.id)
    const [pathRoot, setPathRoot] = useState(props.history.location.pathname.split("/")[1])
    const {otherProfile, myPublicProfileKey} = props

    const {width, height} = getWindowDimensions();

    useEffect(() => {
        console.log('path root', pathRoot)
        console.log('MY PUBLIC PROFILE', props.myPublicProfile )
        console.log('width', width)
    })

    // useEffect(() => {
    //     if (displayPage) {
    //
    //     }
    // },[displayPage])
    //
    // useEffect(() => {
    //     if (otherProfile) {
    //         props.onFetchOtherPublicProfile(props.authToken, otherProfile.publicProfileKey)
    //     }
    // }, [otherProfile, displayPage])

    // useEffect(() => {
    //     if (props.match.params.id === 'me') {
    //         setDisplayPage('me')
    //     } else {
    //         setDisplayPage(props.match.params.id)
    //     }
    // }, [props.match.params.id])

    // let name;
    // let bio;
    // if (displayPage === 'me') {
    //     name = props.name;
    //     bio = props.bio;
    // } else {
    //     if (props.otherProfile) {
    //         name = props.otherProfile.firstName + ' ' + props.otherProfile.lastName
    //         bio = props.otherProfile.bio
    //     }
    // }

    let profile = (
            <div className={classes.WhiteBackFill}>
                <Header displayPage={displayPage} />
                <NavigationBar admin />
                <div className={classes.FlexContentPositioner}>
                    <div className={classes.SharedContentBackdrop}/>
                    <div className={classes.SharedContentFlexContainer}>

                    </div>
                </div>
            </div>
    )

    if (props.loadingMyProfile || props.loadingOtherProfile) {
        profile = <SquareFold />
    }

    return profile;
}


const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(page, axios));
