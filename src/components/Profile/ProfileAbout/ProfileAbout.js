
import React, {useState, useEffect, Suspense} from 'react';
import {withRouter} from 'react-router';
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

    const [displayProfile, setDisplayProfile] = useState(props.match.params.id);
    const [viewAsFlag, setViewAsFlag] = useState(props.history.location.pathname.split('/')[props.history.location.pathname.split('/').length - 1])

    useEffect(() => {
        if (displayProfile !== props.match.params.id) {
            setDisplayProfile(displayProfile);
        }
    })

    let lifeEventTab;
    if (displayProfile === 'me') {
        lifeEventTab = <NavLink to={`/user-profile/${props.displayProfile}/about/life-events`} activeClassName={classes.active}>Life Events</NavLink>
    }

    return (
            <div className={classes.AboutContainer}>
                <section className={classes.IndexContainer}>
                    <h2>About</h2>
                    <ul>
                        <NavLink exact to={`/user-profile/${props.displayProfile}/about/${viewAsFlag || null}`} activeClassName={classes.active}>Overview</NavLink>
                        <NavLink to={`/user-profile/${props.displayProfile}/about/work-education/${viewAsFlag || null}`} activeClassName={classes.active}>Work and Education</NavLink>
                        <NavLink to={`/user-profile/${props.displayProfile}/about/places-lived/${viewAsFlag || null}`} activeClassName={classes.active}>Places Lived</NavLink>
                        <NavLink to={`/user-profile/${props.displayProfile}/about/contact-info/${viewAsFlag || null}`} activeClassName={classes.active}>Contact and Basic Info</NavLink>
                        <NavLink to={`/user-profile/${props.displayProfile}/about/family-relationships/${viewAsFlag || null}`} activeClassName={classes.active}>Family and Relationships</NavLink>
                        {lifeEventTab}
                    </ul>
                </section>
                <section className={classes.LoadedContent}>
                    {props.contentLoading ? <InlineDots /> : (<Suspense fallback={<FoldingSquare />}>
                        <Route exact path={`/user-profile/:id/about`} component={AboutContent} />
                        <Route path={`/user-profile/:id/about/:tab`} component={AboutContent}/>
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

export default connect(mapStateToProps)(withRouter(profileAbout));