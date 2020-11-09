
import React, {useContext, useState, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import baseClasses from '../ChooseBackground/ChooseBackground.css';
import classes from "./Location.css";
import BackArrow from "../../../../../assets/images/LifeEventIcons/left-arrow";
import {PostContext} from "../../../../../context/post-context";
import axios from 'axios';

import Suggestion from './Suggestion/SuggestedLocation';
import Search from "../../../../Search/Searchbar";


const searchLocations = ({pastLocations, currLocation, hometown}) => {

    const postContext = useContext(PostContext);

    const curLoc = {type: 'current', name: currLocation.name};
    const homeLoc = {type: 'hometown', name: hometown.name};
    const pastLocs = pastLocations.map(loc => ({type: 'pastLocation', name: loc.name}));
    const allSuggestions = [curLoc, homeLoc, ...pastLocs];

    const [suggestions, setSuggestions] = useState(allSuggestions);

    const selectSuggestion = (name) => {
        postContext.passData('location', name);
        postContext.toggleModalContent('CREATE_POST');
    }

    const filterTerms = useCallback((name) => {
        axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${name}&types=(cities)&language=en&key=AIzaSyD4T1w5B2QyiyC4gFZ_f1dmvZ8_ghJkX0E`)
            .then(response => {
                const filtered = allSuggestions.filter(suggestion => suggestion.name.split(" ")[0].slice(0,name.length).toLowerCase() === name.toLowerCase() || suggestion.name.split(" ")[1].slice(0,name.length).toLowerCase() === name.toLowerCase());
                filtered.push(...[...response.data.predictions].map(city => ({type: 'pastLocation', name: city.description})))
                setSuggestions(filtered.length ? filtered : '')
            })
            .catch(err => {
                const filtered = allSuggestions.filter(suggestion => suggestion.name.split(" ")[0].slice(0,name.length).toLowerCase() === name.toLowerCase() || suggestion.name.split(" ")[1].slice(0,name.length).toLowerCase() === name.toLowerCase());
                setSuggestions(filtered.length ? filtered : '')
                console.log(err)
            })
    }, [])

    const friendSuggestions = suggestions && suggestions.map((suggest,i) => (
        <Suggestion key={i} name={suggest.name} img={suggest.img} clicked={() => selectSuggestion(suggest.name)} />
    ))

    return (
        <div>
            <section className={[baseClasses.Header, classes.Header].join(" ")}>
                <div className={baseClasses.CancelIcon} onClick={() => postContext.toggleModalContent('CREATE_POST')}>
                    <BackArrow />
                </div>
                <div className={baseClasses.Title}>
                    <h3>Search for location</h3>
                </div>
            </section>
            <section className={classes.SearchSection}>
                <Search filterResults={filterTerms} className={classes.SearchBar} placeholder="Where are you?"/>
            </section>
            <section className={classes.SuggestionsSection}>
                {friendSuggestions}
            </section>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        authToken: state.auth.token,
        pastLocations: state.profile.pastLocations,
        currLocation: state.profile.currLocation,
        hometown: state.profile.hometown
    }
}

export default connect(mapStateToProps)(searchLocations);