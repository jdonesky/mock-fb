
import React, {useEffect, useCallback} from 'react';
import {connect} from 'react-redux'
import classes from './SearchDropdown.css'
import * as actions from '../../../../../store/actions/index';
import Searchbar from "../../../../Search/Searchbar";
import BackArrow from '../../../../../assets/images/TopNavButtonIcons/backArrow';
import InlineDots from '../../../../UI/Spinner/InlineDots';

const searchDropdown = (props) => {

    const {authToken, onFetchPersonalActivity, personalActivity, onSearchAll, searchingAll, results, searchHistory, close, onCreateActivityRecord, activityLogKey} = props;

    useEffect(() => {
        console.log('search result', results)
        console.log('previous searches', personalActivity)
    })

    useEffect(() => {
       onFetchPersonalActivity(authToken, activityLogKey, 'GENERAL_SEARCH')
    }, [])

    let recentSearches;
    if (searchHistory && searchHistory.length) {
        recentSearches = searchHistory.sort()
    } else {
        recentSearches = <div className={classes.Placeholder}>No recent searches</div>
    }
    const filterResults = useCallback(phrase => {
        onSearchAll(authToken, phrase)
        const newActivity = {
            type: "GENERAL_SEARCH",
            date: new Date(),
            sortDate: new Date().getTime(),
            text: phrase,
        }
        onCreateActivityRecord(authToken, activityLogKey, newActivity, 'PERSONAL')
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
        searchingAll: state.search.searchingAll,
        activityLogKey: state.profile.activityLogKey,
        personalActivity: state.activity.personalActivity
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchAll: (authToken, phrase) => dispatch(actions.searchAllAttempt(authToken, phrase)),
        onCreateActivityRecord: (authToken, logKey, activity, type) => dispatch(actions.createActivityAttempt(authToken, logKey, activity, type)),
        onFetchPersonalActivity: (authToken, logKey, type) => dispatch(actions.fetchPersonalActivityAttempt(authToken, logKey, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(searchDropdown);