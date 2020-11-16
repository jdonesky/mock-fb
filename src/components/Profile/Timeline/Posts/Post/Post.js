

import React, { useState, useContext, useRef, useEffect} from 'react';
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
import Delete from "../../../../../assets/images/delete";

import InlineDots from '../../../../UI/Spinner/InlineDots'

import { PostContext } from "../../../../../context/post-context";
import {convertDashedDatetime} from "../../../../../shared/utility";
import * as actions from "../../../../../store/actions";


const post = (props) => {

    const postContext = useContext(PostContext)
    const imageUploader = useRef(null);
    const gifUploader = useRef(null);
    const commentInput = useRef(null);

    const [commentText, setCommentText] = useState('');
    const [commentImage, setCommentImage] = useState(null);
    const [commentGif, setCommentGif] = useState(null);

    const startCommentHandler = () => {
        commentInput.current.offsetTop;
        commentInput.current.focus();
    }

    const updateCommentText = (event) => {
        setCommentText(event.target.value)
    }

    const imageUploadHandler = (event) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
               setCommentImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const saveComment = (event) => {
        event.preventDefault();
        const comment = {
            postsKey: props.postsKey,
            userId: props.userId,
            name: props.name,
            profileImage: props.profileImage,
            text: commentText,
            image: commentImage,
            gif: commentGif,
        }
        props.onPostComment(props.authToken, props.postsKey, props.id, comment)
    }

    const gifUploadHandler = (event) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCommentGif(event.target.result);
            };
            reader.readAsDataURL(file);
        }
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
    let postsComments;
    if (true) {
        postsComments = props.comments && props.comments.length && props.comments.map(comment => (
            <Comment
                postsKey={props.postsKey}
                key={comment.id}
                postId={props.id}
                id={comment.id}
                userId={comment.userId}
                userName={comment.name}
                profileImage={comment.profileImage}
                text={comment.text}
                image={comment.image}
                gif={comment.gif}
                replies={comment.replies}
            />
        ))

        let loadingNewCommentIndicator;
        if (props.loadingNewComment) {
            loadingNewCommentIndicator = <InlineDots />
        }

        commentsSection = (
            <section className={classes.CommentsSection}>
                {postsComments}
                {loadingNewCommentIndicator}
            </section>
        )
    }

    let commentImagePreview = (
        <section className={classes.CommentImagePreviewSection} style={{display: commentImage ? 'flex' : 'none'}}>
            <div className={classes.CommentImagePreviewContainer} style={{backgroundImage: commentImage ? `url(${commentImage}` : null}} onClick={() => imageUploader.current.click()}></div>
            <div className={classes.CancelCommentImagePreviewButton} onClick={() => setCommentImage(null)}><Delete /></div>
        </section>
    )

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
                        <span className={classes.Date}>{props.date ? convertDashedDatetime(props.date) + '          •' : '-- -- ---        •'}</span>
                        <div className={classes.PrivacyIconContainer}><div className={classes.PrivacyIcon}>{icon}</div></div>
                    </div>
                </div>
            </section>
            { body }
            {!props.image && !props.background && <div className={classes.Break}/>}
            <section className={classes.ButtonsContainer}>
                <div className={classes.Button}>
                    <div className={[classes.ButtonIcon, classes.Like].join(" ")}><Like /></div>
                    <span>Like</span>
                </div>
                <div className={classes.Button}  onClick={startCommentHandler}>
                    <div className={[classes.ButtonIcon,classes.Comment].join(" ")}><SpeechBubble /></div>
                    <span>Comment</span>
                </div>
            </section>
            <div className={classes.Break} />
            {commentsSection}
            <section className={classes.CommentBarSection}>
                <div className={classes.CommenterProfileImageContainer}>
                    <div className={classes.CommenterProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}}>
                        {props.profileImage ? null : <NoGenderPlaceholder />}
                    </div>
                </div>
                <form onSubmit={saveComment} className={classes.CommentForm}>
                    <div className={classes.CommentBar}>
                        <input  placeholder="Write a comment..." value={commentText} onChange={(event) => updateCommentText(event)} ref={commentInput}/>
                        <div className={classes.CommentButtons}>
                            <div className={classes.CommentButtonIcon}><Smiley fill="#545353" /></div>
                            <div className={classes.CommentButtonIcon} onClick={() => imageUploader.current.click()}><Camera fill="#545353" /></div>
                            <div className={[classes.CommentButtonIcon, classes.Gif].join(" ")} onClick={() => gifUploader.current.click()}><Gif fill="#545353" /></div>
                        </div>
                    </div>
                </form>
            </section>
            {commentImagePreview}
            <div className={classes.EnterCommentCaption}>
                <span>Press Enter To Post</span>
            </div>
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
            <input
                ref={gifUploader}
                type="file"
                accept="image/*"
                multiple={false}
                onChange={gifUploadHandler}
                style={{
                    display: "none"
                }}
            />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        userId: state.profile.userId,
        profileImage: state.profile.profileImage,
        name: state.profile.firstName + ' ' + state.profile.lastName,
        loadingNewComment: state.posts.loadingNewComment
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostComment: (authToken, postsKey, postId, comment) => dispatch(actions.addCommentAttempt(authToken, postsKey, postId, comment)),
        onFetchSelfPosts: (authToken, postsKey) => dispatch(actions.fetchSelfPostsAttempt(authToken, postsKey))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(post);