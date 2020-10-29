

import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Event from './LifeEvent/LifeEvent'
import classes from './LifeEvents.css'

const lifeEvents = (props) => {

    let events = props.lifeEvents && props.lifeEvents.map(ev => 'test')

    const lifeEvents = (
        <div className={classes.EventsContainer}>

        </div>
    )

    return (
        <div className={classes.Container}>
            <div className={classes.Header}>
                <h2>Life Events</h2>
                <Link className={classes.Link} to="user-profile/life-events">See All</Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        lifeEvents: state.profile.lifeEvents
    }
}

export default connect(mapStateToProps)(lifeEvents)