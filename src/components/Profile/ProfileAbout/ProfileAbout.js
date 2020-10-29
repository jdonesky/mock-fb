
import React, {Suspense} from 'react';
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom';
import {Route} from 'react-router';
import classes from './ProfileAbout.css';
import FoldingSquare from '../../UI/Spinner/SquareFold'
import InlineDots from "../../UI/Spinner/InlineDots"

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
                    <NavLink to={"/user-profile/about/life-events"} activeClassName={classes.active}>Life Events</NavLink>
                </ul>
            </section>
            <section className={classes.LoadedContent}>
                {props.contentLoading ? <InlineDots /> : (<Suspense fallback={<FoldingSquare />}>
                    <Route exact path={"/user-profile/about"} component={AboutContent} />
                    <Route path={"/user-profile/about/:tab"} component={AboutContent}/>
                </Suspense>)}
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        contentLoading: state.profile.contentEntryLoading
    }
}

export default connect(mapStateToProps)(profileAbout);