

import React, {useState} from 'react';
import classes from './Comment.css'
import NoGenderPlaceholder from "../../../../../../assets/images/profile-placeholder-gender-neutral";
import Smiley from "../../../../../../assets/images/smile";
import Camera from "../../../../../../assets/images/camera-outline";
import Gif from "../../../../../../assets/images/gif";


const comment = (props) => {

    const [replying, setReplying] = useState(false);

    let replies;
    if (props.replies) {
        replies = props.replies && props.replies.map(reply => (
            <div className={classes.Reply}>
                <div className={classes.Comment}>
                    <div className={classes.CommentContainer}>
                        <div className={classes.CommenterProfileImageContainer}>
                            <div className={classes.CommenterProfileImage} style={{backgroundImage: reply.profileImage ? `url(${reply.profileImage})` : null}}>
                                {reply.profileImage ? null : <NoGenderPlaceholder />}
                            </div>
                        </div>
                        <div className={classes.CommentBubbleContainer}>
                            <div className={classes.CommentBubble}>
                                <h5 className={classes.CommenterName}>{reply.userName}</h5>
                                <div className={classes.CommentText}>
                                    <span>{reply.text}</span>
                                </div>
                            </div>
                            {reply.image || reply.gif ?  <div className={classes.AttachedImage} style={{backgroundImage: `url(${reply.image || reply.gif})`}}></div> : null}
                            <div className={classes.CommentBubbleOptionButtons}>
                                <div className={classes.CommentBubbleButton}>Like</div>
                                <span className={classes.InterPoint}>{"•"}</span>
                                <div className={classes.CommentBubbleButton}>Reply</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            ))
    }

    let replyBar = (
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
    )

    return (
        <div className={classes.Comment}>
            <div className={classes.CommentContainer}>
                <div className={classes.CommenterProfileImageContainer}>
                    <div className={classes.CommenterProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}}>
                        {props.profileImage ? null : <NoGenderPlaceholder />}
                    </div>
                </div>
                <div className={classes.CommentBubbleContainer}>
                    <div className={classes.CommentBubble}>
                        <h5 className={classes.CommenterName}>{props.userName}</h5>
                        <div className={classes.CommentText}>
                            <span>{props.text}</span>
                        </div>
                    </div>
                    {props.image || props.gif ?  <div className={classes.AttachedImage} style={{backgroundImage: `url(${props.image || props.gif})`}}></div> : null}
                    <div className={classes.CommentBubbleOptionButtons}>
                        <div className={classes.CommentBubbleButton}>Like</div>
                        <span className={classes.InterPoint}>{"•"}</span>
                        <div className={classes.CommentBubbleButton}>Reply</div>
                    </div>
                </div>
            </div>
            {replies}
        </div>
    )
}

export default comment;