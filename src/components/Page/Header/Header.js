

import React, {useState, useEffect, useRef} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './Header.css';
import * as actions from '../../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';
import CreatePageCover from "../../../assets/images/Raster/createPagePreview.png";
import Flag from "../../../assets/images/BookmarkIcons/flag";
import Camera from "../../../assets/images/MiscIcons/camera";
import getWindowDimensions from "../../../hooks/getWindowDimensions";


const header = (props) => {

    const {width,height} = getWindowDimensions()
    const [pathRoot, setPathRoot] = useState(props.history.location.pathname.split('/')[2])
    const profileImageContainer = useRef(null);
    const profileImageUploader = useRef(null);
    const coverImageContainer = useRef(null);
    const coverImageUploader = useRef(null);

    const {ownedPage, othersPage, onEditPageImage, authToken, editingProfileImage, editingCoverImage} = props

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
                    onEditPageImage(authToken, "profileImage", {...ownedPage, profileImage: event.target.result})
                } else {
                    coverImageContainer.current.style.backgroundImage = `url(${event.target.result})`;
                    onEditPageImage(authToken,"coverImage",{...ownedPage, coverImage: event.target.result})
                }
            };
            reader.readAsDataURL(file);
        }
    };

    let coverImage;
    let profileImage;
    let coverImageUploadButton;
    let profileImageUploadButton;
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
    } else {
        if (othersPage) {
            coverImage = othersPage.coverImage
            profileImage = othersPage.profileImage
        }
    }


    return (
        <div className={classes.PageHeaderPositioner}>
            <div ref={coverImageContainer} className={classes.CoverImage} style={{backgroundImage: coverImage ? `url(${coverImage})` : `url(${CreatePageCover})`, height: `${width * 0.23}px`, }}>
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
            <div className={classes.PageProfileHeader}>
                <div className={classes.PageProfileCircleOutline}>
                    <div ref={profileImageContainer} className={classes.PageProfileCircle} style={{backgroundImage: profileImage ? `url(${profileImage})`: null}}>
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
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        ownedPage: state.pages.ownedPage,
        othersPage: state.pages.othersPage,
        editingProfileImage: state.pages.editingProfileImage,
        editingCoverImage: state.pages.editingCoverImage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEditPageImage: (authToken, field, newPage) => dispatch(actions.editPageImageAttempt(authToken, field, newPage)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(header))