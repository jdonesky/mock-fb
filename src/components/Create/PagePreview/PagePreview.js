

import React from 'react';
import classes from './PagePreview.css';

import Desktop from '../../../assets/images/MiscIcons/desktop';

const pagePreview = props => {
    return (
        <div className={classes.PreviewContainer}>
            <div className={classes.Header}>
                <h4>Desktop Preview</h4>
                <div className={classes.DesktopIcon}>
                    <Desktop />
                </div>
            </div>
            <div className={classes.PageDisplay}>
                <div className={classes.CoverImage} style={{backgroundImage: props.coverImage ? `url(${props.coverImage})` : null}} />
            </div>
        </div>
    )
}

export default pagePreview;