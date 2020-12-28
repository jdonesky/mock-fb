

import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";
import AddContentButton from '../SharedContent/AddContentButton'
import sharedClasses from './SharedLoadedContentUI.css'

const placesLived = (props) => {

    const [displayProfile, setDisplayProfile] = useState(props.match.params.id)

    useEffect(() => {
        if (displayProfile !== props.match.params.id) {
            setDisplayProfile(props.match.params.id);
        }
    })

    const {currLocation, pastLocations, hometown, otherProfile} = props

    let sortedPlaces;
    let currentLocation;
    let userHometown;
    if (displayProfile === 'me') {
        sortedPlaces = pastLocations && pastLocations.sort((a,b) => (new Date(a.moveDate) < new Date(b.moveDate)) ? 1: -1)
        currentLocation = currLocation;
        userHometown = hometown;
    } else if (displayProfile !== 'me') {
        if (otherProfile) {
            if (otherProfile.pastLocations && otherProfile.pastLocations.length) {
                sortedPlaces =  otherProfile.pastLocations.sort((a,b) => (new Date(a.moveDate) < new Date(b.moveDate)) ? 1: -1)
            }
            currentLocation = otherProfile.currLocation
            userHometown = otherProfile.hometown
        }
    }

    const currLocationEntry = currentLocation && (
        <ContentEntry
            id={currentLocation.id}
            category="currLocation"
            mainText={`${currentLocation.name}`}
            subText='Current city'
            sharedWith={currentLocation.privacy || 'public'}
            content={currentLocation}
            displayProfile={displayProfile}
        />
    )

    const pastLocationEntries = sortedPlaces && sortedPlaces.map(loc => (
        <ContentEntry
            key={loc.id}
            id={loc.id}
            category="pastLocation"
            mainText={`${loc.name}`}
            subText={'Moved in ' + loc.moveDate}
            sharedWith={loc.privacy || 'public'}
            content={loc}
            displayProfile={displayProfile}
        />
    ))

    const hometownEntry = userHometown ? (
        <ContentEntry
            id={hometown.id}
            category="fromLocation"
            mainText={hometown && hometown.name}
            subText="Hometown"
            sharedWith={hometown ? hometown.privacy : "public"}
            content={hometown}
            displayProfile={displayProfile}
        />
    ) : displayProfile === 'me' ? <AddContentButton category="hometown"/> : <span className={sharedClasses.Placeholder}>No hometown to show</span>

    let addCurrentLocationButton;
    let addPastLocationButton;
    if (displayProfile === 'me' && !currentLocation) {
        addCurrentLocationButton = <AddContentButton category="currLocation" />
    }
    if (displayProfile === 'me') {
        addPastLocationButton = <AddContentButton category="pastLocation" />
    }
    return (
        <React.Fragment>
            <section className={sharedClasses.SubCategory} style={{marginTop: '0'}}>
                <h3>Places Lived</h3>
                {addCurrentLocationButton}
                {addPastLocationButton ? addPastLocationButton : <span className={sharedClasses.Placeholder}>No places to show</span>}
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
        otherProfile: state.users.otherProfile
    }
}

export default connect(mapStateToProps)(withRouter(placesLived));