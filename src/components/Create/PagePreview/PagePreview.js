

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
                <div className={classes.CoverImage} style={{backgroundImage: props.coverImage ? `url(${props.coverImage})` : `url(${CreatePageCover})`, height: `${width * 0.23}px`}} />
                <div className={classes.PageProfileHeader}>
                    <div className={classes.PageProfileCircleOutline}>
                        <div className={classes.PageProfileCircle}><Flag first="rgba(0,0,0,0.28)" second="rgba(0,0,0,0.29)"/></div>
                    </div>
                    <div className={classes.PageNameAndCategory}>
                        <div className={classes.PageName}>Page Name</div>
                        <div className={classes.PageCategory}>Category</div>
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
                {header}
                <div className={classes.SharedHeaderElements}>
                    <div className={classes.SharedBreak}/>
                    <div className={classes.SharedNavBar}>

                    </div>
                    <div className={classes.SharedCliff}></div>
                </div>
                <div className={classes.SharedContentBackdrop}/>
                <div className={classes.SharedContentFlexContainer}>

                </div>
            </div>
        </div>
    )
}

export default pagePreview;