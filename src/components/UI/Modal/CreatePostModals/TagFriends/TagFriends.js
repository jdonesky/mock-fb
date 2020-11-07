
import React, {useContext, useState, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import baseClasses from '../ChooseBackground/ChooseBackground.css';
import classes from "./TagFriends.css";
import BackArrow from "../../../../../assets/images/LifeEventIcons/left-arrow";
import Cancel from "../../../../../assets/images/close"
import {PostContext} from "../../../../../context/post-context";

import Suggestion from './Suggestion/Suggestion'
import Search from "../../../../Search/Searchbar";

const tagFriends = ({friends}) => {

    const postContext = useContext(PostContext)

    // const allSuggestions = friends && friends.slice(0, 10).map(friend => (
    //     {name: friend.name, img: friend.img}
    // ))

    const allSuggestions = [{name: 'John Doe', img: null, id: 1}, {name:'Mary Smith',img: null, id: 2}, {name:'Freddy Roach',img: null, id: 3},{name:'Mickey Mouse',img: null, id: 4},{name:'Jimmy John',img: null, id: 5},{name:'Frankie Edgar',img: null, id: 6}].map(friend => (
        {name: friend.name, img: friend.img, id: friend.id}
    ))

    const [searchName, setSearchName] = useState('')
    const [suggestions, setSuggestions] = useState(allSuggestions)
    const [tagged, setTagged] = useState([])

    const selectSuggestion = (id) => {
        const selectedFriend = /*friends*/allSuggestions.find(friend => id === friend.id);
        setSuggestions(prevState => {
            return prevState.filter(friend => friend.id !== id);
        })

        setTagged(prevState => {
            return [...prevState, selectedFriend]
        })
    }

    const filterTerms = useCallback((name) => {
        setSearchName(name)
        const filtered = allSuggestions.filter(suggestion => suggestion.name.split(" ")[0].slice(0,name.length).toLowerCase() === name.toLowerCase() || suggestion.name.split(" ")[1].slice(0,name.length).toLowerCase() === name.toLowerCase())
        setSuggestions(filtered.length ? filtered : '')
    }, [])

    const confirmSearch = () => {
        setTagged(prevState => {
            return [...prevState,{name: searchName, img: null}]
        })
        setSearchName('')
    }

    const removeTag = (id) => {
        const taggedFriend = tagged.find(friend => friend.id === id);
        setTagged(prevState => {
            return prevState.filter(friend => friend.id !== id);
        });
        setSuggestions(prevState => {
            return [...prevState,taggedFriend];
        })
    }

    const friendSuggestions = suggestions && suggestions.map(suggest => (
        <Suggestion key={suggest.id} name={suggest.name} img={suggest.img} clicked={() => selectSuggestion(suggest.id)} />
    ))

    const taggedFriends = (
        <React.Fragment>
            <h5 className={classes.SuggestionsTitle} style={{display: tagged.length ? 'block' : 'none'}}>TAGGED</h5>
            <section className={classes.TaggedSection} style={{display: tagged.length ? 'flex' : 'none'}}>
                {tagged.length ? tagged.map(friend => (
                    <div className={classes.Tag} onClick={() => removeTag(friend.id)}>
                        <span>{friend.name}</span>
                        <div className={classes.RemoveTagIcon}><Cancel fill="#0B86DE" /></div>
                    </div>
                )): null}
            </section>
        </React.Fragment>
    )

    return (
        <div>
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
                {taggedFriends}
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