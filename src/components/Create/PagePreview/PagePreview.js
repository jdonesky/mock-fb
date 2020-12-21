

import React from 'react';
import classes from './PagePreview.css';

import Desktop from '../../../assets/images/MiscIcons/desktop';
import getWindowDimensions from "../../../hooks/getWindowDimensions";
import CreatePageCover from '../../../assets/images/Raster/createPagePreview.png';
import CreateGroupCover from '../../../assets/images/Raster/createGroupPreview.png';
import Flag from '../../../assets/images/BookmarkIcons/flag';



const pagePreview = props => {

    const {width, height} = getWindowDimensions()

    let header;
    if (props.preview === 'PAGE') {
        header = (
            <div className={classes.PageHeaderPositioner}>
                <div className={classes.CoverImage} style={{backgroundImage: `url(${CreatePageCover})`, height: `${width * 0.23}px`}} />
                <div className={classes.PageProfileHeader}>
                    <div className={classes.PageProfileCircleOutline}>
                        <div className={classes.PageProfileCircle}><Flag first="rgba(0,0,0,0.1)" second="rgba(0,0,0,0.15)"/></div>
                    </div>
                </div>
            </div>
        )
    } else if (props.preview === 'GROUP') {
        // header = ()
    }

    return (
        <div className={classes.PreviewContainer}>
            <div className={classes.Header}>
                <h4>Desktop Preview</h4>
                <div className={classes.DesktopIcon}>
                    <Desktop fill="#0a74ff"/>
                </div>
            </div>
            <div className={classes.PageDisplay}>
                <div className={classes.PageHeaderPositioner}>
                    <div className={classes.CoverImage} style={{backgroundImage: props.coverImage ? `url(${props.coverImage})` : `url(${CreatePageCover})`, height: `${width * 0.23}px`}} />
                        <div className={classes.PageProfileHeader}>
                            <div className={classes.PageProfileCircleOutline}>
                                <div className={classes.PageProfileCircle}><Flag fill='rgba(0,0,0,0.4)'/></div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default pagePreview;