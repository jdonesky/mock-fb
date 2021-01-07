
import React, {useContext, useState, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import baseClasses from '../ChooseBackground/ChooseBackground.css';
import classes from "./TagFriends.css";
import BackArrow from "../../../../../assets/images/LifeEventIcons/left-arrow";
import Cancel from "../../../../../assets/images/close"
import {PostContext} from "../../../../../context/post-context";
import {KeyGenerator} from "../../../../../shared/utility";

import Suggestion from './Suggestion/Suggestion'
import Search from "../../../../Search/Searchbar";

const tagFriends = (props) => {

    const postContext = useContext(PostContext)
    const [allSuggestions, setAllSuggestions] = useState(null);
    const {authToken, myPublicProfile} = props

    useEffect(() => {
        console.log('fetching public profile');
        if (myPublicProfile && myPublicProfile.friends) {
            setSuggestions(myPublicProfile.friends)
        }
    }, [myPublicProfile])


    const [searchName, setSearchName] = useState('')
    const [suggestions, setSuggestions] = useState(allSuggestions)

    const selectSuggestion = (key) => {
        const selectedFriend = suggestions.find(friend => key === friend.userKey);
        setSuggestions(prevState => {
            return prevState.filter(friend => friend.userKey !== key);
        })

        postContext.passData('tag', selectedFriend)
    }

    const filterTerms = useCallback((name) => {
        setSearchName(name)
        const filtered = allSuggestions.filter(suggestion => suggestion.firstName.slice(0,name.length).toLowerCase() === name.toLowerCase() || suggestion.lastName.slice(0,name.length).toLowerCase() === name.toLowerCase())
        setSuggestions(filtered.length ? filtered : '')
    }, [])

    const removeTag = (key) => {
        const taggedFriend = postContext.tagged.find(friend => friend.userKey === key);
        postContext.passData('remove-tag', key)
        setSuggestions(prevState => {
            return [...prevState,taggedFriend];
        })
    }

    // const confirmSearch = () => {
    //     KeyGenerator.getKey(authToken, (newKey) => {
    //         postContext.passData('tag', {name: searchName, img: null, id: newKey})
    //     })
    // }

    const friendSuggestions = suggestions && suggestions.map(suggest => (
        <Suggestion key={suggest.id} name={suggest.name} img={suggest.profileImage} clicked={() => selectSuggestion(suggest.userKey)} />
    ))

    const taggedFriends = (
        <React.Fragment>
            <h5 className={classes.SuggestionsTitle} style={{display: postContext.tagged.length ? 'block' : 'none'}}>TAGGED</h5>
            <section className={classes.TaggedSection} style={{display: postContext.tagged.length ? 'flex' : 'none'}}>
                {postContext.tagged.length ? postContext.tagged.map(friend => (
                    <div key={friend.id} className={classes.Tag} onClick={() => removeTag(friend.id)}>
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
                <Search filterResults={filterTerms} className={classes.SearchBar} placeholder="Search for friends"/>
                <div className={classes.ConfirmButton} style={{color: searchName ?  "#155fe8" : "#c4c4c4"}}><span>Done</span></div>
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
        authToken: state.auth.token,
        myPublicProfile: state.profile.publicProfile
    }
}

export default connect(mapStateToProps)(tagFriends);