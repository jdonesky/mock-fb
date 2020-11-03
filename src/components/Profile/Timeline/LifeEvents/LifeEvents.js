

import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Event from './LifeEvent/LifeEvent'
import classes from './LifeEvents.css'

const lifeEvents = (props) => {

    useEffect(() => {
        console.log(props.lifeEvents)
    })

    const first = props.lifeEvents && [props.lifeEvents[0]].map(ev => {
        return (
            <Event
                key={ev.id}
                category={ev.category}
                mainText={ev.title}
                subText={`${ev.month} ${ev.day} ${ev.year !== new Date().getFullYear().toString() ? ', ' + ev.year : ''}`}
                className={classes.LeftEvent}
            />
        )
    })

    const second = props.lifeEvents && [props.lifeEvents[1]].map(ev => {
        return (
            <Event
                key={ev.id}
                category={ev.category}
                mainText={ev.title}
                subText={`${ev.month} ${ev.day}, ${ev.year !== new Date().getFullYear() && ev.year}`}
                className={classes.RightEvent}
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
                {first}
                {second}
            </div>
        </div>
    )

    return lifeEvents;
}

const mapStateToProps = state => {
    return {
        lifeEvents: state.profile.lifeEvents
    }
}

export default connect(mapStateToProps)(lifeEvents)