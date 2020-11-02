import React, {useState, useEffect, useCallback} from 'react';
import classes from './CurrentLocation.css'
import {connect} from 'react-redux'
import Search from '../../../../../Search/Searchbar'
import SuggestedLocation from './SuggestedLocation'

const currentLocation = ({currLocation, hometown, pastLocations, update, close}) => {

    const curLoc = {key: 'currLocation', name: currLocation.name}
    const homeLoc = {key: 'hometown', name: hometown.name}
    const pastLocs = pastLocations.map(loc => ({key: 'pastLocation', name: loc.name}))
    const allSuggestions = [curLoc, homeLoc, ...pastLocs]

    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState(allSuggestions)

    const updateInput = (value) => {
        update('location',value);
        close();
    }

    const confirmSearch = () => {
        update('location', searchTerm);
        close();
    }

    const filterTerms = useCallback((term) => {
        setSearchTerm(term)
        const filtered = allSuggestions.filter(suggestion => suggestion.name.slice(0,term.length).toLowerCase() === term.toLowerCase())
        setSuggestions(filtered.length ? filtered : '')
    }, [])


    const suggestLocations = suggestions && suggestions.length && suggestions.map(loc => (
        <SuggestedLocation type={loc.key} text={loc.name} clicked={() => updateInput(loc.name)}/>
    ))

    return (
        <div className={classes.Container}>
            <div className={classes.BaseArrow} />
            <div className={classes.Header}>
                <Search filterResults={filterTerms}/>
                <div className={classes.ConfirmButton} onClick={confirmSearch}><span>Done</span></div>
            </div>
            {suggestLocations}
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

