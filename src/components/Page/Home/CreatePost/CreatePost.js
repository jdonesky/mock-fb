
import React, {useState,useEffect,useContext} from 'react';
import {withRouter} from 'react-router'
import {connect} from 'react-redux';
import sharedClasses from '../Shared.css';
import classes from './CreatePost.css';
import {PostContext} from "../../../../context/post-context";

import Avatar from '../../../../assets/images/BookmarkIcons/user';
import AddPhoto from '../../../../assets/images/polaroid';
import FbMessage from '../../../../assets/images/UserActionIcons/fbMessage';

const createPost = props => {

    const postContext = useContext(PostContext);
    const {ownProfileImage, ownedPage} = props
    const [pathRoot, setPathRoot] = useState(props.history.location.pathname.split('/')[2])
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        if (pathRoot === 'manage') {
            if (ownedPage && ownedPage.profileImage) {
                setProfilePic(ownedPage.profileImage)
            }
        } else {
            if (ownProfileImage) {
                setProfilePic(ownProfileImage)
            }
        }
    }, [pathRoot, ownedPage, ownProfileImage])


    let toggleModalAction;
    let page;
    if (ownedPage) {
        toggleModalAction = postContext.openPageCreateModal;
        page = {...ownedPage}
    }

    return (
        <div className={sharedClasses.Container}>
            <section className={classes.TopBlock}>
                <div className={classes.ProfileImage} style={{backgroundImage: profilePic ? `url(${profilePic})` : null}}>
                    {profilePic ? null : <Avatar fill="white"/>}
                </div>
                <div className={classes.CreatePostButton} onClick={() => toggleModalAction(page)}>Create Post</div>
            </section>
            <section className={classes.BottomBlock}>
                <div className={classes.MediaButton}>
                    <div className={classes.MediaIcon}><AddPhoto fill="#08bf02"/></div>
                    <div className={classes.MediaText}>Add Photo</div>
                </div>
                <div className={classes.MediaButton}>
                    <div className={[classes.MediaIcon, classes.MessageIcon].join(" ")}><FbMessage fill="#0a70ff"/></div>
                    <div className={classes.MediaText}>Get Messages</div>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ownProfileImage: state.profile.profileImage,
        ownedPage: state.pages.ownedPage
    }
}

export default connect(mapStateToProps)(withRouter(createPost));