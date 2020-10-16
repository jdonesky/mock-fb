
import React from 'react';

import Overview from './LoadedContent/Overview'
import WorkAndEducation from './LoadedContent/WorkandEducation'

const aboutContent = (props) => {

    const {match} = props
    let content = null;
    switch (match.params.tab) {
        case 'work-education':
            content = <WorkAndEducation {...props}/>
            break;
        // case 'places-lived':
        // case 'contact-info':
        // case 'family-relationships':
        // case 'details':
        // case 'life-events':
        default:
            content = <Overview {...props}/>
    }

    return content;

}

export default aboutContent;