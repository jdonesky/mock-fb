import React, {useEffect} from 'react';
import {withRouter} from 'react-router';
import classes from './NavigationBar.css';
import DownArrow from "../../../assets/images/down-arrow";
import Like from "../../../assets/images/like";
import FbMessage from "../../../assets/images/UserActionIcons/fbMessage";
import SearchGlass from "../../../assets/images/search";
import Dots from "../../../assets/images/dots";
import Eye from "../../../assets/images/eye";
import getWindowDimensions from "../../../hooks/getWindowDimensions";

const navigationBar = props => {

    const { width, height } = getWindowDimensions()
    const {pathRoot, displayPage} = props

    const homeClasses = [classes.NavTab, classes.PageHome];
    const aboutClasses = [classes.NavTab, classes.PageAbout];
    const photosClasses = [classes.NavTab, classes.PagePhotos];
    const moreClasses = [classes.NavTab]


    if (props.history.location.pathname === `/pages/${pathRoot}/${displayPage}`) {
        homeClasses.push(classes.ActiveNavTab);
    }
    if (props.history.location.pathname === `/pages/${pathRoot}/${displayPage}/about`) {
        aboutClasses.push(classes.ActiveNavTab)
    }
    if (props.history.location.pathname === `/pages/${pathRoot}/${displayPage}/photos`) {
        photosClasses.push(classes.ActiveNavTab)
    }
    if (props.history.location.pathname === `/pages/${pathRoot}/${displayPage}/`) {
        aboutClasses.push(classes.ActiveNavTab)
    }






    const navTabs = (
            <React.Fragment>
                <div className={homeClasses.join(" ")}>Home</div>
                <div className={aboutClasses.join(" ")}>About</div>
                <div className={photosClasses.join(" ")}>Photos</div>
                <div className={moreClasses.join(" ")}>More<div className={classes.MoreArrow}><DownArrow fill="rgba(0,0,0,0.5)" /></div></div>
            </React.Fragment>
        )

    let navButtons;
    if (props.pathRoot === 'discover') {
        navButtons = (
            <React.Fragment>
                <div className={[classes.NavButton, classes.BigButton].join(" ")}><div className={classes.NavButtonIcon}><Like /></div><div className={classes.NavButtonText}>Like</div></div>
                <div className={[classes.NavButton, classes.BigButton].join(" ")}><div className={classes.NavButtonIcon}><FbMessage /></div><div className={classes.NavButtonText}>Message</div></div>
                <div className={classes.NavButton}><div className={classes.NavButtonIcon}><SearchGlass /></div></div>
                <div className={classes.NavButton}><div className={classes.NavButtonIcon}><Dots /></div></div>
            </React.Fragment>
        )
    } else if (props.pathRoot === 'manage') {
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