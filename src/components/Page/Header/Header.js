

import React, {useState, useEffect, useRef} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './Header.css';
import * as actions from '../../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';
import CreatePageCover from "../../../assets/images/Raster/createPagePreview.png";
import Flag from "../../../assets/images/BookmarkIcons/flag";
import Camera from "../../../assets/images/MiscIcons/camera";
import FbMessage from "../../../assets/images/UserActionIcons/fbMessage";
import getWindowDimensions from "../../../hooks/getWindowDimensions";

const header = (props) => {

    const {width,height} = getWindowDimensions()
    const [pathRoot, setPathRoot] = useState(props.history.location.pathname.split('/')[2])
    const [displayPage, setDisplayPage] = useState(props.history.location.pathname.split('/')[3])
    const profileImageContainer = useRef(null);
    const profileImageUploader = useRef(null);
    const coverImageContainer = useRef(null);
    const coverImageUploader = useRef(null);

    const {ownedPage, othersPage, onEditPageImage, authToken, editingProfileImage, editingCoverImage, owned} = props

    useEffect(() => {
        if (pathRoot === 'manage') {
            if (ownedPage && ownedPage.coverImage) {
                coverImageContainer.current.style.backgroundImage = `url(${ownedPage.coverImage})`;
            } else {
                coverImageContainer.current.style.backgroundImage = `url(${CreatePageCover})`;
            }
        } else {
            if (othersPage && othersPage.coverImage) {
                coverImageContainer.current.style.backgroundImage = `url(${othersPage.coverImage})`;
            } else {
                coverImageContainer.current.style.backgroundImage =  `url(${CreatePageCover})`;
            }
        }
    }, [ownedPage, othersPage, pathRoot])

    const imageUploadHandler = (event, type) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (type === 'PROFILE') {
                    profileImageContainer.current.style.backgroundImage = `url(${event.target.result})`;
                    if (pathRoot === 'manage') {
                        onEditPageImage(authToken, "profileImage", {...ownedPage, profileImage: event.target.result})
                    } else if (owned) {
                        onEditPageImage(authToken, "profileImage", {...othersPage, profileImage: event.target.result})
                    }
                } else {
                    coverImageContainer.current.style.backgroundImage = `url(${event.target.result})`;
                    if (pathRoot === 'manage') {
                        onEditPageImage(authToken, "coverImage", {...ownedPage, coverImage: event.target.result})
                    } else if (owned) {
                        onEditPageImage(authToken, "coverImage", {...othersPage, coverImage: event.target.result})
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    };


    let coverImage;
    let profileImage;
    let coverImageUploadButton;
    let profileImageUploadButton;
    let sendMessageButton;
    let headerFlexFlow;
    if (pathRoot === 'manage') {
        if (ownedPage) {
            coverImage = ownedPage.coverImage
            profileImage = ownedPage.profileImage
            coverImageUploadButton = (
                <div className={classes.CoverUploadButton} onClick={() => coverImageUploader.current.click()}>
                    <div className={classes.CoverUploadIcon}>{editingCoverImage ? <Spinner bottom="62px" /> : <Camera />}</div>
                    <div className={classes.CoverUploadText}>Edit</div>
                </div>
            )

            profileImageUploadButton = (
                <div className={classes.ProfileUploadButton} onClick={() => profileImageUploader.current.click()}>
                    {editingProfileImage ? <Spinner bottom='49px' left='1px' /> : <Camera />}
                </div>
            )
        }
    } else if (owned) {
        if (othersPage) {
            coverImage = othersPage.coverImage
            profileImage = othersPage.profileImage
            coverImageUploadButton = (
                <div className={classes.CoverUploadButton} onClick={() => coverImageUploader.current.click()}>
                    <div className={classes.CoverUploadIcon}>{editingCoverImage ? <Spinner bottom="62px" /> : <Camera />}</div>
                    <div className={classes.CoverUploadText}>Edit</div>
                </div>
            )
            profileImageUploadButton = (
                <div className={classes.ProfileUploadButton} onClick={() => profileImageUploader.current.click()}>
                    {editingProfileImage ? <Spinner bottom='49px' left='1px' /> : <Camera />}
                </div>
            )
        }
    } else {
        if (othersPage) {
            coverImage = othersPage.coverImage
            profileImage = othersPage.profileImage
            headerFlexFlow = 'column'
            sendMessageButton = (
                <div className={classes.PageHeaderRightBlock} style={{height: width > 900 ? '120px' : null}}>
                    <div className={classes.SendMessageButton}>
                        <div className={classes.MessageButtonIcon}>
                            <FbMessage fill="white" />
                        </div>
                        <div className={classes.MessageButtonText}>Send Message</div>
                    </div>
                </div>
            )
        }
    }


    return (
        <div className={classes.PageHeaderPositioner}>
            <div ref={coverImageContainer} className={classes.CoverImage} style={{backgroundImage: coverImage ? `url(${coverImage})` : `url(${CreatePageCover})`, height: `${width * 0.27}px`, }}>
                {coverImageUploadButton}
            </div>
            <input
                ref={coverImageUploader}
                type="file"
                accept="image/*"
                multiple={false}
                onChange={imageUploadHandler}
                style={{
                    display: "none"
                }}
            />
            <div className={classes.PageProfileHeader} style={{flexFlow: headerFlexFlow && width < 900 ? headerFlexFlow : null, justifyContent: headerFlexFlow && width > 900 ? "space-between" : null, alignItems: headerFlexFlow && width < 900 ? "flex-start" : null, bottom: headerFlexFlow && width < 900 ? "-145px" : null}}>
                <div className={classes.PageHeaderLeftBlock}>
                    <div className={classes.PageProfileCircleOutline} style={{height: `${width * 0.16}px`, width: `${width * 0.16}px`}}>
                        <div ref={profileImageContainer} className={classes.PageProfileCircle} style={{backgroundImage: profileImage ? `url(${profileImage})`: null, height: `${width * 0.15}px`, width: `${width * 0.15}px`}}>
                            {profileImage ? null : <Flag first="rgba(0,0,0,0.28)" second="rgba(0,0,0,0.29)"/>}
                            {profileImageUploadButton}
                        </div>
                    </div>
                    <input
                        ref={profileImageUploader}
                        type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={(event) => imageUploadHandler(event,'PROFILE')}
                        style={{
                            display: "none"
                        }}
                    />
                    <div className={classes.PageNameAndCategory}>
                        <div className={classes.PageName}>{props.name || 'Page Name'}</div>
                        <div className={classes.PageCategory}>{props.category || 'Category'}</div>
                    </div>
                </div>
                {sendMessageButton}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        ownedPage: state.pages.ownedPage,
        fetchingOwnedPage: state.pages.fetchingOwnedPage,
        othersPage: state.pages.othersPage,
        fetchingOthersPage: state.pages.fetchingOthersPage,
        editingProfileImage: state.pages.editingProfileImage,
        editingCoverImage: state.pages.editingCoverImage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEditPageImage: (authToken, field, newPage) => dispatch(actions.editPageImageAttempt(authToken, field, newPage)),
        onFetchOthersPage: (authToken, pageKey) => dispatch(actions.fetchOthersPageAttempt(authToken, pageKey)),
        onFetchOwnedPage: (authToken, pageKey) => dispatch(actions.fetchOwnedPageAttempt(authToken, pageKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(header))