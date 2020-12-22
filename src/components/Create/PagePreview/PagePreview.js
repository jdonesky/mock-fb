

import React, {useContext, useEffect, useRef} from 'react';
import classes from './PagePreview.css';

import Desktop from '../../../assets/images/MiscIcons/desktop';
import getWindowDimensions from "../../../hooks/getWindowDimensions";
import CreatePageCover from '../../../assets/images/Raster/createPagePreview.png';
import CreateGroupCover from '../../../assets/images/Raster/createGroupPreview.png';
import {PageContext} from "../../../context/page-context";

import Flag from '../../../assets/images/BookmarkIcons/flag';
import Like from '../../../assets/images/like';
import FbMessage from '../../../assets/images/UserActionIcons/fbMessage';
import SearchGlass from '../../../assets/images/search';
import Dots from '../../../assets/images/dots';
import DownArrow from '../../../assets/images/down-arrow';
import Info from '../../../assets/images/MiscIcons/info';
import Polaroid from '../../../assets/images/polaroid';
import TagPerson from '../../../assets/images/UserActionIcons/tagPerson';
import Pin from "../../../assets/images/Pin";

const pagePreview = props => {

    const pageContext = useContext(PageContext);
    const profileImageContainer = useRef(null);
    const coverImageContainer = useRef(null);
    const {width, height} = getWindowDimensions();

    const {profileImage, coverImage} = pageContext;

    useEffect(() => {
        if (profileImage) {
            profileImageContainer.current.style.backgroundImage = `url(${profileImage})`
        } else {
            profileImageContainer.current.style.backgroundImage = null
        }
    }, [profileImage])

    useEffect(() => {

        if (coverImage) {
            coverImageContainer.current.style.backgroundImage = `url(${coverImage})`
        } else {
            coverImageContainer.current.style.backgroundImage = `url(${CreatePageCover})`
        }
    }, [coverImage])

    let header;
    let navTabs;
    let navButtons;
    let about;
    let create;
    if (props.preview === 'PAGE') {
        header = (
            <div className={classes.PageHeaderPositioner}>
                <div ref={coverImageContainer} className={classes.CoverImage} style={{backgroundImage: pageContext.coverImage ? `url(${pageContext.coverImage})` : `url(${CreatePageCover})`, filter: pageContext.coverImage ? null : 'grayscale(100%)', height: `${width * 0.23}px`, }} />
                <div className={classes.PageProfileHeader}>
                    <div className={classes.PageProfileCircleOutline}>
                        <div ref={profileImageContainer} className={classes.PageProfileCircle}>
                            {pageContext.profileImage ? null : <Flag first="rgba(0,0,0,0.28)" second="rgba(0,0,0,0.29)"/>}
                        </div>
                    </div>
                    <div className={classes.PageNameAndCategory}>
                        <div className={classes.PageName}>{pageContext.pageName || 'Page Name'}</div>
                        <div className={classes.PageCategory}>{pageContext.category || 'Category'}</div>
                    </div>
                </div>
            </div>
        )
        navTabs = (
            <React.Fragment>
                <div className={[classes.NavTab, classes.PageHome].join(" ")}>Home</div>
                <div className={[classes.NavTab, classes.PageAbout].join(" ")}>About</div>
                <div className={[classes.NavTab, classes.PagePhotos].join(" ")}>Photos</div>
                <div className={classes.NavTab}>More<div className={classes.MoreArrow}><DownArrow fill="rgba(0,0,0,0.5)" /></div></div>
            </React.Fragment>
        )
        navButtons = (
            <React.Fragment>
                <div className={[classes.NavButton, classes.BigButton].join(" ")}><div className={classes.NavButtonIcon}><Like /></div><div className={classes.NavButtonText}>Like</div></div>
                <div className={[classes.NavButton, classes.BigButton].join(" ")}><div className={classes.NavButtonIcon}><FbMessage /></div><div className={classes.NavButtonText}>Message</div></div>
                <div className={classes.NavButton}><div className={classes.NavButtonIcon}><SearchGlass /></div></div>
                <div className={classes.NavButton}><div className={classes.NavButtonIcon}><Dots /></div></div>
            </React.Fragment>
        )
        about = (
            <div className={classes.AboutContainer}>
                <div className={classes.AboutHeader}>About</div>
                <div className={classes.AboutDescription}><div className={classes.AboutInfoIcon}><Info fill="rgba(0,0,0,0.5)"/></div>{pageContext.description || 'Description'}</div>
            </div>
        )
        create = (
            <div className={classes.PageStartPostContainer}>
                <div className={classes.PageStartPostHeader}>
                    <div className={classes.StartPostProfileCircle}><Flag first="rgba(0,0,0,0.28)" second="rgba(0,0,0,0.29)"/></div>
                    <div className={classes.PageCreatePostButton}>
                        Create Post
                    </div>
                </div>
                <div className={classes.SharedAddMediaButtons}>
                    <div className={classes.SharedAddMediaButton}>
                        <div className={classes.AddMediaIcon}><Polaroid fill="#08bf02" /></div>
                        <div className={classes.AddMediaText}>Add Photo</div>
                    </div>
                    <div className={classes.SharedAddMediaButton}>
                        <div className={[classes.AddMediaIcon, classes.TagMediaIcon].join(" ")}><TagPerson fill="#386be0"/></div>
                        <div className={classes.AddMediaText}>Tag People</div>
                    </div>
                    <div className={classes.SharedAddMediaButton}>
                        <div className={[classes.AddMediaIcon, classes.PinMediaIcon].join(" ")}><Pin fill="#e32727"/></div>
                        <div className={classes.AddMediaText}>Check in</div>
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
                        <div className={classes.SharedNavTabs}>
                            {navTabs}
                        </div>
                        <div className={classes.SharedNavButtons}>
                            {navButtons}
                        </div>
                    </div>
                    <div className={classes.SharedCliff}></div>
                </div>
                <div className={classes.FlexContentPositioner}>
                    <div className={classes.SharedContentBackdrop}/>
                    <div className={classes.SharedContentFlexContainer}>
                        {about}
                        {create}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default pagePreview;