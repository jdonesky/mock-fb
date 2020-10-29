

import React from 'react';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";
import AddContentButton from '../SharedContent/AddContentButton'
import sharedClasses from './SharedLoadedContentUI.css'

const lifeEvents = ({lifeEvents}) => {

    const events = lifeEvents && lifeEvents.sort((a,b) => (new Date(a.date) < new Date(b.date)) ? 1: -1)

    // const liveEventEntries = events && events.map(ev => (
    //     <ContentEntry
    //         key={ev.id}
    //         id={ev.id}
    //         category="pastLocation"
    //         mainText={`${ev.name}`}
    //         subText={'Moved in ' + ev.moveDate}
    //         sharedWith={ev.privacy || 'public'}
    //         content={ev}
    //     />
    // ))

    return (
        <React.Fragment>
            <section className={sharedClasses.SubCategory} style={{marginTop: '0'}}>
                <h3>Life Events</h3>
                <AddContentButton category="lifeEvent" />
            </section>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        lifeEvents: state.profile.lifeEvents,
    }
}

export default connect(mapStateToProps)(lifeEvents);