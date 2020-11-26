
import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationDropdown.css'

const navDropdown = (props) => {
    return (
        <div className={classes.DropdownContainer}>
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    <NavLink to="/user-profile/story-archive">Story Archive</NavLink>
                </div>
            </div>
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    <NavLink to="/user-profile/check-ins">Check-Ins</NavLink>
                </div>
            </div>
            <div className={classes.DropdownItemContainer}>
                <div className={classes.DropdownItem}>
                    <NavLink to="/user-profile/sports">Sports</NavLink>
                </div>
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

export default navDropdown;