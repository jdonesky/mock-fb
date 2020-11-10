

import React, { useContext, useRef} from 'react';
import {connect} from 'react-redux';
import classes from './Post.css'

import D from '../../../../../assets/images/Raster/d.png'
import K from '../../../../../assets/images/Raster/kaleidoscope.jpg'

import Comment from './Comment/Comment';

import NoGenderPlaceholder from '../../../../../assets/images/profile-placeholder-gender-neutral';
import Like from '../../../../../assets/images/like-outline';
import SpeechBubble from '../../../../../assets/images/speech-bubble';
import Smiley from '../../../../../assets/images/smile';
import Camera from '../../../../../assets/images/camera-outline';
import Gif from '../../../../../assets/images/gif';
import Globe from "../../../../../assets/images/earth";
import Lock from "../../../../../assets/images/padlock";
import Friends from "../../../../../assets/images/friends";

import { LifeEventContext } from "../../../../../context/life-event-context";
import { PostContext } from "../../../../../context/post-context";
import {convertDatetime} from "../../../../../shared/utility";



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
            icon = <Globe fill="rgb(89, 89, 89)"/>
            break;
        case 'private':
            icon = <Lock fill="rgb(89, 89, 89)"/>
            break;
        case 'friends':
            icon = <Friends fill="rgb(89, 89, 89)"/>
            break;
        default:
            icon = <Globe fill="rgb(89, 89, 89)"/>
    }

    const status = (
        <section className={classes.StatusSection}>
            <p className={classes.Status}>{props.status && props.status}</p>
        </section>
    )

    const withImage = (
        <div className={classes.ImageSection}>
            {status}
            <div
                className={classes.ImageContainer}
                style={{backgroundImage: `url(${props.image && props.image})`}}
            />
        </div>
    )

    const withBackground = (
        <div className={classes.Backdrop} style={{
            backgroundImage: `url(${props.background && props.background.img ? props.background.img : props.background})`,
            backgroundColor: postContext.background && postContext.background.color ? postContext.background.color : null,
            height: "400px"
        }}>
            <section className={[classes.StatusSection,classes.StatusWithBackground].join(" ")}>
                <p className={classes.StatusTextArea}
                style={{WebkitTextStroke: "1px black"}}>
                    {props.status && props.status}
                </p>
            </section>
        </div>
    )

    let body;
    if (props.image) {
        body = withImage;
    } else if (props.background) {
        body = withBackground;
    } else {
        body = status;
    }

    let commentsSection;
    let comments;
    const testComments = [
        {id: 1,userId: 1, userName: 'Username', text: 'example-comment ', image: D, replies: [
                {id:2, userId: 2, userName: 'Username', text: 'example-reply', image: K }
            ]},
        {id: 2,userId: 2, userName: 'Username', text: 'example-comment ', image: K, replies: [
                {id:3, userId: 3, userName: 'Username', text: 'example-reply'}
            ]}
        ]

    if (true) {
        // comments = props.comments && props.comments.length && props.comments.map(comment => (
         comments = testComments.map(comment => (
            <Comment
                key={comment.id}
                userId={comment.userId}
                userName={comment.userName}
                text={comment.text}
                image={comment.img}
                gif={comment.gif}
                replies={comment.replies}
            />
        ))
        commentsSection = (
            <section className={classes.CommentsSection}>
                {comments}
            </section>
        )
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
                        <span className={classes.Date}>{props.date ? convertDatetime(props.date) + '          •' : '-- -- ---        •'}</span>
                        <div className={classes.PrivacyIconContainer}><div className={classes.PrivacyIcon}>{icon}</div></div>
                    </div>
                </div>
            </section>
            { body }
            {!props.image && !props.background && <div className={classes.Break}/>}
            {commentsSection}
            <section className={classes.ButtonsContainer}>
                <div className={classes.Button} onClick={() => imageUploader.current.click()}>
                    <div className={[classes.ButtonIcon, classes.Like].join(" ")}><Like /></div>
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
            <section className={classes.CommentBarSection}>
                <div className={classes.CommenterProfileImageContainer}>
                    <div className={classes.CommenterProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}}>
                        {props.profileImage ? null : <NoGenderPlaceholder />}
                    </div>
                </div>
                <div className={classes.CommentBar}>
                    <input  placeholder="Write a comment..." />
                    <div className={classes.CommentButtons}>
                        <div className={classes.CommentButtonIcon}><Smiley fill="#545353" /></div>
                        <div className={classes.CommentButtonIcon}><Camera fill="#545353" /></div>
                        <div className={[classes.CommentButtonIcon, classes.Gif].join(" ")}><Gif fill="#545353" /></div>
                    </div>
                </div>
            </section>
            <div className={classes.EnterCommentCaption}>
                <span>Press Enter To Post</span>
            </div>
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