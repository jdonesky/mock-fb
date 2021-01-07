
import React, {useEffect, useCallback} from 'react';
import {connect} from 'react-redux'
import classes from './SearchDropdown.css'
import * as actions from '../../../../../store/actions/index';
import Searchbar from "../../../../Search/Searchbar";
import BackArrow from '../../../../../assets/images/TopNavButtonIcons/backArrow';
import InlineDots from '../../../../UI/Spinner/InlineDots';

const searchDropdown = (props) => {

    const {authToken, onSearchAll, searchingAll, results, searchHistory, close} = props;

    useEffect(() => {
        console.log(results)
    })

    let recentSearches;
    if (searchHistory && searchHistory.length) {
        recentSearches = searchHistory.sort()
    } else {
        recentSearches = <div className={classes.Placeholder}>No recent searches</div>
    }

    const filterResults = useCallback(phrase => {
        onSearchAll(authToken, phrase)
    }, [])

    return (
        <div className={classes.DropdownContainer}>
            <section className={classes.HeaderSection}>
                <div className={classes.BackButton} onClick={close}>
                    <BackArrow fill="rgba(0,0,0,0.7)" />
                </div>
                <Searchbar filterResults={filterResults} className={classes.SearchBar} iconClass={classes.SearchGlass} placeholder="Search dumb facebook" focusOnMount/>
            </section>
            <section className={classes.RecentSearchSection}>
                {searchingAll ? <InlineDots /> : recentSearches}
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        results: state.search.results,
        searchHistory: state.activity.searchHistory,
        searchingAll: state.search.searchingAll
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchAll: (authToken, phrase) => dispatch(actions.searchAllAttempt(authToken, phrase))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(searchDropdown);