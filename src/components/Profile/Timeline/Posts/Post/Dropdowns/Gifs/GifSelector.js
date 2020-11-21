
import React, {useState, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import Search from '../../../../../../Search/Searchbar'
import Gif from './Gif'
import classes from './GifSelector.css'
import {KeyGenerator} from "../../../../../../../shared/utility";
import axios from "axios";

const gifSelector = (props) => {

    const [initSuggestions, setInitSuggestions] = useState(null);
    const [initSuggestionsReady, setInitSuggestionsReady] = useState(false);


    let keys = [];
    let initialSuggestions = [
        {url: 'https://media.giphy.com/media/VFAke5Xm1TDwjgimyW/giphy.gif'},
        {url: 'https://media.giphy.com/media/thkZDBh0wCsRXU5MCq/giphy.gif'},
        {url: 'https://media.giphy.com/media/mGPjrn9F6h8RKUIn6J/giphy.gif'},
        {url: 'https://media.giphy.com/media/1xwDsv6rT10B2/giphy.gif'},
        {url: 'https://media.giphy.com/media/kC9Kveaw468cPLxpYE/giphy.gif'},
    ]

    useEffect(() => {
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
                            setInitSuggestionsReady(true);
                        })
                    })
                })
            })
        })
    }, [])

    useEffect(() => {
        if (initSuggestionsReady) {
            console.log(initSuggestions)
        }
    }, [initSuggestionsReady])

    let suggestedGifs;
    if (initSuggestionsReady) {
        suggestedGifs = initSuggestions.map(suggestion => (
            <Gif
                id={suggestion.id}
                key={suggestion.id}
                gif={suggestion.url}
            />
        ))
    }


    const filterTerms = useCallback((searchTerm) => {
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=R8mK0oe2qMbo532MxQ9mfEOkH6pZsurf&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`)
            .then(response => {
                console.log(response);
                // const predictions = response.data.predictions;
                // if (predictions && predictions.length) {
                //     filtered.push(...[...response.data.predictions].map(city => ({type: 'pastLocation', name: city.description})))
                // }
                // setSuggestions(filtered.length ? filtered : '')
            })
            .catch(err => {
                // const filtered = allSuggestions.filter(suggestion => suggestion.name.split(" ")[0].slice(0,name.length).toLowerCase() === name.toLowerCase() || suggestion.name.split(" ")[1].slice(0,name.length).toLowerCase() === name.toLowerCase());
                // setSuggestions(filtered.length ? filtered : '')
                console.log(err)
            })
    }, [])

    return (
        <div className={classes.GifSelectorContainer}>
            <div className={classes.BaseArrow}/>
            <section className={classes.SearchSection}>
                <Search filterResults={filterTerms} className={classes.SearchBar} placeholder="Where are you?"/>
            </section>
            <section className={classes.GifSuggestionsSection}>
                {suggestedGifs}
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