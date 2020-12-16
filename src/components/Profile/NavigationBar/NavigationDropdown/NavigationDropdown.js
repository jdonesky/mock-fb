
import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';
import classes from './NavigationDropdown.css'
import getWindowDimensions from "../../../../hooks/getWindowDimensions";
import Check from '../../../../assets/images/check'

const navDropdown = (props) => {

    const {height, width} = getWindowDimensions()

    let activeCheck = (
        <div className={classes.ActiveCheck}>
            <Check fill="rgba(0,0,0,0.5)"/>
        </div>
    )
    const timeline = (
        <div className={classes.DropdownItemContainer} onClick={() => onClickTab("/user-profile")}>
            <div className={classes.DropdownItem}>
                {props.displayProfile === 'me' ? 'Timeline' : 'Posts'}
            </div>
            {props.location.pathname === `/user-profile/${props.displayProfile}` ? activeCheck : null}
        </div>
    )
    const about = (
        <div className={classes.DropdownItemContainer} onClick={() => onClickTab(`/user-profile/${props.displayProfile}/about`)}>
            <div className={classes.DropdownItem}>
                About
            </div>
            {props.location.pathname === `/user-profile/${props.displayProfile}/about` ? activeCheck : null}
        </div>
    )
    const friends = (
        <div className={classes.DropdownItemContainer} onClick={() => onClickTab(`/user-profile/${props.displayProfile}/friends`)}>
            <div className={classes.DropdownItem}>
                Friends
            </div>
            {props.location.pathname === `/user-profile/${props.displayProfile}/friends` ? activeCheck : null}
        </div>
    )
    const photos = (
        <div className={classes.DropdownItemContainer} onClick={() => onClickTab(`/user-profile/${props.displayProfile}/photos`)}>
            <div className={classes.DropdownItem}>
                Photos
            </div>
            {props.location.pathname === `/user-profile/${props.displayProfile}/photos` ? activeCheck : null}
        </div>
    )

    let extraTabs = [timeline, about, friends, photos]

    if (width >= 859) {
        extraTabs = [];
    }

    if (width <= 859 && width >= 777) {
        extraTabs =  extraTabs.slice(3);
    }

    if (width <= 777 && width >= 664) {
        extraTabs =  extraTabs.slice(2);
    }

    if (width <= 664 && width >= 588) {
        extraTabs =  extraTabs.slice(1);
    }

    const onClickTab = (path) => {
        props.history.push(path);
    }

    return (
        <div className={classes.DropdownContainer}>
            {extraTabs}
            <div className={classes.DropdownItemContainer}  onClick={() => onClickTab(`/user-profile/${props.displayProfile}/story-archive`)}>
                <div className={classes.DropdownItem}>
                    Story Archive
                </div>
                {props.location.pathname === `/user-profile/${props.displayProfile}/story-archive` ? activeCheck : null}
            </div>
            <div className={classes.DropdownItemContainer} onClick={() => onClickTab(`/user-profile/${props.displayProfile}/check-ins`)}>
                <div className={classes.DropdownItem}>
                    Check-Ins
                </div>
                {props.location.pathname === `/user-profile/${props.displayProfile}/check-ins` ? activeCheck : null}
            </div>
            <div className={classes.DropdownItemContainer}  onClick={() => onClickTab(`/user-profile/${props.displayProfile}/sports`)}>
                <div className={classes.DropdownItem}>
                    Sports
                </div>
                {props.location.pathname === `/user-profile/${props.displayProfile}/sports` ? activeCheck : null}
            </div>
            <div className={classes.DropdownItemContainer}  onClick={() => onClickTab(`/user-profile/${props.displayProfile}/music`)}>
                <div className={classes.DropdownItem}>
                    Music
                </div>
                {props.location.pathname === `/user-profile/${props.displayProfile}/music` ? activeCheck : null}
            </div>
            <div className={classes.DropdownItemContainer}  onClick={() => onClickTab(`/user-profile/${props.displayProfile}/movies`)}>
                <div className={classes.DropdownItem}>
                    Movies
                </div>
                {props.location.pathname === `/user-profile/${props.displayProfile}/movies`? activeCheck : null}
            </div>
            <div className={classes.DropdownItemContainer} onClick={() => onClickTab(`/user-profile/${props.displayProfile}/tv-shows`)}>
                <div className={classes.DropdownItem}>
                    TV Shows
                </div>
                {props.location.pathname === `/user-profile/${props.displayProfile}/tv-shows` ? activeCheck : null}
            </div>
            <div className={classes.DropdownItemContainer} onClick={() => onClickTab(`/user-profile/${props.displayProfile}/books`)}>
                <div className={classes.DropdownItem}>
                    Books
                </div>
                {props.location.pathname === `/user-profile/${props.displayProfile}/books` ? activeCheck : null}
            </div>
            <div className={classes.DropdownItemContainer} onClick={() => onClickTab(`/user-profile/${props.displayProfile}/events`)}>
                <div className={classes.DropdownItem}>
                    Events
                </div>
                {props.location.pathname === `/user-profile/${props.displayProfile}/events` ? activeCheck : null}
            </div>
            <div className={classes.DropdownItemContainer} onClick={() => onClickTab(`/user-profile/${props.displayProfile}/reviews`)}>
                <div className={classes.DropdownItem}>
                    Reviews
                </div>
                {props.location.pathname === `/user-profile/${props.displayProfile}/reviews` ? activeCheck : null}
            </div>
            <div className={classes.DropdownItemContainer} onClick={() => onClickTab(`/user-profile/${props.displayProfile}/groups`)}>
                <div className={classes.DropdownItem}>
                    Groups
                </div>
                {props.location.pathname === `/user-profile/${props.displayProfile}/groups` ? activeCheck : null}
            </div>
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    Manage Sections
                </div>
            </div>
        </div>
    )
}

export default withRouter(navDropdown);