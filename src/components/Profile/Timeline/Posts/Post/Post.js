

import React, { useState, useContext, useRef, useEffect } from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './Post.css'

import Comment from './Comment/Comment';
import Reactions from './Reaction/Reactions';
import GifSelector from './Dropdowns/Gifs/GifSelector';
import EmojiSelector from './Dropdowns/Emojis/EmojiSelector'
import EditOwnPostDropdown from './Dropdowns/EditPost/EditOwnPost';
import EditOthersPostDropdown from './Dropdowns/EditPost/EditOthersPost';
import ProfileSummary from '../../../../Users/Dropdowns/ProfileSummary/ProfileSummary';

import NoGenderPlaceholder from '../../../../../assets/images/profile-placeholder-gender-neutral';
import Dots from '../../../../../assets/images/dots'
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
import { DeleteContext } from "../../../../../context/delete-context";
import {convertDashedDatetime} from "../../../../../shared/utility";
import OutsideAlerter from "../../../../../hooks/outsideClickHandler";
import * as actions from "../../../../../store/actions";


const post = (props) => {

    const postContext = useContext(PostContext);
    const deleteContext = useContext(DeleteContext);

    const imageUploader = useRef(null);
    const commentInput = useRef(null);

    const [viewingSummary, setViewingSummary] = useState(false);

    const [showComments, setShowComments] = useState(true);
    const [editingDropdown, setEditingDropdown] = useState(false);

    const [commentText, setCommentText] = useState('');
    const [commentImage, setCommentImage] = useState(null);
    const [commentGif, setCommentGif] = useState(null);

    const [showEmojiSelector, setShowEmojiSelector] = useState(null);
    const [showGifSelector, setShowGifSelector] = useState(false);

    useEffect(() => {
        return () => {
            if (summaryOpeningTimer) {
                summaryOpeningTimer = null;
            }
            if (summaryClosingTimer) {
                summaryClosingTimer = null;
            }
        }
    }, [])

    let summaryOpeningTimer;
    const startViewingSummary = () => {
        summaryOpeningTimer = setTimeout(() => {
            setViewingSummary(true);
        }, 500)
    }

    const cancelOpenSummary = () => {
        clearTimeout(summaryOpeningTimer)
    }

    let summaryClosingTimer;
    const startClosingViewingSummary = () => {
        summaryClosingTimer = setTimeout(() => {
            setViewingSummary(false)
        }, 200)
    }

    const quickCloseSummary = () => {
        setViewingSummary(false);
    }

    const cancelCloseSummary = () => {
        clearTimeout(summaryClosingTimer);
    }

    const enterProfileImage = () => {
        startViewingSummary();
        if (summaryClosingTimer) {
            cancelCloseSummary();
        }
    }

    const leaveProfileImage = () => {
        cancelOpenSummary()
        if (viewingSummary) {
            startClosingViewingSummary()
        }
    }

    const toggleComments = () => {
        setShowComments(prevState => {
            return !prevState;
        })
    }

    let emojiOpeningTimer;
    const startOpeningEmojiSelector = () => {
        emojiOpeningTimer = setTimeout(() => {
            setShowEmojiSelector(true);
        }, 500);
    }

    const cancelOpenEmojiSelector = () => {
        clearTimeout(emojiOpeningTimer)
    }

    let emojiClosingTimer;
    const startCloseEmojiSelector = () => {
        emojiClosingTimer = setTimeout(() => {
            setShowEmojiSelector(false);
        }, 700)
    }

    const cancelCloseEmojiSelector = () => {
        clearTimeout(emojiClosingTimer);
    }

    const enterLikeButton = () => {
        startOpeningEmojiSelector()
        if (emojiClosingTimer) {
            cancelCloseEmojiSelector()
        }
    }

    const leaveLikeButton = () => {
        cancelOpenEmojiSelector()
        if (setShowEmojiSelector) {
            startCloseEmojiSelector()
        }
    }

    const quickToggleEmojiSelector = () => {
        setShowEmojiSelector(true);
    }

    const quickCloseEmojiSelector = () => {
        setShowEmojiSelector(false);
    }

    const toggleGifSelector = () => {
        setShowGifSelector(prevState => {
            return !prevState;
        });
    }

    const closeGifSelector = () => {
        setShowGifSelector(false);
    }

    const toggleEditDropDown = () => {
        setEditingDropdown(prevState => {
            return !prevState;
        })
    }

    const cancelEditDropdown = () => {
        setEditingDropdown(false);
    }

    const postReactionHandler = (caption) => {
        const reaction = {
            userId: props.userId,
            name: props.name,
            caption: caption
        }
        console.log(reaction);
        props.onPostReaction(props.authToken,props.postsKey, props.id, reaction);
        quickCloseEmojiSelector()
    }

    const startCommentHandler = () => {
        commentInput.current.offsetTop;
        commentInput.current.focus();
    }

    const toggleDeleteModal = () => {
        cancelEditDropdown()
        deleteContext.passData(null,props.id,'post','DELETE_POST')
        deleteContext.toggleModal();
    }

    const toggleEditModal = () => {
        cancelEditDropdown();
        postContext.toggleEditingPost();
        postContext.recordInitialValues(props.status || '',props.image || null, props.background || null, props.tagged || [], props.location || null)
        postContext.passData('text',props.status || '');
        postContext.passData('image',props.image || null);
        postContext.passData('background',props.background || null);
        postContext.passData('location',props.location || null);
        postContext.passData('tags',props.tagged && props.tagged.length ? props.tagged : []);
        postContext.passData('comments', props.comments && props.comments.length ? props.comments : []);
        postContext.passData('postsKey', props.postsKey || null);
        postContext.passData('userKey', props.userKey || null);
        postContext.passData('postProfileImage', props.postProfileImage || null);
        postContext.passData('postId', props.id || null);
        postContext.toggleModal();
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
            userKey: props.userKey,
            userId: props.userId,
            name: props.name,
            commentProfileImage: props.profileImage,
            text: commentText,
            image: commentImage,
            gif: commentGif,
        }
        props.onPostComment(props.authToken, props.postsKey, props.id, comment)
        setCommentText('');
        setCommentImage(null);
        setCommentGif(null);
    }

    const saveGif = (gifUrl) => {
        const comment = {
            postsKey: props.postsKey,
            userId: props.userId,
            name: props.name,
            commentProfileImage: props.profileImage,
            text: commentText,
            image: commentImage,
            gif: gifUrl,
        };
        props.onPostComment(props.authToken, props.postsKey, props.id, comment);
        setShowGifSelector(false);
        setCommentText('');
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

    let editDropDown;
    if (props.firebaseKey === props.userKey) {
        editDropDown = <EditOwnPostDropdown editingDropdown={editingDropdown} toggleEditModal={toggleEditModal} toggleDeleteModal={toggleDeleteModal}/>
    } else {
        editDropDown = <EditOthersPostDropdown editingDropdown={editingDropdown} posterName={props.posterName}/>
    }


    let editingDropdownButtonClasses = [classes.HeaderControlDropdown]
    if (editingDropdown) {
        editingDropdownButtonClasses.push(classes.ActiveEditingDropdown)
    }

    let emojiSelectMenu;
    if (showEmojiSelector) {
        emojiSelectMenu = <EmojiSelector handleReaction={postReactionHandler}/>
    }

    let gifSelectMenu;
    if (showGifSelector) {
        gifSelectMenu = <GifSelector save={saveGif}/>
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
    if (showComments) {
        postsComments = props.comments && props.comments.length ? props.comments.map(comment => (
            <Comment
                postsKey={props.postsKey}
                postId={props.id}
                key={comment.id}
                id={comment.id}
                userId={comment.userId}
                userName={comment.name}
                commentProfileImage={comment.commentProfileImage}
                text={comment.text}
                image={comment.image}
                gif={comment.gif}
                replies={comment.replies}
                passDeleteData={deleteContext.passData}
                toggleDeleteModal={deleteContext.toggleModal}
            />
        )) : null;

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

    let postReactions;
    if (props.reactions && props.reactions.length) {
        postReactions = <Reactions reactions={props.reactions}/>
    }

    if (props.addingPostReaction) {
        postReactions = <InlineDots/>
    }

    let postCommentCount;
    if (props.comments && props.comments.length) {
        const countComments = props.comments.length;
        const countReplies = props.comments.map(comment => {
            if (comment.replies && comment.replies.length) {
                return comment.replies.length
            } else {
                return 0
            }
        })
            .reduce((a,b) => a + b, 0);
        postCommentCount = <span className={classes.PostCommentCount} onClick={toggleComments}>{`${countComments + countReplies} comments`}</span>
    }

    let postReactionSection;
    if (postCommentCount || postReactions) {
        postReactionSection = (
            <section className={classes.PostReactionSection} style={{borderTop: !props.image && !props.background ? '1px solid #cccccc' : null}}>
                {postReactions}
                {postCommentCount}
            </section>
        );
    }

    let taggedFriends;
    let names;
    if (props.tagged && props.tagged.length) {
        if (props.tagged.length === 1) {
            taggedFriends = <span> is with <b>{props.tagged[0].name}</b></span>;
        } else if (props.tagged.length === 2) {
            taggedFriends = <span> is with <b>{props.tagged[0].name}</b> and <b>{props.tagged[1].name}</b></span>;
        } else if (props.tagged.length > 2){
            const nameList = props.tagged.map(tag => tag.name);
            let last = nameList.pop()
            last = ' and ' + last
            names = nameList.join(", ")
            names = names + last
            taggedFriends = <span> is with <b>{names}</b></span>
        }
    }

    let location;
    if (props.postLocation) {
        location = <span> in <b>{props.postLocation}</b></span>
    }

    let profileImage;
    if (props.firebaseKey === props.userKey) {
        profileImage = props.profileImage
    } else if (props.postProfileImage) {
        profileImage = props.postProfileImage
    }

    let profileSummary;
    if (viewingSummary) {
        profileSummary = <ProfileSummary userType={props.userType} userKey={props.userKey} publicProfileKey={props.publicProfileKey} myFriends={props.friends} onMouseEnter={cancelCloseSummary} onMouseLeave={startClosingViewingSummary}/>
    }

    let other;
    if (props.postedToOther && props.otherUser) {
        other = <div className={classes.Other}> &rsaquo; <b className={classes.OtherUserName} onClick={() => props.history.push(`/${props.pagePosted ? 'page' : 'user-profile'}/${props.otherUser.userKey}`)}>{props.otherUser.name}</b></div>
    }

    return (
        <div className={classes.Container}>
            <section className={classes.Header}>
                <div className={classes.HeaderInfo}>
                    <div className={classes.ProfileImageContainer}>
                        <div className={classes.ProfileImage} style={{backgroundImage: profileImage ? `url(${profileImage})` : null}} onMouseEnter={enterProfileImage} onMouseLeave={leaveProfileImage} onClick={() => props.navToFullProfile(props.userKey)}>
                            {profileImage ? null : <NoGenderPlaceholder />}
                        </div>
                        <OutsideAlerter action={quickCloseSummary}>
                            {profileSummary}
                        </OutsideAlerter>
                    </div>
                    <div className={classes.IdContainer}>
                        <div className={classes.NameContainer}>{props.posterName && props.posterName}{taggedFriends}{location}{other}</div>
                        <div className={classes.DateAndPrivacyContainer}>
                            <span className={classes.Date}>{props.date ? convertDashedDatetime(props.date.toString()) + '          •' : '-- -- ---        •'}</span>
                            <div className={classes.PrivacyIconContainer}><div className={classes.PrivacyIcon}>{icon}</div></div>
                        </div>
                    </div>
                </div>
                <OutsideAlerter action={cancelEditDropdown}>
                    <div className={classes.EditOptionsPositioner}>
                        {editDropDown}
                        <div className={editingDropdownButtonClasses.join(" ")} onClick={toggleEditDropDown}><Dots /></div>
                    </div>
                </OutsideAlerter>
            </section>
            { body }
            { postReactionSection }
            {!props.image && !props.background || props.comments || props.reactions ? <div className={classes.Break}/> : null}
            <section className={classes.ButtonsContainer}>
                <OutsideAlerter action={quickCloseEmojiSelector}>
                    <div className={classes.GifMenuPositioner} onMouseEnter={cancelCloseEmojiSelector} onMouseLeave={startCloseEmojiSelector}>
                        {emojiSelectMenu}
                    </div>
                </OutsideAlerter>
                <div className={classes.Button} onMouseEnter={enterLikeButton} onMouseLeave={leaveLikeButton} onClick={quickToggleEmojiSelector} style={{backgroundColor: showEmojiSelector ? 'rgba(0,0,0,0.05)' : null }}>
                    <div className={[classes.ButtonIcon, classes.Like].join(" ")} ><Like /></div>
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
                            <OutsideAlerter action={closeGifSelector}>
                                <div className={classes.GifMenuPositioner}>
                                    {gifSelectMenu}
                                    <div className={[classes.CommentButtonIcon, classes.Gif].join(" ")} onClick={toggleGifSelector} style={{backgroundColor: showGifSelector ? 'rgba(0,0,0,0.05)' : null}}><Gif fill="#545353" /></div>
                                </div>
                            </OutsideAlerter>
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
        friends: state.profile.friends,
        loadingNewComment: state.posts.loadingNewComment,
        addingPostReaction: state.posts.addingPostReaction,
        editingPostReaction: state.posts.editingPostReaction
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSelfPosts: (authToken, postsKey) => dispatch(actions.fetchSelfPostsAttempt(authToken, postsKey)),
        onPostComment: (authToken, postsKey, postId, comment) => dispatch(actions.addCommentAttempt(authToken, postsKey, postId, comment)),
        onPostReaction: (authToken, postsKey, postId, reaction) => dispatch(actions.addPostReactionAttempt(authToken, postsKey, postId, reaction)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(post));