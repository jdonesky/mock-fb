
import React, {useContext, useState, useCallback} from 'react';
import {connect} from 'react-redux';
import baseClasses from '../ChooseBackground/ChooseBackground.css';
import classes from "./TagFriends.css";
import BackArrow from "../../../../../assets/images/LifeEventIcons/left-arrow";
import {PostContext} from "../../../../../context/post-context";

import SearchBar from '../../../../Search/Searchbar';
import Suggestion from './Suggestion/Suggestion'
import Search from "../../../../Search/Searchbar";

const tagFriends = ({friends}) => {

    const postContext = useContext(PostContext)
    // const allSuggestions = friends && friends.map(friend => (
    //     {name: friend.name, img: friend.img}
    // ))

    const allSuggestions = [{name: 'John Doe', img: null, id: 1}, {name:'Mary Smith',img: null, id: 2}].map(friend => (
        {name: friend.name, img: friend.img}
    ))

    const [searchName, setSearchName] = useState('')
    const [suggestions, setSuggestions] = useState(allSuggestions)
    const [tagged, setTagged] = useState([])

    const friendSuggestions = suggestions && suggestions.map(suggest => (
        <Suggestion id={suggest.id} name={suggest.name} img={suggest.img} />
    ))

    const filterTerms = useCallback((name) => {
        setSearchName(name)
        const filtered = allSuggestions.filter(suggestion => suggestion.name.slice(0,name.length).toLowerCase() === name.toLowerCase())
        setSuggestions(filtered.length ? filtered : '')
    }, [])

    const confirmSearch = () => {
        setTagged(prevState => {
            return [...prevState,{name: searchName, img: null}]
        })
        setSearchName('')
    }

    const selectSuggestion = () => {

    }

    return (
        <div className={classes.PageContent}>
            <section className={[baseClasses.Header, classes.Header].join(" ")}>
                <div className={baseClasses.CancelIcon} onClick={() => postContext.toggleModalContent('CREATE_POST')}>
                    <BackArrow />
                </div>
                <div className={baseClasses.Title}>
                    <h3>Tag Friends</h3>
                </div>
            </section>
            <section className={classes.SearchSection}>
                <Search filterResults={filterTerms} className={classes.SearchBar}/>
                <div className={classes.ConfirmButton} onClick={confirmSearch}><span>Done</span></div>
            </section>
            <section className={classes.SuggestionsSection}>
                <h5 className={classes.SuggestionsTitle}>SUGGESTIONS</h5>
                {friendSuggestions}
            </section>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        friends: state.profile.friends
    }
}

export default connect(mapStateToProps)(tagFriends);