import React, {useState, useCallback, useEffect} from 'react';
import classes from './CurrentLocation.css'
import {connect} from 'react-redux'
import {geocode} from "../../../../../../shared/utility";
import Search from '../../../../../Search/Searchbar'
import SuggestedLocation from './SuggestedLocation'
import Map from '../../../../../Map/Map';

const currentLocation = ({value, update, close}) => {

    const [showSuggested, setShowSuggested] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [storedLocation, setStoredLocation] = useState(value || null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);


    const updateStored = (location) => {
        setStoredLocation(location)
        setSearchResults(null);
        setShowSuggested(false)
    }

    const confirmSearch = () => {
        update('location', storedLocation);
        close();
    }

    const filterTerms = useCallback((term) => {
        geocode(term, (type, payload) => {
            switch (type) {
                case 'SUCCESS':
                    const results = payload.map(loc => ({
                        name: loc.formatted_address,
                        coordinates: loc.geometry.location
                    }))
                    setSearchResults(results);
                    setShowSuggested(true);
                    break;
                case 'FAIL':
                    setShowErrorMessage(true);
                    break;
                default:
                    return;
            }
        })
    }, [])

    let suggestedLocations;
    if (searchResults) {
        suggestedLocations = searchResults.map((loc,i) => (
            <SuggestedLocation key={i} text={loc.name} clicked={() => updateStored(loc)}/>
        ))
    }

    let suggestedDropdown;
    if (showSuggested && searchResults.length) {
        suggestedDropdown = (
            <div className={classes.SuggestionsPositioner}>
                <div className={classes.SuggestionsDropdown}>
                    {suggestedLocations}
                </div>
            </div>
        )
    }

    let errorMessage;
    if (showErrorMessage || searchResults && searchResults.length === 0) {
        errorMessage = <div>Sorry, nothing found</div>
    }

    return (
        <div className={classes.Container}>
            <div className={classes.BaseArrow} />
            <div className={classes.Header}>
                <Search term={value ? value.name : null} filterResults={filterTerms}/>
                <div className={[classes.ConfirmButton, storedLocation ? null : classes.DisableSave].join(" ")} onClick={storedLocation ? confirmSearch : null}><span>Save</span></div>
            </div>
            {errorMessage}
            {suggestedDropdown}
            <section className={classes.MapSection}>
                <div className={classes.MapContainer}>
                    <Map userLocation={storedLocation && storedLocation.coordinates} height="210px" width="250px" borderRadius="6px"/>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currLocation: state.profile.currLocation,
        hometown: state.profile.hometown,
        pastLocations: state.profile.pastLocations,
    }
}

export default connect(mapStateToProps)(currentLocation);

