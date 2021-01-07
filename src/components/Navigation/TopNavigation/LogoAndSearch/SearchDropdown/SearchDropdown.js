
import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux'
import classes from './SearchDropdown.css'
import * as actions from '../../../../../store/actions/index';
import Searchbar from "../../../../Search/Searchbar";
import InlineDots from '../../../../UI/Spinner/InlineDots';

import BackArrow from '../../../../../assets/images/TopNavButtonIcons/backArrow';
import Flag from '../../../../../assets/images/TopNavButtonIcons/flag';
import Avatar from '../../../../../assets/images/BookmarkIcons/user';
import Question from '../../../../../assets/images/MiscIcons/question';
import Delete from '../../../../../assets/images/MessengerIcons/close';


const searchDropdown = (props) => {

    const {authToken, onFetchPersonalActivity, personalActivity, onSearchAll, searchingAll, results, close, onCreateActivityRecord, activityLogKey, onDeleteActivity, onClearSearchResults, onClearLocalActivity} = props;
    const [searches, setSearches] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        console.log(searches);
    })

    useEffect(() => {
       onFetchPersonalActivity(authToken, activityLogKey, 'GENERAL_SEARCH')
       return () => {
           setSearches(null);
           setSearchResults(null);
           onClearLocalActivity('personalActivity')
           onClearSearchResults();
       }
    }, [])

    useEffect(() => {
        if (results) {
            setSearchResults(results)
        }
    }, [results])


    useEffect(() => {
        console.log(personalActivity);
        if (personalActivity) {
            setSearches(personalActivity)
        }
    }, [personalActivity])

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

    const selectSearchResult = () => {

    }

    const deleteSearchRecord = (key) => {
        setSearches(prevState => {
            return {...prevState, [key]: undefined}
        })
        onDeleteActivity(authToken, activityLogKey, 'personal', key)
    }

    let recentSearches;
    if (searches) {
        recentSearches = Object.keys(searches).map(key => ({...searches[key], key: key})).sort((a,b) => b.sortDate - a.sortDate).map(search => {
            let icon;
            if (search.subject === 'USER') {
                icon = <Avatar fill="white" />
            } else if (search.subject === 'PAGE') {
                icon = <Flag fill="white" />
            } else {
                icon = <Question fill="white" />
            }
            if (searches[search.key]) {
                return (
                    <div className={classes.SearchRecord} key={search.key} >
                        <div className={classes.SearchRecordLeftBlock}>
                            <div className={classes.ProfileImage} style={{backgroundImage: search.image ? `url(${search.image})` : null }}>
                                {search.image ? null : icon}
                            </div>
                            <div className={classes.SearchRecordText} onClick={() => filterResults(search.text)}>{search.text}</div>
                        </div>
                        <div className={classes.DeleteButtonContainer} onClick={() => deleteSearchRecord(search.key)}>
                            <div className={classes.DeleteButton}>
                                <Delete fill="rgba(0,0,0,0.5)"/>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    } else {
        recentSearches = <div className={classes.Placeholder}>No recent searches</div>
    }

    let showResults;
    if (searchResults) {
        showResults = searchResults.map(result => {
            let icon;
            if (result.matched === 'user') {
                icon = <Avatar fill="white" />
            } else if (result.matched === 'page') {
                icon = <Flag fill="white" />
            }

            return (
                <div className={classes.SearchRecord} key={result.matched === 'user' ? result.userKey : result.dbKey}>
                    <div className={classes.SearchRecordLeftBlock}>
                        <div className={classes.ProfileImage} style={{backgroundImage: result.profileImage ? `url(${result.profileImage})` : null }}>
                            {result.profileImage ? null : icon}
                        </div>
                        <div className={classes.SearchRecordText}>{result.matched === 'user' ? `${result.firstName} ${result.lastName}` : result.name}</div>
                    </div>
                    <div className={classes.DeleteButtonContainer}>
                        <div className={classes.DeleteButton}>
                            <Delete fill="rgba(0,0,0,0.5)"/>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className={classes.DropdownContainer}>
            <section className={classes.HeaderSection}>
                <div className={classes.BackButton} onClick={close}>
                    <BackArrow fill="rgba(0,0,0,0.7)" />
                </div>
                <Searchbar filterResults={filterResults} className={classes.SearchBar} iconClass={classes.SearchGlass} placeholder="Search dumb facebook" focusOnMount/>
            </section>
            <section className={classes.RecentSearchSection}>
                {showResults ? showResults : searchingAll ? <InlineDots /> : recentSearches}
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        results: state.search.results,
        searchingAll: state.search.searchingAll,
        activityLogKey: state.profile.activityLogKey,
        personalActivity: state.activity.personalActivity
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchAll: (authToken, phrase) => dispatch(actions.searchAllAttempt(authToken, phrase)),
        onCreateActivityRecord: (authToken, logKey, activity, type) => dispatch(actions.createActivityAttempt(authToken, logKey, activity, type)),
        onFetchPersonalActivity: (authToken, logKey, type) => dispatch(actions.fetchPersonalActivityAttempt(authToken, logKey, type)),
        onDeleteActivity: (authToken, logKey, loc, key) => dispatch(actions.deleteActivityAttempt(authToken, logKey, loc, key)),
        onClearSearchResults: () => dispatch(actions.clearSearchResults()),
        onClearLocalActivity: (loc) => dispatch(actions.clearLocalActivity(loc))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(searchDropdown);