

import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import classes from './Home.css';
import {connect} from 'react-redux';
import About from './About/About';
import InviteLikes from "./InviteLikes/InviteLikes";
import CreatePost from './CreatePost/CreatePost';
import Posts from '../../Profile/Timeline/Posts/Posts';

const home = (props) => {

    const [pathRoot, setPathRoot] = useState(props.history.location.pathname.split('/')[2])
    const {fetchingOwnedPageKeys, ownedPageKeys, othersPage} = props;

    useEffect(() => {
        if (pathRoot !== props.history.location.pathname.split('/')[2]) {
            setPathRoot(props.history.location.pathname.split('/')[2]);
        }
    })

    let owned;
    if (pathRoot === 'view') {
        if (ownedPageKeys && othersPage) {
            owned = ownedPageKeys.includes(othersPage.dbKey);
        }
    }

    let inviteLikes;
    if (pathRoot === 'manage' || owned) {
        inviteLikes =  <InviteLikes />
    }

    return (
        <div className={classes.Home}>
            <About />
            {inviteLikes}
            <CreatePost />
            <Posts userType="PAGE"/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        othersPage: state.pages.othersPage,
        ownedPageKeys: state.pages.ownedPageKeys,
        fetchingOwnedPageKeys: state.pages.fetchingOwnedPageKeys
    }
}

export default connect(mapStateToProps)(withRouter(home));