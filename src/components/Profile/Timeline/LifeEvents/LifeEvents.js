

import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Event from './LifeEvent/LifeEvent'
import classes from './LifeEvents.css'

const lifeEvents = (props) => {

    useEffect(() => {
        console.log(props.lifeEvents)
    })

    let events = props.lifeEvents && props.lifeEvents.map(ev => {
        console.log({...ev})
        return (
            <Event
                {...ev}
                key={ev.id}
                category={ev.category}
                title={ev.title}
                description={ev.description}
            />
        )
    })

    const lifeEvents = (
        <div className={classes.Container}>
            <div className={classes.Header}>
                <h2>Life Events</h2>
                <Link className={classes.Link} to="user-profile/life-events">See All</Link>
            </div>
            <div className={classes.EventsContainer}>
                {events}
            </div>
        </div>
    )

    return events && events.length ? lifeEvents : null
}

const mapStateToProps = state => {
    return {
        lifeEvents: state.profile.lifeEvents
    }
}

export default connect(mapStateToProps)(lifeEvents)