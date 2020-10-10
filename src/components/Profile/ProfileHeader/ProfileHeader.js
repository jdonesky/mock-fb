

import React from 'react';
import {NavLink} from 'react-router-dom'
import classes from './ProfileHeader.css'

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
                        <NavLink
                            to="/user-profile"
                            activeClassName={classes.active}
                            >Timeline</NavLink>
                        <NavLink
                            to="/about"
                            activeClassName={classes.active}
                            >
                            About</NavLink>
                        <NavLink
                            to='/more'
                            activeClassName={classes.active}
                            >More</NavLink>
                    </ul>
                </nav>
                <nav>
                    <ul className={classes.EditControls}>
                        <li>Edit Profile</li>
                        <li>View As</li>
                        <li>...</li>
                    </ul>
                </nav>
            </section>
        </div>
    )
}

export default profileHeader;