

import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";
import AddContentButton from '../SharedContent/AddContentButton'
import sharedClasses from './SharedLoadedContentUI.css'

const familyAndRelationships = (props) => {

    const [displayProfile, setDisplayProfile] = useState(props.match.params.id);
    const {myFamily, myRelationships} = props;

    useEffect(() => {
        if (displayProfile !== props.match.params.id) {
            setDisplayProfile(props.match.params.id);
        }
    })

    let relationships;
    let family;
    if (displayProfile === 'me') {
        relationships = myRelationships;
        family = myFamily;
    }

    const relationshipEntry = relationships ?
        (
        <ContentEntry
            category="relationship"
            mainText={`${relationships && relationships[0].status}`}
            subText={relationships[0].partner ? relationships[0].partner : ''}
            sharedWith={relationships[0].privacy || 'public'}
            content={relationships}
            displayProfile={displayProfile}
        />
    ) : displayProfile === 'me' ? <AddContentButton category="relationship"/> : <span className={sharedClasses.Placeholder}>No relationships to show</span>

    const familyEntries = family && family.map((member, i) => (
        <ContentEntry
            key={i}
            category="family"
            mainText={member && member.name}
            subText={member && member.relationship}
            sharedWith={member ? member.privacy : "public"}
            content={family}
            displayProfile={displayProfile}
        />
    ))

    let addFamilyButton;
    if (displayProfile === 'me') {
        addFamilyButton = <AddContentButton category="family" />
    } else {
        addFamilyButton = <span className={sharedClasses.Placeholder}>No family to show</span>
    }

    return (
        <React.Fragment>
            <section className={sharedClasses.SubCategory} style={{marginTop: '0'}}>
                <h3>Relationship</h3>
                { relationshipEntry && relationshipEntry }
            </section>
            <section className={sharedClasses.SubCategory}>
                <h3>Family</h3>
                {addFamilyButton}
                {familyEntries && familyEntries}
            </section>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        myRelationships: state.profile.relationships,
        myFamily: state.profile.family,
        otherProfile: state.users.fullProfile
    }
}

export default connect(mapStateToProps)(withRouter(familyAndRelationships));