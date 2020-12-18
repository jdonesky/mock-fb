
import React from 'react';
import {withRouter} from 'react-router';
import classes from './CenterOptionsBar.css';

import HouseContour from '../../../../assets/images/TopNavButtonIcons/homeContour';
import HouseFilled from '../../../../assets/images/TopNavButtonIcons/homeFilled';
import GroupFilled from '../../../../assets/images/TopNavButtonIcons/groupFill';

const centerOptions = (props) => {

    const navHome = () => {
        if (props.location.pathname !== '/home') {
            props.history.push('/home')
        }
    }

    const navGroups = () => {
        if (props.location.pathname !== '/groups') {
            props.history.push('/groups')
        }
    }

    const navFullMenu = () => {
        if (props.location.pathname !== '/bookmarks') {
            props.history.push('/bookmarks')
        }
    }

    let homeIcon;
    const homeClasses = [classes.Button];
    if (props.location.pathname === '/home') {
        homeIcon = <HouseFilled fill="#1b6ee3" />
        homeClasses.push(classes.ButtonActive)
    } else {
        homeIcon = <HouseContour fill="rgba(0,0,0,0.6)"/>
    }

    let groupIcon;
    const groupClasses = [classes.Button];
    const groupIconClasses = [classes.ButtonIcon, classes.GroupIcon];
    if (props.location.pathname === '/groups') {
        groupIcon = <GroupFilled fill="white"/>
        groupClasses.push(classes.ButtonActive);
        groupIconClasses.push(classes.GroupsActive);
    } else {
        groupIcon = <GroupFilled fill="rgba(0,0,0,0.6)"/>
    }

    const moreButtonClass = [classes.MoreButton];
    const moreContainerClass = [classes.Button];
    if (props.location.pathname === '/bookmarks') {
        moreButtonClass.push(classes.MoreTabActive);
        moreContainerClass.push(classes.ButtonActive);
    }

    return (
        <div className={classes.CenterOptionsContainer}>
           <div className={homeClasses.join(" ")} onClick={navHome}>
                <div className={[classes.ButtonIcon, classes.HouseIcon].join(" ")}>
                    {homeIcon}
                </div>
           </div>
           <div className={groupClasses.join(" ")} onClick={navGroups}>
               <div className={groupIconClasses.join(" ")}>
                   {groupIcon}
               </div>
           </div>
           <div className={[moreContainerClass.join(" ")]} onClick={navFullMenu}>
               <div className={moreButtonClass.join(" ")}>
                   <div className={classes.Lines}>
                        <div></div>
                        <div></div>
                        <div></div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default withRouter(centerOptions);