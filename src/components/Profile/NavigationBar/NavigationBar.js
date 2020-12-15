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

    useEffect(() => {
        console.log('NAVIGATIONBAR - displayProfile: ', props.displayProfile)
    })
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
    let moreFill;
    if (width < 859) {
        if (props.location.pathname === `/user-profile/${props.displayProfile}/photos` ) {
            moreTabClasses.push(classes.ActiveMoreTab);
            moreFill = true;
        }
    }

    if (width < 777) {
        if (props.location.pathname === `/user-profile/${props.displayProfile}/friends` || props.location.pathname === `/user-profile/${props.displayProfile}/photos`) {
            moreTabClasses.push(classes.ActiveMoreTab);
            moreFill = true
        }
    }

    if (width < 664) {
        if ( props.location.pathname === `/user-profile/${props.displayProfile}/about` || props.location.pathname === `/user-profile/${props.displayProfile}/friends` || props.location.pathname === `/user-profile/${props.displayProfile}/photos`) {
            moreTabClasses.push(classes.ActiveMoreTab);
            moreFill = true;
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
                                to={`/user-profile/${props.displayProfile}`}
                                activeClassName={classes.active}
                            >Timeline
                            </NavLink>
                        </div>
                        <div className={classes.AboutTab}>
                            <NavLink
                                to={`/user-profile/${props.displayProfile}/about`}
                                activeClassName={classes.active}
                            >About
                            </NavLink>
                        </div>
                        <div className={classes.FriendsTab}>
                            <NavLink
                                to={`/user-profile/${props.displayProfile}/friends`}
                                activeClassName={classes.active}
                            >Friends
                            </NavLink>
                        </div>
                        <div className={classes.PhotosTab}>
                            <NavLink
                                to={`/user-profile/${props.displayProfile}/photos`}
                                activeClassName={classes.active}
                            >Photos
                            </NavLink>
                        </div>
                        <div className={moreTabClasses.join(" ")} onClick={toggleNavDropdown}>
                            <div
                            >More
                            </div>
                            <div className={classes.MoreArrowContainer}>
                                <DownArrow fill={moreFill ? '#1665f7' : null} />
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