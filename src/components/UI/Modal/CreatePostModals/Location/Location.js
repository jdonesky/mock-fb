
import React, {useContext, useState, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import baseClasses from '../ChooseBackground/ChooseBackground.css';
import classes from "./Location.css";
import BackArrow from "../../../../../assets/images/LifeEventIcons/left-arrow";
import Cancel from "../../../../../assets/images/close"
import {PostContext} from "../../../../../context/post-context";

import Suggestion from '../TagFriends/Suggestion/Suggestion'
import Search from "../../../../Search/Searchbar";

const tagFriends = ({pastLocations, currLocation, hometown}) => {

    const postContext = useContext(PostContext)

    const curLoc = {key: 'currLocation', name: currLocation.name}
    const homeLoc = {key: 'hometown', name: hometown.name}
    const pastLocs = pastLocations.map(loc => ({key: 'pastLocation', name: loc.name}))
    const allSuggestions = [curLoc, homeLoc, ...pastLocs]

    // const allSuggestions = friends && friends.slice(0, 10).map(friend => (
    //     {name: friend.name, img: friend.img}
    // ))

    // const allSuggestions = [{name: 'John Doe', img: null, id: 1}, {name:'Mary Smith',img: null, id: 2}, {name:'Freddy Roach',img: null, id: 3},{name:'Mickey Mouse',img: null, id: 4},{name:'Jimmy John',img: null, id: 5},{name:'Frankie Edgar',img: null, id: 6}].map(friend => (
    //     {name: friend.name, img: friend.img, id: friend.id}
    // ))

    const [searchName, setSearchName] = useState('')
    const [suggestions, setSuggestions] = useState(allSuggestions)

    const selectSuggestion = (id) => {
        const selectedLocation = allSuggestions.find(friend => id === friend.id);
        setSuggestions(prevState => {
            return prevState.filter(friend => friend.id !== id);
        })
    }

    const filterTerms = useCallback((name) => {
        setSearchName(name)
        const filtered = allSuggestions.filter(suggestion => suggestion.name.split(" ")[0].slice(0,name.length).toLowerCase() === name.toLowerCase() || suggestion.name.split(" ")[1].slice(0,name.length).toLowerCase() === name.toLowerCase())
        setSuggestions(filtered.length ? filtered : '')
    }, [])

    const confirmSearch = () => {

        setSearchName('')
    }

    const friendSuggestions = suggestions && suggestions.map(suggest => (
        <Suggestion key={suggest.id} name={suggest.name} img={suggest.img} clicked={() => selectSuggestion(suggest.id)} />
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
        pastLocations: state.profile.pastLocations,
        currLocation: state.profile.currLocation,
        hometown: state.profile.hometown
    }
}

export default connect(mapStateToProps)(tagFriends);