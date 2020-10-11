
import React, {useEffect} from 'react';
import AddContentButton from './AddContentButton/AddContentButton'

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
            <AddContentButton />
        </React.Fragment>
    );
}

export default aboutContent;