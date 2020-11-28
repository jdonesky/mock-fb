
import React from 'react';
import {withRouter} from 'react-router';
import classes from './CenterOptionsBar.css';

import HouseContour from '../../../../assets/images/TopNavButtonIcons/home-contour';
import HouseFilled from '../../../../assets/images/TopNavButtonIcons/home-filled';
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
        if (props.location.pathname !== '/hub') {
            props.history.push('/hub')
        }
    }

    let homeIcon;
    let homeClasses = [classes.Button];
    if (props.location.pathname === '/home') {
        homeIcon = <HouseFilled fill="#1b6ee3" />
        homeClasses.push(classes.ButtonActive)
    } else {
        homeIcon = <HouseContour fill="rgba(0,0,0,0.6)"/>
    }

    let groupIcon;
    if (props.location.pathname === '/groups') {
        groupIcon = <GroupFilled fill="white"/>
    } else {
        groupIcon = <GroupFilled fill="rgba(0,0,0,0.6)"/>
    }

    const moreButtonClass = [classes.MoreButton];
    if (props.location.pathname === '/hub') {
        moreButtonClass.push(classes.MoreTabActive)
    }

    const groupButtonClasses = [classes.ButtonIcon, classes.GroupIcon]
    if (props.location.pathname === '/groups') {
        groupButtonClasses.push(classes.GroupsActive)
    }

    return (
        <div className={classes.CenterOptionsContainer}>
           <div className={homeClasses.join(" ")} onClick={navHome}>
                <div className={[classes.ButtonIcon, classes.HouseIcon].join(" ")}>
                    {homeIcon}
                </div>
           </div>
           <div className={classes.Button} onClick={navGroups}>
               <div className={groupButtonClasses.join(" ")}>
                   {groupIcon}
               </div>
           </div>
           <div className={classes.Button} onClick={navFullMenu}>
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