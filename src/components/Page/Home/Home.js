

import React, {useEffect} from 'react';
import classes from './Home.css';
import {connect} from 'react-redux';
import About from './About/About';
import InviteLikes from "./InviteLikes/InviteLikes";
import CreatePost from './CreatePost/CreatePost';
import Posts from '../../Profile/Timeline/Posts/Posts';

const home = (props) => {

    return (
        <div className={classes.Home}>
            <About />
            <InviteLikes />
            <CreatePost />
            <Posts userType="PAGE"/>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(home);