
import React, {useState, useEffect, useRef, useCallback} from 'react';
import { connect } from 'react-redux';
import classes from "../Comment.css";
import * as actions from '../../../../../../../store/actions/index'
import NoGenderPlaceholder from "../../../../../../../assets/images/profile-placeholder-gender-neutral";
import Dots from "../../../../../../../assets/images/dots";
import OutsideAlerter from "../../../../../../../hooks/outsideClickHandler";
import Smiley from "../../../../../../../assets/images/smile";
import Camera from "../../../../../../../assets/images/camera-outline";
import Gif from "../../../../../../../assets/images/gif";
import postClasses from "../../Post.css";
import Delete from "../../../../../../../assets/images/delete";
import InlineDots from '../../../../../../UI/Spinner/InlineDots'

const reply = (props) => {

    useEffect(() => {
        document.addEventListener("keydown", escapeEditingForm, false)
        return () => {
            document.removeEventListener("keydown", escapeEditingForm, false)
        }
    }, [])

    const escapeEditingForm = useCallback((event) => {
        if (event.keyCode === 27) {
            setEditingReply(false);
        }
    }, [])

    const [hoveringReply, setHoveringReply] = useState(false);
    const [editingDropdown, setEditingDropdown] = useState(false);

    const [editingReply, setEditingReply] = useState(false);
    const [editReplyText, setEditReplyText] = useState(null);
    const [editReplyImage, setEditReplyImage] = useState(null);
    const [editReplyGif, setEditReplyGif] = useState(null);
    const editImageUploader = useRef(null);
    const editGifUploader = useRef(null);

    const editImageUploadHandler = (event) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setEditReplyImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const editGifUploadHandler = (event) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setEditReplyGif(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const toggleDeleteModal = () => {
        closeEditDropdown();
        props.passDeleteData(null, props.postsKey, 'reply', 'DELETE_POST_REPLY', props.postId, props.commentId, props.id);
        props.toggleDeleteModal();
    }

    const showEditingButton = () => {
        setHoveringReply(true);
    }

    const hideEditingButton = () => {
        setHoveringReply(false);
    }

    const toggleEditDropdown = () => {
        setEditingDropdown(prevState => {
            return !prevState;
        })
    }

    const closeEditDropdown = () => {
        setEditingDropdown(false);
    }

    const openEditReplyForm = () => {
        setEditReplyText(props.text);
        setEditReplyImage(props.image);
        setEditReplyGif(props.gif);
        setEditingReply(true);
        toggleEditDropdown();
    }

    const closeEditReplyForm = () => {
        setEditReplyText(null);
        setEditReplyImage(null);
        setEditReplyGif(null);
        setEditingReply(false);
    }

    const updateEditReplyText = (event) => {
        setEditReplyText(event.target.value);
    }

    const saveReplyEdits = (event) => {
        event.preventDefault();
        const newReply = {
            postsKey: props.postsKey,
            postId: props.postId,
            commentId: props.commentId,
            id: props.id,
            name: props.name,
            replyProfileImage: props.replyProfileImage,
            text: editReplyText,
            image: editReplyImage,
            gif: editReplyGif
        }
        props.onEditReply(props.authToken, props.postsKey, props.postId, props.commentId, props.id, newReply);
        setEditReplyText(null);
        setEditReplyImage(null);
        setEditReplyGif(null);
        setEditingReply(false);
        closeEditReplyForm();
    }

    const editDropDown = (
        <div className={classes.EditDropdownContainer} style={{display: editingDropdown ? 'flex' : 'none'}}>
            <div className={classes.BaseArrow} />
            <div className={classes.EditDropdownButton} onClick={openEditReplyForm}>Edit</div>
            <div className={classes.EditDropdownButton} onClick={toggleDeleteModal}>Delete</div>
        </div>
    )

    let replyBar = (
        <section className={classes.CommentBarSection}>
            <div className={classes.CommenterProfileImageContainer}>
                <div className={classes.CommenterProfileImage} style={{backgroundImage: props.commentProfileImage ? `url(${props.commentProfileImage})` : null}}>
                    {props.commentProfileImage ? null : <NoGenderPlaceholder />}
                </div>
            </div>
            <form className={classes.ReplyForm} onSubmit={saveReplyEdits}>
                <div className={classes.CommentBar}>
                    <input placeholder="Write a comment..." value={editReplyText} onChange={(event) => updateEditReplyText(event)}/>
                    <div className={classes.CommentButtons}>
                        <div className={classes.CommentButtonIcon}><Smiley fill="#545353" /></div>
                        <div className={classes.CommentButtonIcon} onClick={() => editImageUploader.current.click()}><Camera fill="#545353" /></div>
                        <div className={[classes.CommentButtonIcon, classes.Gif].join(" ")} onClick={() => editGifUploader.current.click()}><Gif fill="#545353" /></div>
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
    )

    let editReplyImagePreview = (
        <div className={classes.ReplyImagePreviewContainer}>
            <section className={postClasses.CommentImagePreviewSection} style={{display: editReplyImage ? 'flex' : 'none'}}>
                <div className={postClasses.CommentImagePreviewContainer} style={{backgroundImage: editReplyImage ? `url(${editReplyImage}` : null}} onClick={() => editImageUploader.current.click()}></div>
                <div className={postClasses.CancelCommentImagePreviewButton} onClick={() => setEditReplyImage(null)}><Delete /></div>
            </section>
        </div>
    )

    const editReplyForm = (
        <div className={classes.EditReplyForm}>
            {replyBar}
            {editReplyImagePreview}
            <section className={classes.CancelEditingSection} style={{marginLeft: "55px"}}>
                <span className={classes.CancelEditingCaption}>Press Esc to <span className={classes.CancelEditingButton} onClick={closeEditReplyForm}>cancel</span></span>
            </section>
        </div>
    )

    let reply =  (
        <div className={classes.Reply} onMouseEnter={() => showEditingButton()} onMouseLeave={() => hideEditingButton()}>
            <div className={classes.Comment}>
                <div className={classes.CommentContainer}>
                    <div className={classes.CommenterProfileImageContainer}>
                        <div className={classes.CommenterProfileImage} style={{backgroundImage: props.replyProfileImage ? `url(${props.replyProfileImage})` : null}}>
                            {props.replyProfileImage ? null : <NoGenderPlaceholder />}
                        </div>
                    </div>
                    <div className={classes.CommentBubbleContainer}>
                        <div className={classes.CommentBubbleAndEditButtonContainer}>
                            <div className={classes.CommentBubble}>
                                <h5 className={classes.CommenterName}>{props.name}</h5>
                                <div className={classes.CommentText}>
                                    <span>{props.text}</span>
                                </div>
                            </div>
                            <OutsideAlerter action={closeEditDropdown}>
                                <div className={classes.EditOptionsPositioner}>
                                    {editDropDown}
                                    <div className={classes.EditButton} style={{display: hoveringReply || editingDropdown ? 'block' : 'none'}} onClick={toggleEditDropdown}><Dots /></div>
                                </div>
                            </OutsideAlerter>
                        </div>
                        {props.image || props.gif ?  <div className={classes.AttachedImage} style={{backgroundImage: `url(${props.image || props.gif})`}}></div> : null}
                        <div className={classes.CommentBubbleOptionButtons}>
                            <div className={classes.CommentBubbleButton}>Like</div>
                            <span className={classes.InterPoint}>{"•"}</span>
                            <div className={classes.CommentBubbleButton} onClick={props.startReply}>Reply</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    let replyContent = reply;

    if (editingReply) {
        replyContent = editReplyForm;
    }

    if (props.savingEdits) {
        replyContent = <InlineDots />
    }

    return replyContent;

}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        savingEdits: state.posts.editingReply
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEditReply: (authToken, postsKey, postId, commentId, replyId, payload) => dispatch(actions.editReplyAttempt(authToken, postsKey, postId, commentId, replyId, payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(reply);