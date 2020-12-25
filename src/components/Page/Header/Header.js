

import React, {useRef} from 'react';
import {connect} from 'react-redux';
import classes from './Header.css';
import CreatePageCover from "../../../assets/images/Raster/createPagePreview.png";
import Flag from "../../../assets/images/BookmarkIcons/flag";
import Camera from "../../../assets/images/MiscIcons/camera";
import getWindowDimensions from "../../../hooks/getWindowDimensions";


const header = (props) => {

    const {width,height} = getWindowDimensions()
    const profileImageContainer = useRef(null);
    const profileImageUploader = useRef(null);
    const coverImageContainer = useRef(null);
    const coverImageUploader = useRef(null);

    let coverImage;
    let profileImage;
    let coverImageUploadButton;
    let profileImageUploadButton;
    if (props.pathRoot === 'manage') {
        if (props.ownedPage) {
            coverImage = props.ownedPage.coverImage
            profileImage = props.ownedPage.profileImage
            coverImageUploadButton = (
                <div className={classes.CoverUploadButton}>
                    <div className={classes.CoverUploadIcon}><Camera /></div>
                    <div className={classes.CoverUploadText}>Edit</div>
                </div>
            )

            profileImageUploadButton = (
                <div className={classes.ProfileUploadButton}>
                    <Camera />
                </div>
            )
        }
    }


    return (
        <div className={classes.PageHeaderPositioner}>
            <div ref={coverImageContainer} className={classes.CoverImage} style={{backgroundImage: coverImage ? `url(${coverImage})` : `url(${CreatePageCover})`, height: `${width * 0.23}px`, }}>
                {coverImageUploadButton}
            </div>
            <div className={classes.PageProfileHeader}>
                <div className={classes.PageProfileCircleOutline}>
                    <div ref={profileImageContainer} className={classes.PageProfileCircle} style={{backgroundImage: profileImage ? `url(${profileImage})`: null}}>
                        {profileImage ? null : <Flag first="rgba(0,0,0,0.28)" second="rgba(0,0,0,0.29)"/>}
                        {profileImageUploadButton}
                    </div>
                </div>
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
        ownedPage: state.pages.ownedPage,
        othersPage: state.pages.othersPage
    }
}

export default connect(mapStateToProps)(header)