
import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './ProfileAbout.css';

const profileAbout = props => {
    return (
        <div className={classes.AboutContainer}>
        <section className={classes.IndexContainer}>
            <h2>About</h2>
            <ul>
                <NavLink to={"/user-profile/about"} activeClassName={classes.active}>Overview</NavLink>
                <NavLink to={"/user-profile/about/work-education"} activeClassName={classes.active}>Work and Education</NavLink>
                <NavLink to={"/user-profile/about/places-lived"} activeClassName={classes.active}>Places Lived</NavLink>
                <NavLink to={"/user-profile/about/contact-info"} activeClassName={classes.active}>Contact and Basic Info</NavLink>
                <NavLink to={"/user-profile/about/family-relationships"} activeClassName={classes.active}>Family and Relationships</NavLink>
                <NavLink to={"/user-profile/about/details"} activeClassName={classes.active}>Details About You</NavLink>
                <NavLink to={"/user-profile/about/life-events"} activeClassName={classes.active}>Life Events</NavLink>
            </ul>
        </section>
        <section className={classes.LoadedContent}>
            {/*<h3>Placeholder</h3>*/}
        </section>
        </div>
    );
}

export default profileAbout;