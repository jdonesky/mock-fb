

import React, {useState, useRef} from 'react';
import classes from './Comment.css';
import NoGenderPlaceholder from "../../../../../../assets/images/profile-placeholder-gender-neutral";
import Dots from '../../../../../../assets/images/dots';
import Smiley from "../../../../../../assets/images/smile";
import Camera from "../../../../../../assets/images/camera-outline";
import Gif from "../../../../../../assets/images/gif";


const comment = (props) => {

    const [replying, setReplying] = useState(false);
    const [editingReply, setEditingReply] = useState(false)
    const [editingComment, setEditingComment] = useState(false);
    const replyInput = useRef(null);

    const toggleEditing = (type) => {
        if (type === 'reply') {
            setEditingReply(prevState => {
                return !prevState;
            });
        } else if (type === 'comment') {
            setEditingComment(prevState => {
                return !prevState;
            });
        }
    }

    const startReplyHandler = () => {
        setReplying(true);
        replyInput.current.focus();
        replyInput.current.offsetTop;
    }

    let replies;
    if (props.replies) {
        replies = props.replies && props.replies.map(reply => (
            <div className={classes.Reply} onMouseEnter={() => toggleEditing('reply')} onMouseLeave={() => toggleEditing('reply')}>
                <div className={classes.Comment}>
                    <div className={classes.CommentContainer}>
                        <div className={classes.CommenterProfileImageContainer}>
                            <div className={classes.CommenterProfileImage} style={{backgroundImage: reply.profileImage ? `url(${reply.profileImage})` : null}}>
                                {reply.profileImage ? null : <NoGenderPlaceholder />}
                            </div>
                        </div>
                        <div className={classes.CommentBubbleContainer}>
                            <div className={classes.CommentBubbleAndEditButtonContainer}>
                                <div className={classes.CommentBubble}>
                                    <h5 className={classes.CommenterName}>{reply.userName}</h5>
                                    <div className={classes.CommentText}>
                                        <span>{reply.text}</span>
                                    </div>
                                </div>
                                <div className={classes.EditButton} style={{display: editingReply ? 'block' : 'none'}}><Dots /></div>
                            </div>
                            {reply.image || reply.gif ?  <div className={classes.AttachedImage} style={{backgroundImage: `url(${reply.image || reply.gif})`}}></div> : null}
                            <div className={classes.CommentBubbleOptionButtons}>
                                <div className={classes.CommentBubbleButton}>Like</div>
                                <span className={classes.InterPoint}>{"•"}</span>
                                <div className={classes.CommentBubbleButton} onClick={startReplyHandler}>Reply</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        <div className={classes.Comment} onMouseEnter={() => toggleEditing('comment')} onMouseLeave={() => toggleEditing('comment')}>
            <div className={classes.CommentContainer}>
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
                        <div className={classes.EditButton} style={{display: editingComment ? 'block' : 'none'}}><Dots /></div>
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