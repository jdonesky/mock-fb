

import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import classes from './Photos.css'

const photos = () => {


    return (
        <div className={classes.Container}>
            <div className={classes.Header}>
                <h2>Photos</h2>
                <Link className={classes.Link} to="user-profile/photos">See All</Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        photos: state.profile.photos
    }
}

export default connect(mapStateToProps)(photos)