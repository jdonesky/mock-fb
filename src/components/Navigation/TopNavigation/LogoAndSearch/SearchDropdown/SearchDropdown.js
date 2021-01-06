
import React, {useState} from 'react';
import {connect} from 'react-redux'
import Searchbar from "../../../../Search/Searchbar";
import classes from './SearchDropdown.css'
import BackArrow from '../../../../../assets/images/TopNavButtonIcons/backArrow';

const searchDropdown = ({searchHistory, close}) => {

    let recentSearches;
    if (searchHistory && searchHistory.length) {
        recentSearches = searchHistory.sort()
    } else {
        recentSearches = <div className={classes.Placeholder}>No recent searches</div>
    }

    return (
        <div className={classes.DropdownContainer}>
            <section className={classes.HeaderSection}>
                <div className={classes.BackButton} onClick={close}>
                    <BackArrow fill="rgba(0,0,0,0.7)" />
                </div>
                <Searchbar className={classes.SearchBar} iconClass={classes.SearchGlass} placeholder="Search dumb facebook" focusOnMount/>
            </section>
            <section className={classes.RecentSearchSection}>
                {recentSearches}
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        searchHistory: state.activity.searchHistory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGeneralSearch: (authToken, term) => dispatch()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(searchDropdown);