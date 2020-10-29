

import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import classes from './Friends.css'

const friends = (props) => {

    return (
        <div className={classes.Container}>
            <div className={classes.Header}>
                <h2>Friends</h2>
                <Link className={classes.Link} to="user-profile/friends">See All</Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        friends: state.profile.friends
    }
}

export default connect(mapStateToProps)(friends)