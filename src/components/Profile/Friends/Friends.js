
import React, {useState, useEffect, useCallback} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './Friends.css';
import * as actions from '../../../store/actions/index';

import Searchbar from '../../Search/Searchbar';
import Friend from './Friend/Friend';
import InlineDots from '../../../components/UI/Spinner/InlineDots';
import Dots from '../../../assets/images/dots';

import {checkBirthday} from "../../../shared/utility";
import OutsideAlerter from "../../../hooks/outsideClickHandler";
import getWindowDimensions from "../../../hooks/getWindowDimensions";


const friends = (props) => {

    const [pathRoot, setPathRoot] = useState(props.history.location.pathname.split('/')[1])
    const [displayProfile, setDisplayProfile] = useState(props.match.params.id);
    const [filter, setFilter] = useState('ALL')
    const [myCurrentLocation, setMyCurrentLocation] = useState(null);
    const [myHometown, setMyHometown] = useState(null);
    const [loadedFriends, setLoadedFriends] = useState(null);
    const [loadedProfiles, setLoadedProfiles] = useState(null);
    const [selectedFriends, setSelectedFriends] = useState(null);
    const [editing, setEditing] = useState(false);
    const [moreFiltering, setMoreFiltering] = useState(false);
    const {width, height} = getWindowDimensions();

    const {myPublicProfile, otherPublicProfile, manyProfiles} = props

    useEffect(() => {
        if (pathRoot !== props.history.location.pathname.split('/')[1] || displayProfile !== props.match.params.id) {
            setPathRoot(props.history.location.pathname.split('/')[1]);
            setDisplayProfile(displayProfile !== props.match.params.id);
        }
    })

    useEffect(() => {
        if (pathRoot === 'user-profile') {
            if (displayProfile === 'me') {
                if (myPublicProfile) {
                    setLoadedFriends(myPublicProfile.friends);
                    if (myPublicProfile.currLocation) {
                        setMyCurrentLocation(myPublicProfile.currLocation.name);
                    }
                    if (myPublicProfile.hometown)
                        setMyHometown(myPublicProfile.hometown.name);
                }
            } else if (displayProfile !== 'me') {
                if (otherPublicProfile) {
                    setLoadedFriends(otherPublicProfile.friends);
                    if (otherPublicProfile.currLocation) {
                        setMyCurrentLocation(otherPublicProfile.currLocation.name);
                    }
                    if (otherPublicProfile.hometown) {
                        setMyHometown(otherPublicProfile.hometown.name);
                    }
                }
            }
        } else if (pathRoot === 'friend') {
            if (otherPublicProfile) {
                setLoadedFriends(otherPublicProfile.friends);
                if (otherPublicProfile.currLocation) {
                    setMyCurrentLocation(otherPublicProfile.currLocation.name);
                }
                if (otherPublicProfile.hometown) {
                    setMyHometown(otherPublicProfile.hometown.name);
                }
            }
        }

    }, [myPublicProfile, otherPublicProfile])

    useEffect(() => {
        if (loadedFriends) {
            const keys = loadedFriends.map(friend => friend.publicProfileKey);
            props.onFetchManyProfiles(props.authToken, keys)
        }
    }, [loadedFriends])

    useEffect(() => {
        if (manyProfiles) {
            setLoadedProfiles(manyProfiles)
        }
    }, [manyProfiles])

    useEffect(() => {
        if (loadedProfiles && loadedProfiles.length)  {
            setSelectedFriends(loadedProfiles.map((profile,i)=> {
                let style;
                if (loadedProfiles.length === 1) {
                    style = {width: "98%"}
                } else if (loadedProfiles.length % 2 !== 0 && i === loadedProfiles.length - 1) {
                    style = {width: "98%"}
                }
                return (
                    <Friend
                        key={profile.userKey}
                        myFriends={loadedProfiles}
                        this={profile}
                        navTo={goToFullProfile}
                        pathRoot={pathRoot}
                        displayProfile={displayProfile}
                        style={style && style}
                    />
                )}
            ))
        }
    }, [loadedProfiles])

    useEffect(() => {
        return () => {
            setLoadedFriends(null);
            setLoadedProfiles(null);
            setSelectedFriends(null);
            props.onClearManyProfiles();
        }
    },[])

    useEffect(() => {
        if (width >= 769) {
            if (setMoreFiltering) {
                setMoreFiltering(false);
            }
        }
    });

    const allButtonClasses = [classes.FilterButton];
    const birthdaysButtonClasses = [classes.FilterButton];
    const currentCityButtonClasses = [classes.FilterButton];
    const hometownButtonClasses = [classes.FilterButton];
    const followingButtonClasses = [classes.FilterButton];
    const moreFilterButtonClasses = [classes.FilterButton];

    const openMoreFiltersDropdown = () => {
        setMoreFiltering(true);
    }
    
    const closeMoreFiltersDropdown = () => {
        setMoreFiltering(false);
    }

    const goToFullProfile = (userKey) => {
        props.history.push(`/user-profile/${userKey}`)
    }

    let currentCityDropdownButtonClasses = [classes.MoreFilterButton]
    let hometownDropdownButtonClasses = [classes.MoreFilterButton]
    let followingDropdownButtonClasses = [classes.MoreFilterButton]
    if (filter === 'CURRENT_CITY') {
        currentCityDropdownButtonClasses.push(classes.ActiveMoreFilterButton)
    }
    if (filter === 'HOMETOWN') {
        hometownDropdownButtonClasses.push(classes.ActiveMoreFilterButton)
    }
    if (filter === 'FOLLOWING') {
        followingDropdownButtonClasses.push(classes.ActiveMoreFilterButton)
    }

    const moreFiltersDropdown = (
        <div style={{display: moreFiltering ? 'block' : 'none'}}>
            <OutsideAlerter action={closeMoreFiltersDropdown}>
                <div className={classes.MoreFiltersDropdownPositioner}>
                    <div className={classes.MoreFilterBlocker} onClick={closeMoreFiltersDropdown}/>
                    <div className={classes.MoreFiltersDropdown}>
                        {width <= 573 ? <div className={currentCityDropdownButtonClasses.join(" ")} onClick={() => toggleFilter('CURRENT_CITY')}><span>Current City</span></div> : null}
                        {width <= 769 ? <div className={hometownDropdownButtonClasses.join(" ")} onClick={() => toggleFilter('HOMETOWN')}><span>Hometown</span></div> : null}
                        {width <= 769 ? <div className={followingDropdownButtonClasses.join(" ")} onClick={() => toggleFilter('FOLLOWING')}><span>Following</span></div> : null}
                    </div>
                </div>
            </OutsideAlerter>
        </div>
    )


    let allFriends;
    let birthdayMatches
    let currentCityMatches;
    let hometownMatches;
    if (loadedProfiles && loadedProfiles.length) {
        allFriends = loadedProfiles.map(friend => (<Friend key={friend.userKey && friend.userKey} myFriends={loadedProfiles} this={friend} navTo={goToFullProfile}/>))
        birthdayMatches = loadedProfiles.filter(friend => checkBirthday(friend.birthday)).map(friend => (<Friend key={friend.userKey} myFriends={loadedProfiles} this={friend} navTo={goToFullProfile}/>))
        currentCityMatches = loadedProfiles.filter(friend => friend.currentLocation === myCurrentLocation).map(friend => (<Friend key={friend.userKey} myFriends={loadedProfiles} this={friend} navTo={goToFullProfile}/>))
        hometownMatches = loadedProfiles.filter(friend => friend.hometown === myHometown).map(friend => (<Friend key={friend.userKey} myFriends={loadedProfiles} this={friend} navTo={goToFullProfile}/>))
    }


    const toggleFilter = (filter) => {
        setFilter(filter);
        switch (filter) {
            case 'ALL':
                setSelectedFriends(allFriends);
                break;
            case 'BIRTHDAYS':
                setSelectedFriends(birthdayMatches);
                break;
            case 'CURRENT_CITY':
                setSelectedFriends(currentCityMatches);
                if (moreFiltering) {
                    setMoreFiltering(false);
                }
                break;
            case 'HOMETOWN':
                setSelectedFriends(hometownMatches);
                if (moreFiltering) {
                    setMoreFiltering(false);
                }
                break;
            case 'FOLLOWING':
                // setSelectedFriends(following);
                if (moreFiltering) {
                    setMoreFiltering(false);
                }
                 break;
            default:
                setSelectedFriends(allFriends);
        }
    }

    switch (filter) {
        case 'ALL':
            allButtonClasses.push(classes.ActiveFilter);
            break;
        case 'BIRTHDAYS':
            birthdaysButtonClasses.push(classes.ActiveFilter);
            break;
        case 'CURRENT_CITY':
            if (width > 573) {
                currentCityButtonClasses.push(classes.ActiveFilter);
            } else {
                moreFilterButtonClasses.push(classes.ActiveFilter);
            }
            break;
        case 'HOMETOWN':
            if (width > 769) {
                hometownButtonClasses.push(classes.ActiveFilter);
            } else {
                moreFilterButtonClasses.push(classes.ActiveFilter);
            }
            break;
        case 'FOLLOWING':
            if (width > 769) {
                followingButtonClasses.push(classes.ActiveFilter);
            } else {
                moreFilterButtonClasses.push(classes.ActiveFilter);
            }
            break;
        default:
            allButtonClasses.push(classes.ActiveFilter);
    }

    const searchFriends = useCallback((searchedName, filter, baseResults) => {
        const selected = baseResults[filter]
        let filteredFriends;
        console.log('selected', selected)
        if (selected && selected.length) {
            filteredFriends = [...selected]
                .filter(friend => {
                    return friend.props.this.firstName.slice(0,searchedName.length).toLowerCase() === searchedName.toLowerCase() || friend.props.this.lastName.slice(0,searchedName.length).toLowerCase() === searchedName.toLowerCase()
                })
            setSelectedFriends(filteredFriends);
        } else {
            setSelectedFriends(null)
        }

    }, [])

    const openEditDropdown = () => {
        setEditing(true);
    }

    const closeEditDropdown = () => {
        setEditing(false);
    }

    let editingDropdown;
    if (editing) {
        editingDropdown = (
            <OutsideAlerter action={closeEditDropdown}>
                <div className={classes.MoreButtonBlocker} onClick={closeEditDropdown}/>
                <div className={classes.EditDropdown}>
                    <div className={classes.BaseArrow}/>
                    <div className={classes.DropdownButton}><span>Edit Privacy</span></div>
                </div>
            </OutsideAlerter>
        )
    }

    let personalControls;
    if (displayProfile === 'me') {
       personalControls = (
           <React.Fragment>
               <div className={classes.TextButton} onClick={() => props.history.push('/friends')}>
                   Friend Requests
               </div>
               <div className={classes.TextButton} onClick={() => props.history.push('/friends')}>
                   Find Friends
               </div>
               <div className={classes.MoreOptionsButton} onClick={openEditDropdown}>
                   <Dots />
               </div>
               <div className={classes.EditDropdownPositioner}>
                   {editingDropdown}
               </div>
           </React.Fragment>
       )
    }


    let selected;
    if (props.fetchingOtherProfile || props.fetchingOtherPublicProfile || props.fetchingManyProfiles) {
        selected = <InlineDots />
    }
    if (selectedFriends) {
        if (selectedFriends.length !== 0) {
            selected = selectedFriends
        }
    }

    let loadingIndicator;
    if (props.fetchingManyProfiles) {
        loadingIndicator = <InlineDots />
    }

    return (
        <div className={classes.FriendsContainer}>
            <section className={[classes.HeaderSection, displayProfile === 'me' ? null : classes.OtherUserHeader].join(" ")}>
                <div className={[classes.Title, displayProfile === 'me' ? null : classes.OtherUserTitle].join(" ")}>
                    <span>F</span>
                    <span>r</span>
                    <span>i</span>
                    <span>e</span>
                    <span>n</span>
                    <span>d</span>
                    <span>s</span>
                </div>
                <div className={classes.HeaderControlsContainer}>
                    <Searchbar currentlySelected={filter} filterResults={searchFriends} className={classes.SearchBar} iconClass={classes.SearchGlass} placeholder='Search' baseResults={{
                        'ALL': allFriends,
                        'BIRTHDAYS': birthdayMatches,
                        'CURRENT_CITY': currentCityMatches,
                        'HOMETOWN': hometownMatches,
                    }} style={{marginLeft: displayProfile === 'me' ? null : "auto"}} />
                    {personalControls}
                </div>
            </section>
            <section className={classes.FilterButtonsContainer}>
                <div className={allButtonClasses.join(" ")} onClick={() => toggleFilter('ALL')}>
                    All Friends
                </div>
                <div className={birthdaysButtonClasses.join(" ")} onClick={() => toggleFilter('BIRTHDAYS')}>
                    Birthdays
                </div>
                <div className={currentCityButtonClasses.join(" ")} onClick={() => toggleFilter('CURRENT_CITY')} style={{display: width <= 573 ? 'none' : 'flex'}}>
                    Current City
                </div>
                <div className={hometownButtonClasses.join(" ")} onClick={() => toggleFilter('HOMETOWN')} style={{display: width <= 769 ? 'none' : 'flex'}}>
                    Hometown
                </div>
                <div className={followingButtonClasses.join(" ")} onClick={() => toggleFilter('FOLLOWING')} style={{display: width <= 769 ? 'none' : 'flex'}}>
                    Following
                </div>
                <div className={moreFilterButtonClasses.join(" ")} onClick={openMoreFiltersDropdown} style={{display: width <= 769 ? 'flex' : 'none'}}>
                    More
                </div>
                {moreFiltersDropdown}
            </section>
            <section className={classes.FriendsSection}>
                {loadingIndicator}
                {selected}
            </section>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        myPublicProfile: state.profile.publicProfile,
        otherProfile: state.users.otherUserProfile,
        otherPublicProfile: state.users.singleProfile,
        manyProfiles: state.users.manyProfiles,
        fetchingOtherProfile: state.users.loadingFullProfile,
        fetchingOtherPublicProfile: state.users.loadingSingleProfile,
        fetchingManyProfiles: state.users.fetchingManyProfiles,
        following: state.profile.following || [],
        currentLocation: state.profile.currentLocation || '',
        hometown: state.profile.hometown || {name: ''},
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchManyProfiles: (authToken, keys) => dispatch(actions.fetchManyPublicProfilesAttempt(authToken, keys)),
        onClearManyProfiles: () => dispatch(actions.clearManyProfiles())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(friends));