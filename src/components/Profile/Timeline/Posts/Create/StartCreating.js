

import React, { useContext, useRef, useState, useEffect } from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './StartCreating.css'
import Avatar from '../../../../../assets/images/BookmarkIcons/user';
import Flag from '../../../../../assets/images/LifeEventIcons/finish';
import AddPhoto from '../../../../../assets/images/LifeEventIcons/addCamera';
import { LifeEventContext } from "../../../../../context/life-event-context";
import { PostContext } from "../../../../../context/post-context";

const startPost = (props) => {

    const [pathRoot, setPathRoot] = useState(props.history.location.pathname.split('/')[1])
    const lifeEventContext = useContext(LifeEventContext);
    const postContext = useContext(PostContext);
    const imageUploader = useRef(null);

    useEffect(() => {
        if (pathRoot !== props.history.location.pathname.split('/')[1]) {
            setPathRoot(props.history.location.pathname.split('/')[1]);
        }
    })

    const imageUploadHandler = (event) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                postContext.passData('image',event.target.result)
            };
            reader.readAsDataURL(file);
        }
        postContext.toggleModal()
    }

    const navToProfile = () => {
        if (props.history.location.pathname !== '/user-profile/me') {
            props.history.push('/user-profile/me')
        }
    }

    let placeholder;
    let startCreatingAction;
    if (!props.displayProfile || props.displayProfile === 'me') {
        placeholder = 'Whats on your mind?'
        startCreatingAction = postContext.toggleModal;
    } else if (props.displayProfile && props.displayProfile !== 'me') {
        if (props.otherProfile) {
            placeholder = `Say something to ${props.otherProfile.firstName}...`
            startCreatingAction = () => postContext.openPostToOtherModal(props.otherProfile, 'USER')
        }
    }

    return (
        <div className={classes.Container}>
            <section className={classes.Header}>
                <div className={classes.ProfileImageContainer}>
                    <div className={classes.ProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}} onClick={navToProfile}>
                        {props.profileImage ? null : <Avatar fill="white" />}
                    </div>
                </div>
                <div className={classes.QueryBar} onClick={startCreatingAction}>
                    <span>{placeholder}</span>
                </div>
            </section>
            <div className={classes.Break}/>
            <section className={classes.ButtonsContainer}>
                <div className={classes.Button} onClick={() => imageUploader.current.click()}>
                    <div className={classes.ButtonIcon}><AddPhoto fill="#069c1d" /></div>
                    <span>Add Photo</span>
                    <input
                        ref={imageUploader}
                        type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={imageUploadHandler}
                        style={{
                            display: "none"
                        }}
                    />
                </div>
                <div className={classes.Button} onClick={lifeEventContext.toggleModal}>
                    <div className={[classes.ButtonIcon,classes.Flag].join(" ")}><Flag fill="#0493cc" /></div>
                    <span>Life Event</span>
                </div>
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        profileImage: state.profile.profileImage,
        otherProfile: state.users.fullProfile
    }
}

export default connect(mapStateToProps)(withRouter(startPost));