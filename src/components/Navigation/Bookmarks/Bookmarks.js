
import React from 'react';
import {connect} from 'react-redux';
import classes from './Bookmarks.css';
import Link from './Link/Link';

import Avatar from '../../../assets/images/BookmarkIcons/user';
import Friends from '../../../assets/images/BookmarkIcons/friends';
import Group from '../../../assets/images/TopNavButtonIcons/groupFill';
import Event from '../../../assets/images/BookmarkIcons/event';
import Bookmark from '../../../assets/images/BookmarkIcons/bookmark';
import Flag from '../../../assets/images/BookmarkIcons/flag';

const bookmarks = props => {

    const navigateTo = path => (
        props.history.push(path)
    )

    let links = [
        {text: props.name && props.name, path: '/user-profile/me', icon: <div className={classes.AvatarCircle}><Avatar fill="white"/></div>},
        {text: "Friends", path: '/friends', icon: <div className={classes.IconContainer}><Friends fillFirst="#0c9cf5" fillSecond="#3beb81"/></div>},
        {text: "Groups", path: '/groups', icon: <div className={[classes.AvatarCircle, classes.GroupCircle].join(" ")}><Group fill="white"/></div>},
        {text: "Events", path: '/events', icon: <div className={[classes.IconContainer,classes.EventContainer].join(" ")}><Event first="rgba(0,0,0,0.6)" second="rgba(0,0,0,0.6)" third="red" fourth="#ffffff" fifth="rgba(0,0,0,0.7)"/></div>},
        {text: "Saved", path: '/saved', icon: <div className={[classes.IconContainer, classes.Bookmark].join(" ")}><Bookmark fill="#e942f5"/></div>},
        {text: "Pages", path: '/pages', icon: <div className={[classes.IconContainer, classes.Flag].join(" ")}><Flag first="#0596f0" second="#0296f2"/></div>},
    ]

    links = links.map((link,i) => (
        <Link
            key={i}
            icon={link.icon}
            text={link.text}
            path={link.path}
            nav={navigateTo}
        />
    ))

    return (
        <section className={classes.Container}>
            {links}
        </section>
    )
}

const mapStateToProps = state => {
    return {
        name: state.profile.firstName + ' ' + state.profile.lastName
    }
}

export default connect(mapStateToProps)(bookmarks);