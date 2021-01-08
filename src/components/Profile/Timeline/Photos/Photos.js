

import React from 'react';
import {connect} from 'react-redux'
import Photo from './Photo/Photo'
import classes from './Photos.css'
import getWindowDimensions from "../../../../hooks/getWindowDimensions";


const photos = (props) => {

    const {width, height} = getWindowDimensions();

    let photos = [];
    if (props.displayProfile === 'me') {
        if (props.profileImage) {
            photos.push(props.profileImage)
        }
        if (props.coverImage) {
            photos.push(props.coverImage)
        }
    } else {
        if (props.otherProfile) {
            if (props.otherProfile.profileImage) {
                photos.push(props.otherProfile.profileImage)
            }
            if (props.otherProfile.coverImage) {
                photos.push(props.otherProfile.coverImage)
            }
        }
    }

    if (photos.length > 0) {
        photos = photos.map((pic, i) => (
            <Photo
                key={i}
                photo={pic}
                width={width}
            />
        ))
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Header}>
                <h2>Photos</h2>
                <div className={classes.Link} onClick={() => props.history.push(`/user-profile/${props.displayProfile}/photos`)}>See All</div>
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
        coverImage: state.profile.coverImage,
        otherProfile: state.users.fullProfile,
        myPhotos: state.photos.selfies,
        tagged: state.photos.taggedMe

    }
}

export default connect(mapStateToProps)(photos)