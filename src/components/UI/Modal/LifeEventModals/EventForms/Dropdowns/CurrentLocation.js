import React from 'react';
import classes from './CurrentLocation.css'
import {connect} from 'react-redux'
import Search from '../../../../../Search/Searchbar'
import SuggestedLocation from './SuggestedLocation'

const currentLocation = ({currLocation, hometown, pastLocations, update, close}) => {

    const updateInput = (value) => {
        update('location',value)
        close();
    }

    const currLocSuggestion = currLocation && <SuggestedLocation type="current" text={currLocation.name} clicked={() => updateInput(currLocation.name)}/>
    const suggestions = [hometown, ...pastLocations]
    const suggestedLocations = suggestions.length && suggestions.map(loc => (
        <SuggestedLocation text={loc.name} clicked={() => updateInput(loc.name)} />
    ))


    return (
        <div className={classes.Container}>
            <div className={classes.BaseArrow} />
            <div className={classes.Header}>
                <Search />
                <div className={classes.ConfirmButton}><span>Done</span></div>
            </div>
            {currLocSuggestion}
            {suggestedLocations}
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

