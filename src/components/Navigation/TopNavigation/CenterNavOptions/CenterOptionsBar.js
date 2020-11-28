
import React from 'react';
import {withRouter} from 'react-router';
import classes from './CenterOptionsBar.css';

import HouseContour from '../../../../assets/images/TopNavButtonIcons/home-contour';
import HouseFilled from '../../../../assets/images/TopNavButtonIcons/home-filled';
import GroupContour from '../../../../assets/images/TopNavButtonIcons/groupContour';
import GroupFilled from '../../../../assets/images/TopNavButtonIcons/groupFill';

const centerOptions = (props) => {

    const navHome = () => {
        if (props.location.pathname !== '/home') {
            props.history.push('/home')
        }
    }

    let homeIcon;
    if (props.location.pathname === '/home') {
        homeIcon = <HouseFilled />
    } else {
        homeIcon = <HouseContour />
    }

    let groupIcon;
    if (props.location.pathname === '/groups') {
        groupIcon = <GroupFilled />
    } else {
        groupIcon = <GroupContour />
    }

    const moreButtonClass = [classes.MoreButton];
    if (props.location.pathname === '/more') {
        moreButtonClass.push(classes.MoreTabActive)
    }

    return (
        <div className={classes.CenterOptionsContainer} onClick={navHome}>
           <div className={classes.Button}>
                <div className={classes.ButtonIcon}>
                    {homeIcon}
                </div>
           </div>
           <div className={classes.Button}>
               <div className={classes.ButtonIcon}>
                   {groupIcon}
               </div>
           </div>
           <div className={classes.Button}>
               <div className={moreButtonClass.join(" ")}>
                    <div></div>
                    <div></div>
                    <div></div>
               </div>
           </div>
        </div>
    )
}

export default withRouter(centerOptions);