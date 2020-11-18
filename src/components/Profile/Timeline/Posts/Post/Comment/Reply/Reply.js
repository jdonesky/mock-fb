
import React, {useState, useEffect} from 'react';
import classes from "../Comment.css";
import NoGenderPlaceholder from "../../../../../../../assets/images/profile-placeholder-gender-neutral";
import Dots from "../../../../../../../assets/images/dots";
import OutsideAlerter from "../../../../../../../hooks/outsideClickHandler";


const reply = (props) => {

    // useEffect(() => {
    //     console.log('postsKey ', props.postsKey)
    //     console.log('postId ', props.postId)
    //     console.log('commentId ', props.commentId)
    //     console.log('replyId ', props.id)
    // })

    const [editingButton, setEditingButton] = useState(false);
    const [editDropdown, setEditDropdown] = useState(false);

    const toggleEditingButton = () => {
            setEditingButton(prevState => {
                return !prevState;
            });
    }

    const toggleEditDropdown = () => {
        setEditDropdown(prevState => {
            return !prevState;
        })
    }

    const closeEditDropdown = () => {
        setEditDropdown(false);
    }


    const toggleDeleteModal = () => {
        closeEditDropdown();
        props.passDeleteData(null, props.postsKey, 'reply', 'DELETE_POST_REPLY', props.postId, props.commentId, props.id);
        props.toggleDeleteModal();
    }

    const editDropDown = (
        <div className={classes.EditDropdownContainer} style={{display: editDropdown ? 'flex' : 'none'}}>
            <div className={classes.BaseArrow} />
            <div className={classes.EditDropdownButton}>Edit</div>
            <div className={classes.EditDropdownButton} onClick={toggleDeleteModal}>Delete</div>
        </div>
    )

    return (
        <div className={classes.Reply} onMouseEnter={() => toggleEditingButton()} onMouseLeave={() => toggleEditingButton()}>
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
                                    <div className={classes.EditButton} style={{display: editingButton ? 'block' : 'none'}} onClick={toggleEditDropdown}><Dots /></div>
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
}

export default reply;