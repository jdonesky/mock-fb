
import React, {Suspense} from 'react';
import {NavLink} from 'react-router-dom';
import {Route} from 'react-router';
import classes from './ProfileAbout.css';

const AboutContent = React.lazy(() => {
    return import('./AboutContent/AboutContent')
})

const profileAbout = props => {
    return (
        <div className={classes.AboutContainer}>
            <section className={classes.IndexContainer}>
                <h2>About</h2>
                <ul>
                    <NavLink exact to={"/user-profile/about"} activeClassName={classes.active}>Overview</NavLink>
                    <NavLink to={"/user-profile/about/work-education"} activeClassName={classes.active}>Work and Education</NavLink>
                    <NavLink to={"/user-profile/about/places-lived"} activeClassName={classes.active}>Places Lived</NavLink>
                    <NavLink to={"/user-profile/about/contact-info"} activeClassName={classes.active}>Contact and Basic Info</NavLink>
                    <NavLink to={"/user-profile/about/family-relationships"} activeClassName={classes.active}>Family and Relationships</NavLink>
                    {/*<NavLink to={"/user-profile/about/details"} activeClassName={classes.active}>Details About You</NavLink>*/}
                    <NavLink to={"/user-profile/about/life-events"} activeClassName={classes.active}>Life Events</NavLink>
                </ul>
            </section>
            <section className={classes.LoadedContent}>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Route exact path={"/user-profile/about"} component={AboutContent} />
                    <Route path={"/user-profile/about/:tab"} component={AboutContent}/>
                </Suspense>
            </section>
        </div>
    );
}

export default profileAbout;