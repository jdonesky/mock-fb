
import React, {useEffect} from 'react';
import AddContentButton from './ContentShared/AddContentButton'
import ContentEntry from './ContentShared/ContentEntry'

const aboutContent = (props) => {

    const {match} = props
    let content;
    useEffect(() => {
        switch (match.params.tab) {
            case 'work-education':
            case 'places-lived':
            case 'contact-info':
            case 'family-relationships':
            case 'details':
            case 'life-events':
            default:
        }
    }, [match])

    return (
        <React.Fragment>
            {/*{content}*/}
            <h1>{match.params.tab}</h1>
            <AddContentButton text="Add a workplace "/>
            <ContentEntry category="work" />
        </React.Fragment>
    );
}

export default aboutContent;