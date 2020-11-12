
import React, {useState, useRef, useEffect} from 'react';
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

const comment = (props) => {

    useEffect(() => {
        const reply = {
            userId: props.userId,
            profileImage: props.profileImage,
            text: replyText,
            image: replyImage,
            gif: replyGif
        }
        console.log(reply)
    })

    const [replying, setReplying] = useState(false);
    const [editingComment, setEditingComment] = useState(false);
    const [editingDropdown, setEditingDropdown] = useState(false);
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

    const startReplyHandler = () => {
        setReplying(true);
        replyInput.current.offsetTop;
        replyInput.current.focus();

    }

    const editDropDown = (
        <div className={classes.EditDropdownContainer} style={{display: editingDropdown ? 'flex' : 'none'}}>
            <div className={classes.BaseArrow} />
            <div className={classes.EditDropdownButton}>Edit</div>
            <div className={classes.EditDropdownButton}>Delete</div>
        </div>
    )

    let replies;
    if (props.replies) {
        replies = props.replies && props.replies.map(reply => (
            <Reply
                key={reply.id}
                id={reply.id}
                userName={reply.userName}
                profileImage={reply.profileImage}
                text={reply.text}
                image={reply.image}
                gif={reply.gif}
                startReply={startReplyHandler}
            />
        ))
    }

    let replyBar = (
        <section className={classes.CommentBarSection} style={{display: replying ? 'flex' : 'none'}}>
            <div className={classes.CommenterProfileImageContainer}>
                <div className={classes.CommenterProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}}>
                    {props.profileImage ? null : <NoGenderPlaceholder />}
                </div>
            </div>
            <div className={classes.CommentBar}>
                <input  ref={replyInput} placeholder="Write a comment..." value={replyText} onChange={(event) => updateReplyText(event)}/>
                <div className={classes.CommentButtons}>
                    <div className={classes.CommentButtonIcon}><Smiley fill="#545353" /></div>
                    <div className={classes.CommentButtonIcon} onClick={() => imageUploader.current.click()}><Camera fill="#545353" /></div>
                    <div className={[classes.CommentButtonIcon, classes.Gif].join(" ")} onClick={() => gifUploader.current.click()}><Gif fill="#545353" /></div>
                </div>
            </div>
        </section>
    )

    let replyImagePreview = (
        <div className={classes.ReplyImagePreviewContainer}>
            <section className={postClasses.CommentImagePreviewSection} style={{display: replyImage ? 'flex' : 'none'}}>
                <div className={postClasses.CommentImagePreviewContainer} style={{backgroundImage: replyImage ? `url(${replyImage}` : null}} onClick={() => imageUploader.current.click()}></div>
                <div className={postClasses.CancelCommentImagePreviewButton} onClick={() => setReplyImage(null)}><Delete /></div>
            </section>
        </div>
    )

    return (
        <div className={classes.Comment} >
            <div className={classes.CommentContainer} onMouseEnter={() => toggleEditingButton()} onMouseLeave={() => toggleEditingButton()}>
                <div className={classes.CommenterProfileImageContainer}>
                    <div className={classes.CommenterProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}}>
                        {props.profileImage ? null : <NoGenderPlaceholder />}
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
                                <div className={classes.EditButton} style={{display: editingComment ? 'block' : 'none'}} onClick={toggleEditingDropdown}><Dots /></div>
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
}

export default comment;