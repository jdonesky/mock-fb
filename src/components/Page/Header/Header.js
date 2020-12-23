

import React, {useRef} from 'react';
import {connect} from 'react-redux';
import classes from './Header.css';
import CreatePageCover from "../../../assets/images/Raster/createPagePreview.png";
import Flag from "../../../assets/images/BookmarkIcons/flag";
import getWindowDimensions from "../../../hooks/getWindowDimensions";

const header = (props) => {

    const {width,height} = getWindowDimensions()
    const profileImageContainer = useRef(null);
    const coverImageContainer = useRef(null);

    return (
        <div className={classes.PageHeaderPositioner}>
            <div ref={coverImageContainer} className={classes.CoverImage} style={{backgroundImage: props.coverImage ? `url(${props.coverImage})` : `url(${CreatePageCover})`, height: `${width * 0.23}px`, }} />
            <div className={classes.PageProfileHeader}>
                <div className={classes.PageProfileCircleOutline}>
                    <div ref={profileImageContainer} className={classes.PageProfileCircle}>
                        {props.profileImage ? null : <Flag first="rgba(0,0,0,0.28)" second="rgba(0,0,0,0.29)"/>}
                    </div>
                </div>
                <div className={classes.PageNameAndCategory}>
                    <div className={classes.PageName}>{props.pageName || 'Page Name'}</div>
                    <div className={classes.PageCategory}>{props.category || 'Category'}</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(header)