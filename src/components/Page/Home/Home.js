

import React, {useEffect} from 'react';
import classes from './Home.css';
import {connect} from 'react-redux';
import About from './About/About';
import CreatePost from './CreatePost/CreatePost'
import InviteLikes from "./InviteLikes/InviteLikes";

const home = (props) => {

    return (
        <div className={classes.Home}>
            <About />
            <InviteLikes />
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(home);