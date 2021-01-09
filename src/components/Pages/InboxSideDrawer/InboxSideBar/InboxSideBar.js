import React from 'react';
import {withRouter} from 'react-router';
import classes from './InboxSideBar.css';
import Flag from '../../../../assets/images/BookmarkIcons/flag';

const inboxSideBar = props => {
    return (
        <div className={classes.SideBarContainer}>
            <div className={classes.ProfileImageContainer}>
                <div
                    className={classes.ProfileImage}
                    style={{backgroundImage: props.profileImage ? `url(${props.profileImage})`: null}}
                    onClick={() => props.history.push(`/pages/manage/${props.history.location.pathname.split('/')[3]}`)}
                >
                    {props.profileImage ? null : <Flag first="white" second="white"/>}
                </div>
            </div>
            <div className={classes.SectionBreak}/>
        </div>
    )
}

export default withRouter(inboxSideBar);