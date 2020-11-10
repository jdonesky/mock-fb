

import React from 'react';
import classes from './Comment.css'
import NoGenderPlaceholder from "../../../../../../assets/images/profile-placeholder-gender-neutral";

const comment = (props) => {

    let attachedImage = <div style={{backgroundImage: `url(${props.image && props.image})`}}></div>
    let attachedGif;


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

                    <div className={classes.CommentBubbleOptionButtons}>
                        <div className={classes.CommentBubbleButton}>Like</div>
                        <span className={classes.InterPoint}>{"•"}</span>
                        <div className={classes.CommentBubbleButton}>Reply</div>
                        <span className={classes.InterPoint}>{"•"}</span>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default comment;