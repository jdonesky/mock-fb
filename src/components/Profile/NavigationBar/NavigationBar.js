import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import classes from './NavigationBar.css'
import NavDropdown from '../ProfileHeader/NavigationDropdown/NavigationDropdown'

import SearchSvg from '../../../assets/images/search'
import ViewSvg from '../../../assets/images/eye'
import DownArrow from '../../../assets/images/down-arrow'
import OutsideAlerter from "../../../hooks/outsideClickHandler";
import getWindowDimensions from "../../../hooks/getWindowDimensions";

const navigationBar = (props) => {

    const [showNavDropdown, setShowNavDropdown] = useState(false);
    const {width, height} = getWindowDimensions()

    const toggleNavDropdown = () => {
        setShowNavDropdown(prevState => {
            return !prevState;
        });
    }

    const closeNavDropdown = () => {
        setShowNavDropdown(false);
    }

    let navDropdown;
    if (showNavDropdown) {
        navDropdown = <NavDropdown />
    }

    const moreTabClasses = [classes.MoreTab]
    if (width <= 859) {
        if (props.location.pathname === '/user-profile/photos') {
            moreTabClasses.push(classes.ActiveMoreTab);
        }
    }

    if (width <= 777) {
        if (props.location.pathname === '/user-profile/friends' || props.location.pathname === '/user-profile/photos') {
            moreTabClasses.push(classes.ActiveMoreTab);
        }
    }

    if (width <= 664) {
        if ( props.location.pathname === '/user-profile/about' || props.location.pathname === '/user-profile/friends' || props.location.pathname === '/user-profile/photos') {
            moreTabClasses.push(classes.ActiveMoreTab);
        }
    }

    return (
            <React.Fragment>
            <div className={classes.Break} />
            <section className={classes.NavigationBar}>
                <nav>
                    <ul className={classes.TabControls}>
                        <div className={classes.TimelineTab}>
                            <NavLink
                                exact
                                to="/user-profile"
                                activeClassName={classes.active}
                            >Timeline
                            </NavLink>
                        </div>
                        <div className={classes.AboutTab}>
                            <NavLink
                                to="/user-profile/about"
                                activeClassName={classes.active}
                            >About
                            </NavLink>
                        </div>
                        <div className={classes.FriendsTab}>
                            <NavLink
                                to="/user-profile/friends"
                                activeClassName={classes.active}
                            >Friends
                            </NavLink>
                        </div>
                        <div className={classes.PhotosTab}>
                            <NavLink
                                to="/user-profile/photos"
                                activeClassName={classes.active}
                            >Photos
                            </NavLink>
                        </div>
                        <div className={moreTabClasses.join(" ")} onClick={toggleNavDropdown}>
                            <div
                            >More
                            </div>
                            <div className={classes.MoreArrowContainer}>
                                <DownArrow />
                            </div>
                        </div>
                        <div className={classes.MoreTabBlockPositioner}>
                            <div className={classes.MoreTabBlocker} style={{display: showNavDropdown ? 'block' : 'none'}}/>
                            <OutsideAlerter action={closeNavDropdown}>
                                <div className={classes.DropdownNavPositioner}>
                                    {navDropdown}
                                </div>
                            </OutsideAlerter>
                        </div>
                    </ul>
                </nav>
                <nav>
                    <ul className={classes.EditControls}>
                        <li className={classes.EditProfile}>Edit Profile</li>
                        <li><ViewSvg /></li>
                        <li><SearchSvg /></li>
                        <li>...</li>
                    </ul>
                </nav>
            </section>
            </React.Fragment>
    )
}


export default withRouter(navigationBar);