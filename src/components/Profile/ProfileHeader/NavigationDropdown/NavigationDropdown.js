
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
        <div className={classes.DropdownItemContainer}>
            <div className={classes.DropdownItem}>
                <NavLink to="/user-profile">Timeline</NavLink>
            </div>
            {props.location.pathname === "/user-profile" ? activeCheck : null}
        </div>
    )
    const about = (
        <div className={classes.DropdownItemContainer}>
            <div className={classes.DropdownItem}>
                <NavLink to="/user-profile/about">About</NavLink>
            </div>
            {props.location.pathname === "/user-profile/about" ? activeCheck : null}
        </div>
    )
    const friends = (
        <div className={classes.DropdownItemContainer}>
            <div className={classes.DropdownItem}>
                <NavLink to="/user-profile/friends">Friends</NavLink>
            </div>
            {props.location.pathname === "/user-profile/friends" ? activeCheck : null}
        </div>
    )
    const photos = (
        <div className={classes.DropdownItemContainer}>
            <div className={classes.DropdownItem}>
                <NavLink to="/user-profile/photos">Photos</NavLink>
            </div>
            {props.location.pathname === "/user-profile/photos" ? activeCheck : null}
        </div>
    )

    let extraTabs = [timeline, about, friends, photos]

    if (width >= 859) {
        extraTabs = [];
    }

    if (width <= 859 && width >= 777) {
        extraTabs =  extraTabs[3];
    }

    if (width <= 777 && width >= 664) {
        extraTabs =  extraTabs.slice(2);
    }

    if (width <= 664 && width >= 588) {
        extraTabs =  extraTabs.slice(1);
    }

    return (
        <div className={classes.DropdownContainer}>
            {extraTabs}
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    <NavLink to="/user-profile/story-archive">Story Archive</NavLink>
                </div>
                {props.location.pathname === "/user-profile/story-archive" ? activeCheck : null}
            </div>
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    <NavLink to="/user-profile/check-ins">Check-Ins</NavLink>
                </div>
                {props.location.pathname === "/user-profile/check-ins" ? activeCheck : null}
            </div>
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    <NavLink to="/user-profile/sports">Sports</NavLink>
                </div>
                {props.location.pathname === "/user-profile/sports" ? activeCheck : null}
            </div>
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    <NavLink to="/user-profile/music">Music</NavLink>
                </div>
            </div>
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    <NavLink to="/user-profile/movies">Movies</NavLink>
                </div>
            </div>
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    <NavLink to="/user-profile/tv-shows">TV Shows</NavLink>
                </div>
            </div>
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    <NavLink to="/user-profile/books">Books</NavLink>
                </div>
            </div>
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    <NavLink to="/user-profile/events">Events</NavLink>
                </div>
            </div>
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    <NavLink to="/user-profile/reviews">Reviews</NavLink>
                </div>
            </div>
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    <NavLink to="/user-profile/groups">Groups</NavLink>
                </div>
            </div>
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    <div className={classes.ManageSectionsButton}>Manage Sections</div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(navDropdown);