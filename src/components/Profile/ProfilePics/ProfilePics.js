
import React, {useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import classes from './ProfilePics.css';
import * as actions from '../../../store/actions/index'
import CameraSvg from '../../../assets/images/MiscIcons/camera';

const profilePics = ({token, firebaseKey, profilePic, coverPic, onProfileUpdate, displayProfile, otherUserProfile}) => {
    const profilePicUploader = useRef(null);
    const profilePicContainer = useRef(null);
    const coverPicUploader = useRef(null);
    const coverPicContainer = useRef(null);


    useEffect(() => {
        if (displayProfile === 'me') {
            if (profilePic) {
                profilePicContainer.current.style.backgroundImage = `url(${profilePic})`;
            } else {
                profilePicContainer.current.style.backgroundImage = null;
            }
        } else {
            if (otherUserProfile && otherUserProfile.profileImage) {
                profilePicContainer.current.style.backgroundImage = `url(${otherUserProfile.profileImage})`;
            } else {
                profilePicContainer.current.style.backgroundImage = null;
            }
        }
    }, [profilePic, otherUserProfile, displayProfile])

    useEffect(() => {
        if (displayProfile === 'me') {
            if (coverPic) {
                coverPicContainer.current.style.backgroundImage = `url(${coverPic})`;
            } else {
                coverPicContainer.current.style.backgroundImage = null;
            }
        } else {
            if (otherUserProfile && otherUserProfile.coverImage) {
                coverPicContainer.current.style.backgroundImage = `url(${otherUserProfile.coverImage})`;
            } else {
                coverPicContainer.current.style.backgroundImage = null;
            }
        }
    }, [coverPic, otherUserProfile, displayProfile])

    const imageUploadHandler = (event, type) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (type === 'PROFILE') {
                    profilePicContainer.current.style.backgroundImage = `url(${event.target.result})`;
                    onProfileUpdate(token,firebaseKey,"profileImage",event.target.result, 'edit')
                } else {
                    coverPicContainer.current.style.backgroundImage = `url(${event.target.result})`;
                    onProfileUpdate(token,firebaseKey,"coverImage",event.target.result, 'edit')
                }
            };
            reader.readAsDataURL(file);
        }
    };

    let profilePicUploadButton;
    let coverPicUploadButton;
    if (displayProfile === 'me') {
        profilePicUploadButton = (
            <div className={classes.ProfileUploadButton}onClick={() => profilePicUploader.current.click()}>
                <div className={classes.CameraIcon}>
                    <CameraSvg />
                </div>
            </div>
        )

        coverPicUploadButton = (
            <div className={classes.CoverPicUploadButton} onClick={() => coverPicUploader.current.click()}>
                <div className={[classes.CameraIcon, classes.CoverPicIcon].join(" ")}>
                    <CameraSvg />
                </div>
                <p>Add Cover Photo</p>
            </div>
        )
    }



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
                {profilePicUploadButton}
            </div>
            {coverPicUploadButton}
        </form>
        </React.Fragment>
    )
}
// , (prevProps, nextProps) => {
//     return prevProps.profilePic === nextProps.profilePic || prevProps.coverPic === nextProps.coverPic
// })

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        publicProfileKey: state.profile.publicProfileKey,
        profilePic: state.profile.profileImage,
        coverPic: state.profile.coverImage,
        otherUserProfile: state.users.fullProfile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (authToken,firebaseKey,fieldName,file, how) => dispatch(actions.updateProfileAttempt(authToken,firebaseKey,fieldName,file, how)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(profilePics);

