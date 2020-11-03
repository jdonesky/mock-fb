

import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {mapMonths} from "../../../../shared/utility";
import Event from './LifeEvent/LifeEvent'
import classes from './LifeEvents.css'

const lifeEvents = (props) => {


    let sortedEvents;
    if (props.lifeEvents) {
        sortedEvents = props.lifeEvents && props.lifeEvents.map(ev => ({...ev, date: new Date(`${ev.year} ${ev.month} ${ev.day}`)})).sort((a,b) => a.date < b.date ? 1: -1)
    }



    const first = sortedEvents && [sortedEvents[0]].map(ev => {
        return (
            <Event
                key={ev.id}
                category={ev.category}
                mainText={ev.title}
                subText={`${ev.year} ${mapMonths[ev.month]} ${ev.day}` === `${new Date().getFullYear().toString()} ${new Date().getMonth().toString()} ${new Date().getDate().toString()}` ? 'Today' : `${ev.month} ${ev.day} ${ev.year !== new Date().getFullYear().toString() ? ', ' + ev.year : ''}`}
                className={classes.LeftEvent}
                imageClass={classes.LeftEventImage}
            />
        )
    })

    const second = sortedEvents && [sortedEvents[1]].map(ev => {
        return (
            <Event
                key={ev.id}
                category={ev.category}
                mainText={ev.title}
                subText={`${ev.year} ${mapMonths[ev.month]} ${ev.day}` === `${new Date().getFullYear().toString()} ${new Date().getMonth().toString()} ${new Date().getDate().toString()}` ? 'Today' : `${ev.month} ${ev.day} ${ev.year !== new Date().getFullYear().toString() ? ', ' + ev.year : ''}`}
                className={classes.RightEvent}
                imageClass={classes.RightEventImage}
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