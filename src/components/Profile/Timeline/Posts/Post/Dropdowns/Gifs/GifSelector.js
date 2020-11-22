
import React, {useState, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import Search from '../../../../../../Search/Searchbar'
import Gif from './Gif'
import InlineDots from '../../../../../../UI/Spinner/InlineDots'
import Error from '../../../../../../../assets/images/network-error'
import classes from './GifSelector.css'
import {KeyGenerator} from "../../../../../../../shared/utility";
import axios from "axios";

const gifSelector = (props) => {

    const [initSuggestions, setInitSuggestions] = useState(null);
    const [initSuggestionsLoading, setInitSuggestionsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);
    const [error, setError] = useState(null);

    const selectGif = (url) => {
        props.save(url);
    }

    let keys = [];
    let initialSuggestions = [
        {url: 'https://media.giphy.com/media/VFAke5Xm1TDwjgimyW/giphy.gif'},
        {url: 'https://media.giphy.com/media/thkZDBh0wCsRXU5MCq/giphy.gif'},
        {url: 'https://media.giphy.com/media/mGPjrn9F6h8RKUIn6J/giphy.gif'},
        {url: 'https://media.giphy.com/media/1xwDsv6rT10B2/giphy.gif'},
        {url: 'https://media.giphy.com/media/kC9Kveaw468cPLxpYE/giphy.gif'},
    ]

    useEffect(() => {
        setInitSuggestionsLoading(true);
        KeyGenerator.getKey(props.authToken, (newKey) => {
            keys.push(newKey)
            KeyGenerator.getKey(props.authToken, (newKey) => {
                keys.push(newKey)
                KeyGenerator.getKey(props.authToken, (newKey) => {
                    keys.push(newKey)
                    KeyGenerator.getKey(props.authToken, (newKey) => {
                        keys.push(newKey)
                        KeyGenerator.getKey(props.authToken, (newKey) => {
                            keys.push(newKey)
                            initialSuggestions = initialSuggestions.map((suggestion, i) => ({...suggestion, id: keys[i]}))
                            setInitSuggestions(initialSuggestions);
                            setInitSuggestionsLoading(false);
                        })
                    })
                })
            })
        })
        return () => {
            setSearchResults(null);
            setInitSuggestions(false);
            setInitSuggestions(null);
        }
    }, [])

    let suggestedGifs;
    if (initSuggestions && initSuggestions.length) {
        suggestedGifs = initSuggestions.map(suggestion => (
            <Gif
                id={suggestion.id}
                key={suggestion.id}
                gif={suggestion.url}
                clicked={selectGif}
            />
        ))
    }

    if (searchResults && searchResults.length) {
        suggestedGifs = searchResults.map(result =>  (
            <Gif
                id={result.id}
                key={result.id}
                gif={result.url}
                clicked={selectGif}
            />
        ))
    }

    const filterTerms = useCallback((searchTerm) => {
        const filtered = []
        setSearchResultsLoading(true);
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=R8mK0oe2qMbo532MxQ9mfEOkH6pZsurf&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`)
            .then(response => {
                const searchResults = response.data.data
                filtered.push(...[...searchResults].map(result => ({url: result.images.original.url, id: result.id})));
                setSearchResults(filtered);
                setSearchResultsLoading(false);
            })
            .catch(err => {
                console.log(err)
                setError(err)
                setSearchResults({url: Error, id: -1})
            })
    }, [])

    return (
        <div className={classes.GifSelectorContainer}>
            <div className={classes.BaseArrow}/>
            <section className={classes.SearchSection}>
                <Search filterResults={filterTerms} className={classes.SearchBar} placeholder="Search"/>
            </section>
            <section className={classes.GifSuggestionsSection}>
                {initSuggestionsLoading || searchResultsLoading ? <InlineDots /> : suggestedGifs}
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token
    }
}

export default connect(mapStateToProps)(gifSelector);