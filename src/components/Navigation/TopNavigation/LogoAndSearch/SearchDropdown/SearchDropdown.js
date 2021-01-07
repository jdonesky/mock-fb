
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

    const {authToken, onFetchPersonalActivity, personalActivity, onSearchAll, searchingAll, results, close, onCreateActivityRecord, activityLogKey} = props;

    const [searches, setSearches] = useState(null);

    useEffect(() => {
        console.log('search result', results)
        console.log('previous searches', personalActivity)
    })

    useEffect(() => {
       onFetchPersonalActivity(authToken, activityLogKey, 'GENERAL_SEARCH')
    }, [])

    useEffect(() => {

    }, [])


    const filterResults = useCallback(phrase => {
        onSearchAll(authToken, phrase)
        const newActivity = {
            type: "GENERAL_SEARCH",
            date: new Date(),
            sortDate: new Date().getTime(),
            text: phrase,
        }
        setSearches(prevState => {
            if (prevState !== null) {
                return [...prevState, newActivity]
            } else {
                return [newActivity]
            }
        })
        onCreateActivityRecord(authToken, activityLogKey, newActivity, 'PERSONAL')
    }, [])

    let recentSearches;
    if (!searches) {
        if (personalActivity && personalActivity.length) {
            console.log('IN personalActivity.length block')
            recentSearches = personalActivity.sort((a,b) => a.sortDate > b.sortDate ? a : b);
        } else {
            recentSearches = <div className={classes.Placeholder}>No recent searches</div>
        }
    } else if (searches && searches.length) {
        if (personalActivity && personalActivity.length) {
            recentSearches = [...searches, ...personalActivity].sort((a,b) => a.sortDate > b.sortDate ? a : b)
        } else if (!personalActivity) {
            recentSearches = searches
        }
    }

    if (recentSearches && recentSearches.length) {
        recentSearches = recentSearches.map(search => {
            let icon;
            if (search.subject === 'USER') {
                icon = <Avatar fill="white" />
            } else if (search.subject === 'PAGE') {
                icon = <Flag fill="white" />
            } else {
                icon = <Question fill="white" />
            }

            return (
                <div className={classes.SearchRecord}>
                    <div className={classes.SearchRecordLeftBlock}>
                        <div className={classes.ProfileImage} style={{backgroundImage: search.image ? `url(${search.image})` : null }}>
                            {search.image ? null : icon}
                        </div>
                        <div className={classes.SearchRecordText}>search.text</div>
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
                {searchingAll ? <InlineDots /> : recentSearches}
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
        onFetchPersonalActivity: (authToken, logKey, type) => dispatch(actions.fetchPersonalActivityAttempt(authToken, logKey, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(searchDropdown);