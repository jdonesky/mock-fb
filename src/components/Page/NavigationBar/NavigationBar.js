import React from 'react';
import classes from './NavigationBar.css';
import DownArrow from "../../../assets/images/down-arrow";
import Like from "../../../assets/images/like";
import FbMessage from "../../../assets/images/UserActionIcons/fbMessage";
import SearchGlass from "../../../assets/images/search";
import Dots from "../../../assets/images/dots";

const navigationBar = props => {

    let navTabs;
    let navButtons;
    if (props.admin) {
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

export default navigationBar;