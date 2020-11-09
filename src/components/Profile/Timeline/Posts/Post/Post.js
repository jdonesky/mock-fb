

import React, { useContext, useRef } from 'react';
import {connect} from 'react-redux';
import classes from './Post.css'
import NoGenderPlaceholder from '../../../../../assets/images/profile-placeholder-gender-neutral';

import Like from '../../../../../assets/images/like-outline';
import SpeechBubble from '../../../../../assets/images/speech-bubble';

import { LifeEventContext } from "../../../../../context/life-event-context";
import { PostContext } from "../../../../../context/post-context";
import Globe from "../../../../../assets/images/earth";
import Lock from "../../../../../assets/images/padlock";
import Friends from "../../../../../assets/images/friends";


const post = (props) => {

    const lifeEventContext = useContext(LifeEventContext);
    const postContext = useContext(PostContext)
    const imageUploader = useRef(null);

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

    let icon;

    switch (props.privacy) {
        case 'public':
            icon = <Globe />
            break;
        case 'private':
            icon = <Lock />
            break;
        case 'friends':
            icon = <Friends />
            break;
        default:
            icon = <Globe />
    }


    return (
        <div className={classes.Container}>
            <section className={classes.Header}>
                <div className={classes.ProfileImageContainer}>
                    <div className={classes.ProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}}>
                        {props.profileImage ? null : <NoGenderPlaceholder />}
                    </div>
                </div>
                <div className={classes.IdContainer}>
                    <div>{props.name && props.name}</div>
                    <div className={classes.DateAndPrivacyContainer}>
                        <span>{props.date || 'Today'}</span>
                        <div className={classes.PrivacyIcon}>{icon}</div>
                    </div>
                </div>
            </section>
            <div className={classes.Break}/>
            <section className={classes.ButtonsContainer}>
                <div className={classes.Button} onClick={() => imageUploader.current.click()}>
                    <div className={classes.ButtonIcon}><Like /></div>
                    <span>Like</span>
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
                    <div className={[classes.ButtonIcon,classes.Comment].join(" ")}><SpeechBubble /></div>
                    <span>Comment</span>
                </div>
            </section>
            <div className={classes.Break} />
            <section className={classes.CommentSection}>
                <div className={classes.CommenterProfileImageContainer}>
                    <div className={classes.CommenterProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}}>
                        {props.profileImage ? null : <NoGenderPlaceholder />}
                    </div>
                </div>
                <div className={classes.CommentBar}>
                    <input  placeholder="Write a comment..." />
                </div>
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        profileImage: state.profile.profileImage,
        name: state.profile.firstName + ' ' + state.profile.lastName
    }
}

export default connect(mapStateToProps)(post);