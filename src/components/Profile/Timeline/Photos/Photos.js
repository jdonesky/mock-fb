

import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Photo from './Photo/Photo'
import classes from './Photos.css'

const photos = (props) => {

    const photos = [props.profileImage].map((pic, i) => (
        <Photo
            key={i}
            photo={pic}
        />
    ))

    return (
        <div className={classes.Container}>
            <div className={classes.Header}>
                <h2>Photos</h2>
                <Link className={classes.Link} to="user-profile/photos">See All</Link>
            </div>
            <section className={classes.PhotosContainer}>
                {photos}
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        profileImage: state.profile.profileImage,
        photos: state.profile.photos
    }
}

export default connect(mapStateToProps)(photos)