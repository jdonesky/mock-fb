import React, {useState, useCallback, useEffect} from 'react';
import classes from './CurrentLocation.css'
import {connect} from 'react-redux'
import Search from '../../../../../Search/Searchbar'
import SuggestedLocation from './SuggestedLocation'

const currentLocation = ({currLocation, hometown, pastLocations, update, close}) => {

    useEffect(() => {
        console.log('all suggestions', suggestions);
    })

    let curLoc;
    if (currLocation) {
        curLoc = {key: 'currLocation', name: currLocation.name}
    }
    let homeLoc;
    if (hometown) {
        homeLoc = {key: 'hometown', name: hometown.name};
    }
    let pastLocs;
    if (pastLocations && pastLocations.length) {
        pastLocs = pastLocations.map(loc => ({key: 'pastLocation', name: loc.name}))
    }

    let allSuggestions;
    if (curLoc) {
        allSuggestions.push(curLoc)
    }
    if (homeLoc) {
        allSuggestions.push(homeLoc)
    }

    if (pastLocs && pastLocs.length) {
        pastLocs.forEach(loc => allSuggestions.push(loc));
    }

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
        let filtered;
        if (allSuggestions && allSuggestions.length) {
            filtered = allSuggestions.filter(suggestion => suggestion.name.slice(0,term.length).toLowerCase() === term.toLowerCase())
        }
        setSuggestions(filtered && filtered.length ? filtered : term)
    }, [])

    let suggestLocations;
    if (suggestions && typeof(suggestions) ==='object') {
        suggestLocations = suggestions.map(loc => (
            <SuggestedLocation type={loc.key} text={loc.name} clicked={() => updateInput(loc.name)}/>
        ))
    }

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

