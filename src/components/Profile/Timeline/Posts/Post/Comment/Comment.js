

import React, {useState, useRef} from 'react';
import classes from './Comment.css';
import NoGenderPlaceholder from "../../../../../../assets/images/profile-placeholder-gender-neutral";
import Dots from '../../../../../../assets/images/dots';
import Smiley from "../../../../../../assets/images/smile";
import Camera from "../../../../../../assets/images/camera-outline";
import Gif from "../../../../../../assets/images/gif";
import OutsideAlerter from "../../../../../../hooks/outsideClickHandler";
import Reply from './Reply/Reply'

const comment = (props) => {

    const [replying, setReplying] = useState(false);
    const [editingComment, setEditingComment] = useState(false);
    const [editingDropdown, setEditingDropdown] = useState(false);
    const replyInput = useRef(null);

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
        replyInput.current.focus();
        replyInput.current.offsetTop;
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
                <input  ref={replyInput} placeholder="Write a comment..." />
                <div className={classes.CommentButtons}>
                    <div className={classes.CommentButtonIcon}><Smiley fill="#545353" /></div>
                    <div className={classes.CommentButtonIcon}><Camera fill="#545353" /></div>
                    <div className={[classes.CommentButtonIcon, classes.Gif].join(" ")}><Gif fill="#545353" /></div>
                </div>
            </div>
        </section>
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
        </div>
    )
}

export default comment;