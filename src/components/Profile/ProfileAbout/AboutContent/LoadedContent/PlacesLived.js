

import React from 'react';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";
import AddContentButton from '../SharedContent/AddContentButton'
import sharedClasses from './SharedLoadedContentUI.css'

const placesLived = ({currLocation, pastLocations, hometown}) => {

    const sortedPlaces = pastLocations && pastLocations.sort((a,b) => (new Date(a.moveDate) < new Date(b.moveDate)) ? 1: -1)
    const currLocationEntry = currLocation && (
        <ContentEntry
            category="currLocation"
            mainText={`${currLocation.name}`}
            subText='Current city'
            sharedWith={currLocation.privacy || 'public'}
            content={currLocation}
        />
    )

    const pastLocationEntries = sortedPlaces && sortedPlaces.map(loc => (
        <ContentEntry
            key={loc.id}
            category="pastLocation"
            mainText={`${loc.name}`}
            subText={'Moved in ' + loc.moveDate}
            sharedWith={loc.privacy || 'public'}
            content={loc}
        />
    ))


    const hometownEntry = hometown ? (
        <ContentEntry
            category="fromLocation"
            mainText={hometown && hometown.name}
            subText="Hometown"
            sharedWith={hometown ? hometown.privacy : "public"}
            content={hometown}
        />
    ) : <AddContentButton category="hometown"/>

    return (
        <React.Fragment>
            <section className={sharedClasses.SubCategory} style={{marginTop: '0'}}>
                <h3>Places Lived</h3>
                {!currLocation && <AddContentButton category="currLocation" />}
                <AddContentButton category="pastLocation" />
                {currLocationEntry && currLocationEntry}
                {pastLocationEntries && pastLocationEntries}
            </section>
            <section className={sharedClasses.SubCategory}>
                <h3>Hometown</h3>
                {hometownEntry && hometownEntry}
            </section>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        currLocation: state.profile.currLocation,
        pastLocations: state.profile.pastLocations,
        hometown: state.profile.hometown,
    }
}

export default connect(mapStateToProps)(placesLived);