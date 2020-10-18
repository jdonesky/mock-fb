

import React from 'react';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";
import sharedClasses from './SharedLoadedContentUI.css'

const placesLived = ({currLocations, hometown}) => {
    console.log(hometown)
    const currentDate = new Date()
    const currLocationEntries = currLocations && currLocations.map((location,i) => (
        <ContentEntry
            key={i}
            category="work"
            mainText={`${location.name}`}
            subText={i === 0 ? 'Current city': 'Moved in'}
            sharedWith={location.privacy || 'public'}
        />
    ))

    const hometownEntry = (
        <ContentEntry
            category="fromLocation"
            mainText={hometown && hometown.name}
            subText="Hometown"
            sharedWith={hometown ? hometown.privacy : "public"}
        />
    )

    return (
        <React.Fragment>
            <section className={sharedClasses.SubCategory} style={{marginTop: '0'}}>
                <h3>Places Lived</h3>
                {currLocationEntries && currLocationEntries}
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
        currLocations: state.profile.currLocations,
        hometown: state.profile.hometown,
    }
}

export default connect(mapStateToProps)(placesLived);