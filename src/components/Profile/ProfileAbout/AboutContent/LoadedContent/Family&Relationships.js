

import React from 'react';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";
import AddContentButton from '../SharedContent/AddContentButton'
import sharedClasses from './SharedLoadedContentUI.css'

const familyAndRelationships = ({family, relationships}) => {

    const relationshipEntry = relationships ?
        (
        <ContentEntry
            category="relationship"
            mainText={`${relationships && relationships[0].status}`}
            subText={relationships[0].partner ? relationships[0].partner : ''}
            sharedWith={relationships[0].privacy || 'public'}
            content={relationships}
        />
    ) : <AddContentButton category="relationship"/>

    const familyEntries = family && family.map((member, i) => (
        <ContentEntry
            key={i}
            category="family"
            mainText={member && member.name}
            subText={member && member.relationship}
            sharedWith={member ? member.privacy : "public"}
            content={family}
        />
    ))

    return (
        <React.Fragment>
            <section className={sharedClasses.SubCategory} style={{marginTop: '0'}}>
                <h3>Relationship</h3>
                { relationshipEntry && relationshipEntry }
            </section>
            <section className={sharedClasses.SubCategory}>
                <h3>Hometown</h3>
                <AddContentButton category="family" />
                {familyEntries && familyEntries}
            </section>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        relationships: state.profile.relationships,
        family: state.profile.family,
    }
}

export default connect(mapStateToProps)(familyAndRelationships);