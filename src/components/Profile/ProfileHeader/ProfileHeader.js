

import React from 'react';
import {NavLink} from 'react-router-dom'
import classes from './ProfileHeader.css'
import SearchSvg from '../../../assets/images/search'
import ViewSvg from '../../../assets/images/eye'
import DownArrow from '../../../assets/images/down-arrow'

const profileHeader = (props) => {
    return (
        <div className={classes.HeaderContainer}>
            <section className={classes.Intro}>
                <h1>{props.name || 'Your Name'}</h1>
                <p>Add Bio</p>
            </section>
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
                                to="/user-profile/friends"
                                activeClassName={classes.active}
                            >Photos
                            </NavLink>
                        </div>
                        <div className={classes.MoreTab}>
                            <NavLink
                                to='/more'
                                activeClassName={classes.active}
                                >More
                            </NavLink>
                            <DownArrow />
                        </div>
                    </ul>
                </nav>
                <nav>
                    <ul className={classes.EditControls}>
                        <li>Edit Profile</li>
                        <li><ViewSvg /></li>
                        <li><SearchSvg /></li>
                        <li>...</li>
                    </ul>
                </nav>
            </section>
        </div>
    )
}

export default profileHeader;