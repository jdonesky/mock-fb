import React from 'react';
import {withRouter} from 'react-router';
import classes from './NavigationBar.css';
import DownArrow from "../../../assets/images/down-arrow";
import Like from "../../../assets/images/like";
import FbMessage from "../../../assets/images/UserActionIcons/fbMessage";
import SearchGlass from "../../../assets/images/search";
import Dots from "../../../assets/images/dots";
import Eye from "../../../assets/images/eye";

const navigationBar = props => {

    let homeClasses = [classes.NavTab, classes.PageHome];
    let aboutClasses = [classes.NavTab, classes.PageAbout];
    let photosClasses = [classes.NavTab, classes.PagePhotos];
    let moreClasses = [classes.NavTab]

    const navTabs = (
            <React.Fragment>
                <div className={homeClasses.join(" ")}>Home</div>
                <div className={aboutClasses.join(" ")}>About</div>
                <div className={photosClasses.join(" ")}>Photos</div>
                <div className={moreClasses.join(" ")}>More<div className={classes.MoreArrow}><DownArrow fill="rgba(0,0,0,0.5)" /></div></div>
            </React.Fragment>
        )

    let navButtons;
    if (props.auth === 'discover') {
        navButtons = (
            <React.Fragment>
                <div className={[classes.NavButton, classes.BigButton].join(" ")}><div className={classes.NavButtonIcon}><Like /></div><div className={classes.NavButtonText}>Like</div></div>
                <div className={[classes.NavButton, classes.BigButton].join(" ")}><div className={classes.NavButtonIcon}><FbMessage /></div><div className={classes.NavButtonText}>Message</div></div>
                <div className={classes.NavButton}><div className={classes.NavButtonIcon}><SearchGlass /></div></div>
                <div className={classes.NavButton}><div className={classes.NavButtonIcon}><Dots /></div></div>
            </React.Fragment>
        )
    } else if (props.auth === 'manage') {
        navButtons = (
            <React.Fragment>
                <div className={[classes.NavButton, classes.BigButton].join(" ")} style={{minWidth: '150px'}}><div className={classes.NavButtonIcon}><Eye /></div><div className={classes.NavButtonText}>View as Visitor</div></div>
                <div className={classes.NavButton}><div className={classes.NavButtonIcon}><SearchGlass /></div></div>
                <div className={classes.NavButton}><div className={classes.NavButtonIcon}><Dots /></div></div>
            </React.Fragment>
        )
    }

    return (
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
    )
}

export default withRouter(navigationBar);