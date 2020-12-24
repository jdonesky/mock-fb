

import React, {useEffect} from 'react';
import classes from './Home.css';
import {connect} from 'react-redux';
import Invite from './InviteLikes/InviteLikes';
import About from './About/About';
import CreatePost from './CreatePost/CreatePost'

const home = (props) => {

    let about;

    return (
        <div className={classes.Home}>
            <About />
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(home);