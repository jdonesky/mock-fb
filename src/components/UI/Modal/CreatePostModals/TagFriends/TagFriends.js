
import React, {useContext, useState} from 'react';
import {connect} from 'react-redux';
import baseClasses from '../ChooseBackground/ChooseBackground.css';
import classes from "./TagFriends.css";
import BackArrow from "../../../../../assets/images/LifeEventIcons/left-arrow";
import {PostContext} from "../../../../../context/post-context";

import SearchBar from '../../../../Search/Searchbar';
import Suggestion from './Suggestion/Suggestion'

const tagFriends = ({friends}) => {
    const postContext = useContext(PostContext)
    const allSuggestions = friends && friends.map(friend => (
        {name: friend.name, img: friend.img}
    ))

    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState(allSuggestions)

    const friendSuggestions = suggestions && suggestions.map(suggest => (
        <Suggestion />
    ))

    return (
        <div className={classes.PageContent}>
            <section className={baseClasses.Header}>
                <div className={baseClasses.CancelIcon} onClick={() => postContext.toggleModalContent('CREATE_POST')}>
                    <BackArrow />
                </div>
                <div className={baseClasses.Title}>
                    <h3>Tag Friends</h3>
                </div>
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