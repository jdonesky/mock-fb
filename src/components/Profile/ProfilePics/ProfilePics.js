
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import classes from './ProfilePics.css';
import * as actions from '../../../store/actions/index'


const profilePics = React.memo(({token, firebaseKey, profilePic, coverPic, onProfileUpdate}) => {
    const profilePicUploader = useRef(null);
    const profilePicContainer = useRef(null);
    const coverPicUploader = useRef(null);
    const coverPicContainer = useRef(null);

    // const {token, firebaseKey, profilePic, coverPic} = props

    useEffect(() => {
        if (profilePic) {
            profilePicContainer.current.style.backgroundImage = `url(${profilePic})`;
        }
    }, [profilePic])

    useEffect(() => {
        if (coverPic) {
            coverPicContainer.current.style.backgroundImage = `url(${coverPic})`;
        }
    }, [coverPic])

    const imageUploadHandler = (event, type) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (type === 'PROFILE') {
                    profilePicContainer.current.style.backgroundImage = `url(${event.target.result})`;
                    onProfileUpdate(token,firebaseKey,"profileImage",event.target.result)
                } else {
                    coverPicContainer.current.style.backgroundImage = `url(${event.target.result})`;
                    onProfileUpdate(token,firebaseKey,"coverImage",event.target.result)

                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <React.Fragment>
        <form className={classes.CoverPicBoundary}>
            <div className={classes.CoverPicContainer} ref={coverPicContainer}>
                <input
                    ref={coverPicUploader}
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={imageUploadHandler}
                    style={{
                        display: "none"
                    }}
                />
                {/*<div*/}
                {/*    className={classes.CoverPicUploadButton}*/}
                {/*    onClick={() => coverPicUploader.current.click()}*/}
                {/*>*/}
                {/*    <div className={classes.PhotoUploadIcon}></div>*/}
                {/*    <p>Add Cover Photo</p>*/}
                {/*</div>*/}
            </div>
        </form>
        <form>
            <div
                className={classes.ProfilePicContainer}
                ref={profilePicContainer}
            >
                <input
                    ref={profilePicUploader}
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={event => imageUploadHandler(event, "PROFILE")}
                    style={{
                        display: "none"
                    }}
                />
                <div className={classes.ProfileUploadButton}
                    onClick={() => profilePicUploader.current.click()}
                ></div>
            </div>
            <div
                className={classes.CoverPicUploadButton}
                onClick={() => coverPicUploader.current.click()}
            >
                <div className={classes.PhotoUploadIcon}></div>
                <p>Add Cover Photo</p>
            </div>
        </form>
        </React.Fragment>
    )
}, (prevProps, nextProps) => {
    return prevProps.profilePic === nextProps.profilePic || prevProps.coverPic === nextProps.coverPic
})

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        profilePic: state.profile.profileImage,
        coverPic: state.profile.coverImage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (authToken,firebaseKey,fieldName,file) => dispatch(actions.updateProfileAttempt(authToken,firebaseKey,fieldName,file)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(profilePics);

