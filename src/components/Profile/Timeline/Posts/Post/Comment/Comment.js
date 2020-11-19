
import React, { useState, useRef } from 'react';
import {connect} from 'react-redux'
import classes from './Comment.css';
import postClasses from '../Post.css'
import NoGenderPlaceholder from "../../../../../../assets/images/profile-placeholder-gender-neutral";
import Dots from '../../../../../../assets/images/dots';
import Smiley from "../../../../../../assets/images/smile";
import Camera from "../../../../../../assets/images/camera-outline";
import Gif from "../../../../../../assets/images/gif";
import OutsideAlerter from "../../../../../../hooks/outsideClickHandler";
import Reply from './Reply/Reply'
import Delete from "../../../../../../assets/images/delete";

import InlineDots from '../../../../../UI/Spinner/InlineDots';
import * as actions from '../../../../../../store/actions/index';


const comment = (props) => {

    const [replying, setReplying] = useState(false);
    const [editingComment, setEditingComment] = useState(false);
    const [editingDropdown, setEditingDropdown] = useState(false);
    const [editedCommentText, setEditedCommentText] = useState(null);
    const [editCommentImage, setEditCommentImage] = useState(null);

    const replyInput = useRef(null);
    const imageUploader = useRef(null);
    const gifUploader = useRef(null);

    const [replyText, setReplyText] = useState('');
    const [replyImage, setReplyImage] = useState(null);
    const [replyGif, setReplyGif] = useState(null);

    const updateReplyText = (event) => {
        setReplyText(event.target.value);
    }

    const imageUploadHandler = (event) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setReplyImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const gifUploadHandler = (event) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setReplyGif(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const toggleEditingButton = () => {
            setEditingComment(prevState => {
                return !prevState;
            });
    }

    const toggleEditingDropdown = () => {
        setEditingDropdown(prevState => {
            return !prevState;
        })
    }

    const closeEditingDropdown = () => {
        setEditingDropdown(false);
    }

    const toggleDeleteModal = () => {
       setEditingDropdown(false);
       props.passDeleteData(null,props.postsKey,'comment', 'DELETE_POST_COMMENT', props.postId, props.id);
       props.toggleDeleteModal();
    }

    const startReplyHandler = () => {
        setReplying(true);
        replyInput.current.offsetTop;
        replyInput.current.focus();
    }

    const saveReply = (event) => {
        event.preventDefault();
        const reply = {
            postsKey: props.postsKey,
            postId: props.postId,
            commentId: props.id,
            userId: props.userId,
            name: props.name,
            replyProfileImage: props.profileImage,
            text: replyText,
            image: replyImage,
            gif: replyGif
        }
        props.onPostReply(props.authToken, props.postsKey, props.postId, props.id, reply)
        setReplyText('');
        setReplying(false);
        setReplyImage(null);
        setReplyGif(null);
    }

    const updateCommentEdits = (event) => {
        setEditedCommentText(event.target.value);
    }

    const saveCommentEdits = () => {

    }

    const editDropDown = (
        <div className={classes.EditDropdownContainer} style={{display: editingDropdown ? 'flex' : 'none'}}>
            <div className={classes.BaseArrow} />
            <div className={classes.EditDropdownButton}>Edit</div>
            <div className={classes.EditDropdownButton} onClick={toggleDeleteModal}>Delete</div>
        </div>
    )

    let replies;
    if (props.replies) {
        replies = props.replies && props.replies.length ? props.replies.map(reply => (
            <Reply
                postsKey={props.postsKey}
                postId={props.postId}
                commentId={props.id}
                key={reply.id}
                id={reply.id}
                name={reply.name}
                replyProfileImage={reply.replyProfileImage}
                text={reply.text}
                image={reply.image}
                gif={reply.gif}
                startReply={startReplyHandler}
                passDeleteData={props.passDeleteData}
                toggleDeleteModal={props.toggleDeleteModal}
            />
        )) : null;
    }

    if (props.deletingReply) {
        replies = <InlineDots />
    }

    let replyBar = (
        <section className={classes.CommentBarSection} style={{display: replying ? 'flex' : 'none'}}>
            <div className={classes.CommenterProfileImageContainer}>
                <div className={classes.CommenterProfileImage} style={{backgroundImage: props.commentProfileImage ? `url(${props.commentProfileImage})` : null}}>
                    {props.commentProfileImage ? null : <NoGenderPlaceholder />}
                </div>
            </div>
            <form className={classes.ReplyForm} onSubmit={saveReply}>
            <div className={classes.CommentBar}>
                <input  ref={replyInput} placeholder="Write a comment..." value={replyText} onChange={(event) => updateReplyText(event)}/>
                <div className={classes.CommentButtons}>
                    <div className={classes.CommentButtonIcon}><Smiley fill="#545353" /></div>
                    <div className={classes.CommentButtonIcon} onClick={() => imageUploader.current.click()}><Camera fill="#545353" /></div>
                    <div className={[classes.CommentButtonIcon, classes.Gif].join(" ")} onClick={() => gifUploader.current.click()}><Gif fill="#545353" /></div>
                </div>
            </div>
            </form>
        </section>
    )

    if (props.loadingNewReply) {
        replyBar = <InlineDots />
    }

    let replyImagePreview = (
        <div className={classes.ReplyImagePreviewContainer}>
            <section className={postClasses.CommentImagePreviewSection} style={{display: replyImage ? 'flex' : 'none'}}>
                <div className={postClasses.CommentImagePreviewContainer} style={{backgroundImage: replyImage ? `url(${replyImage}` : null}} onClick={() => imageUploader.current.click()}></div>
                <div className={postClasses.CancelCommentImagePreviewButton} onClick={() => setReplyImage(null)}><Delete /></div>
            </section>
        </div>
    )

    let editCommentImagePreview = (
        <section className={classes.CommentImagePreviewSection} style={{display: editCommentImage ? 'flex' : 'none'}}>
            <div className={classes.CommentImagePreviewContainer} style={{backgroundImage: editCommentImage ? `url(${editCommentImage}` : null}} onClick={() => imageUploader.current.click()}></div>
            <div className={classes.CancelCommentImagePreviewButton} onClick={() => setEditCommentImage(null)}><Delete /></div>
        </section>
    )

    const editCommentBar = (
        <div className={classes.EditCommentForm}>
        <section className={postClasses.CommentBarSection}>
            <div className={postClasses.CommenterProfileImageContainer}>
                <div className={postClasses.CommenterProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}}>
                    {props.profileImage ? null : <NoGenderPlaceholder />}
                </div>
            </div>
            <form onSubmit={saveCommentEdits} className={postClasses.CommentForm}>
                <div className={postClasses.CommentBar}>
                    <input  placeholder="Write a comment..." value={editedCommentText} onChange={(event) => updateCommentEdits(event)}/>
                    <div className={postClasses.CommentButtons}>
                        <div className={postClasses.CommentButtonIcon}><Smiley fill="#545353" /></div>
                        <div className={postClasses.CommentButtonIcon} onClick={() => imageUploader.current.click()}><Camera fill="#545353" /></div>
                        <div className={[postClasses.CommentButtonIcon, postClasses.Gif].join(" ")} onClick={() => gifUploader.current.click()}><Gif fill="#545353" /></div>
                    </div>
                </div>
            </form>
        </section>
        {editCommentImagePreview}
        </div>
    )


    let comment = (
        <div className={classes.Comment} >
            <div className={classes.CommentContainer} onMouseEnter={() => toggleEditingButton()} onMouseLeave={() => toggleEditingButton()}>
                <div className={classes.CommenterProfileImageContainer}>
                    <div className={classes.CommenterProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}}>
                        {props.commentProfileImage ? null : <NoGenderPlaceholder />}
                    </div>
                </div>
                <div className={classes.CommentBubbleContainer}>
                    <div className={classes.CommentBubbleAndEditButtonContainer}>
                        <div className={classes.CommentBubble}>
                            <h5 className={classes.CommenterName}>{props.userName}</h5>
                            <div className={classes.CommentText}>
                                <span>{props.text}</span>
                            </div>
                        </div>
                        <OutsideAlerter action={closeEditingDropdown}>
                            <div className={classes.EditOptionsPositioner}>
                                {editDropDown}
                                <div className={classes.EditButton} style={{display: editingComment || editingDropdown ? 'block' : 'none'}} onClick={toggleEditingDropdown}><Dots /></div>
                            </div>
                        </OutsideAlerter>
                    </div>
                    {props.image || props.gif ?  <div className={classes.AttachedImage} style={{backgroundImage: `url(${props.image || props.gif})`}}></div> : null}
                    <div className={classes.CommentBubbleOptionButtons}>
                        <div className={classes.CommentBubbleButton}>Like</div>
                        <span className={classes.InterPoint}>{"•"}</span>
                        <div className={classes.CommentBubbleButton} onClick={startReplyHandler}>Reply</div>
                    </div>
                </div>
            </div>
            {replies}
            {replyBar}
            {replyImagePreview}
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
    )

    if (props.deletingComment) {
        comment = <InlineDots />
    }

    return comment;
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        profileImage: state.profile.profileImage,
        name: state.profile.firstName + ' ' + state.profile.lastName,
        loadingNewReply: state.posts.loadingNewReply,
        deletingReply: state.posts.deletingReply,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostReply: (authToken, postsKey, postId, commentId, reply) => dispatch(actions.addReplyAttempt(authToken, postsKey, postId, commentId, reply))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(comment);