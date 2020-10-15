
import React, {useEffect} from 'react';

import Overview from './LoadedContent/Overview'

const aboutContent = (props) => {

    const {match} = props
    let content = null;
    switch (match.params.tab) {
        // case 'work-education':
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