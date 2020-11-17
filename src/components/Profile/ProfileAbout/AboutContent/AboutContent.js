
import React from 'react';
import Overview from './LoadedContent/Overview'

const WorkAndEducation = React.lazy(() => {
    return import('./LoadedContent/WorkandEducation')
})
const PlacesLived = React.lazy(() => {
    return import('./LoadedContent/PlacesLived')
})

const FamilyAndRelationships = React.lazy(() => {
    return import('./LoadedContent/Family&Relationships')
})

const ContactBasicInfo = React.lazy(() => {
    return import('./LoadedContent/ContactBasicInfo')
})

const LifeEvents = React.lazy(() => {
    return import('./LoadedContent/LifeEvents')
})


const aboutContent = (props) => {

    const {match} = props
    let content = null;
    switch (match.params.tab) {
        case 'work-education':
            content = <WorkAndEducation {...props}/>
            break;
        case 'places-lived':
            content = <PlacesLived {...props}/>
            break;
        case 'contact-info':
            content = <ContactBasicInfo {...props}s/>
            break;
        case 'family-relationships':
            content = <FamilyAndRelationships {...props}/>
            break;
        case 'life-events':
            content = <LifeEvents {...props} />
            break;
        default:
            content = <Overview {...props}/>
    }

    return content;

}

export default aboutContent;