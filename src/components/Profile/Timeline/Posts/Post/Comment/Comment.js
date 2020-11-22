
import React, { useState, useRef, useEffect, useCallback } from 'react';
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

    useEffect(() => {
        document.addEventListener("keydown", escapeEditingForm, false)
        return () => {
            document.removeEventListener("keydown", escapeEditingForm, false)
        }
    }, [])

    const [replying, setReplying] = useState(false);
    const [hoveringComment, setHoveringComment] = useState(false);
    const [editingDropdown, setEditingDropdown] = useState(false);

    const [editingComment, setEditingComment] = useState(false);
    const [editCommentText, setEditCommentText] = useState(null);
    const [editCommentImage, setEditCommentImage] = useState(null);
    const [editCommentGif, setEditCommentGif] = useState(null);
    const editImageUploader = useRef(null);
    const editGifUploader = useRef(null);

    const replyInput = useRef(null);
    const replyImageUploader = useRef(null);
    const replyGifUploader = useRef(null);

    const [replyText, setReplyText] = useState('');
    const [replyImage, setReplyImage] = useState(null);
    const [replyGif, setReplyGif] = useState(null);
    const [showGifSelector, setShowGifSelector] = useState(false);

    const updateReplyText = (event) => {
        setReplyText(event.target.value);
    }

    const replyImageUploadHandler = (event) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setReplyImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const replyGifUploadHandler = (event) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setReplyGif(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }


    const editImageUploadHandler = (event) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setEditCommentImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const editGifUploadHandler = (event) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setEditCommentGif(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const showEditingButton = () => {
        setHoveringComment(true);
    }

    const hideEditingButton = () => {
        setHoveringComment(false);
    }

    const toggleEditingDropdown = () => {
        setEditingDropdown(prevState => {
            return !prevState;
        })
    }

    const closeEditingDropdown = () => {
        setEditingDropdown(false);
    }

    const toggleGifSelector = () => {
        setShowGifSelector(prevState => {
            return !prevState;
        })
    }

    const closeGifSelector = () => {
        setShowGifSelector(false)
    };

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

    const openEditingForm = () => {
        setEditCommentText(props.text);
        setEditCommentImage(props.image);
        setEditCommentGif(props.gif);
        setEditingComment(true);
        toggleEditingDropdown();
    }

    const closeEditingForm = () => {
        setEditCommentText(null);
        setEditCommentImage(null);
        setEditCommentGif(null);
        setEditingComment(false);
    }

    const escapeEditingForm = useCallback((event) => {
        if (event.keyCode === 27) {
            setEditingComment(false);
        }
    }, [])

    const updateCommentEdits = (event) => {
        setEditCommentText(event.target.value);
    }

    const saveCommentEdits = (event) => {
        event.preventDefault()
        const newComment = {
            postsKey: props.postsKey,
            userId: props.userId,
            postId: props.postId,
            id: props.id,
            name: props.name,
            commentProfileImage: props.profileImage,
            text: editCommentText,
            image: editCommentImage,
            gif: editCommentGif,
            replies: props.replies
        };
        props.onEditComment(props.authToken, props.postsKey, props.postId, props.id, newComment);
        console.log('new comment', newComment);
        setEditingComment(false);
    }

    const editDropDown = (
        <div className={classes.EditDropdownContainer} style={{display: editingDropdown ? 'flex' : 'none'}}>
            <div className={classes.BaseArrow} />
            <div className={classes.EditDropdownButton} onClick={openEditingForm}>Edit</div>
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
                        <div className={classes.CommentButtonIcon} onClick={() => replyImageUploader.current.click()}><Camera fill="#545353" /></div>
                        <div className={[classes.CommentButtonIcon, classes.Gif].join(" ")} onClick={toggleGifSelector}><Gif fill="#545353" /></div>
                    </div>
                </div>
                <input
                    ref={replyImageUploader}
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={replyImageUploadHandler}
                    style={{
                        display: "none"
                    }}
                />
                <input
                    ref={replyGifUploader}
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={replyGifUploadHandler}
                    style={{
                        display: "none"
                    }}
                />
            </form>
        </section>
    )

    if (props.loadingNewReply) {
        replyBar = <InlineDots />
    }

    let replyImagePreview = (
        <div className={classes.ReplyImagePreviewContainer}>
            <section className={postClasses.CommentImagePreviewSection} style={{display: replyImage ? 'flex' : 'none'}}>
                <div className={postClasses.CommentImagePreviewContainer} style={{backgroundImage: replyImage ? `url(${replyImage}` : null}} onClick={() => replyImageUploader.current.click()}></div>
                <div className={postClasses.CancelCommentImagePreviewButton} onClick={() => setReplyImage(null)}><Delete /></div>
            </section>
        </div>
    )

    let editCommentImagePreview = (
        <section className={postClasses.CommentImagePreviewSection} style={{display: editCommentImage ? 'flex' : 'none'}}>
            <div className={postClasses.CommentImagePreviewContainer} style={{backgroundImage: editCommentImage ? `url(${editCommentImage}` : null}} onClick={() => editImageUploader.current.click()}></div>
            <div className={postClasses.CancelCommentImagePreviewButton} onClick={() => setEditCommentImage(null)}><Delete /></div>
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
                        <input  placeholder="Write a comment..." value={editCommentText} onChange={(event) => updateCommentEdits(event)}/>
                        <div className={postClasses.CommentButtons}>
                            <div className={postClasses.CommentButtonIcon}><Smiley fill="#545353" /></div>
                            <div className={postClasses.CommentButtonIcon} onClick={() => editImageUploader.current.click()}><Camera fill="#545353" /></div>
                            <div className={[postClasses.CommentButtonIcon, postClasses.Gif].join(" ")} onClick={() => editGifUploader.current.click()}><Gif fill="#545353" /></div>
                        </div>
                    </div>
                    <input
                        ref={editImageUploader}
                        type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={editImageUploadHandler}
                        style={{
                            display: "none"
                        }}
                    />
                    <input
                        ref={editGifUploader}
                        type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={editGifUploadHandler}
                        style={{
                            display: "none"
                        }}
                    />
                </form>
            </section>
            {editCommentImagePreview}
            <section className={classes.CancelEditingSection}>
                <span className={classes.CancelEditingCaption}>Press Esc to <span className={classes.CancelEditingButton} onClick={closeEditingForm}>cancel</span></span>
            </section>
        </div>
    )


    let commentContent = (
        <div className={classes.CommentContainer} onMouseEnter={() => showEditingButton()} onMouseLeave={() => hideEditingButton()}>
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
                            <div className={classes.EditButton} style={{display: hoveringComment || editingDropdown ? 'block' : 'none'}} onClick={toggleEditingDropdown}><Dots /></div>
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
    )

    if (editingComment) {
        commentContent = editCommentBar;
    }

    if (props.commentEditSaving) {
        commentContent = <InlineDots />
    }

    let comment = (
        <div className={classes.Comment} >
            {commentContent}
            {replies}
            {replyBar}
            {replyImagePreview}
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
        commentEditSaving: state.posts.editingComment,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostReply: (authToken, postsKey, postId, commentId, reply) => dispatch(actions.addReplyAttempt(authToken, postsKey, postId, commentId, reply)),
        onEditComment: (authToken, postsKey, postId, commentId, newComment) => dispatch(actions.editCommentAttempt(authToken, postsKey, postId, commentId, newComment))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(comment);