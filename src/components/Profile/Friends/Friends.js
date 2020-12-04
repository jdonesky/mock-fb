
import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import classes from './Friends.css';


import Searchbar from '../../Search/Searchbar';
import Friend from './Friend/Friend';
import InlineDots from '../../../components/UI/Spinner/InlineDots';

import Dots from '../../../assets/images/dots';

import K from '../../../assets/images/Raster/kaleidoscope.jpg'
import D from '../../../assets/images/Raster/d.png'

import {checkBirthday} from "../../../shared/utility";
import OutsideAlerter from "../../../hooks/outsideClickHandler";
import getWindowDimensions from "../../../hooks/getWindowDimensions";


const friends = (props) => {

    useEffect(() => {
        setSelectedFriends(exAllFriends);
    }, [])

    useEffect(() => {
        if (width >= 769) {
            if (setMoreFiltering) {
                setMoreFiltering(false);
            }
        }
    });

    const [filter, setFilter] = useState('ALL')
    const [selectedFriends, setSelectedFriends] = useState(null);
    const [editing, setEditing] = useState(false);
    const [moreFiltering, setMoreFiltering] = useState(false);
    const {width, height} = getWindowDimensions();

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
    let birthdays;
    let currentCity;
    let hometown;
    if (props.friends && props.friends.length) {
        allFriends = props.friends.map(friend => (<Friend {...friend} myFriends={props.friends}/>))
        birthdays = props.friends.filter(friend => checkBirthday(friend.birthday)).map(friend => (<Friend {...friend} myFriends={props.friends}/>))
        currentCity = props.friends.filter(friend => friend.currentLocation === props.currentLocation).map(friend => (<Friend {...friend} myFriends={props.friends}/>))
        hometown = props.friends.filter(friend => friend.hometown === props.hometown).map(friend => (<Friend {...friend} myFriends={props.friends}/>))
    }

    let following;
    if (props.following && props.following.length) {
        following = props.following.map(person => (<Friend {...person} myFriends={props.friends && props.friends.length ? props.friends : null}/>))
    }

    const sampleFriends = [
        {name: 'John Doe', userId: 1, profileImage: K, friends: [{name: 'Mary Smith',userId: 2, profileImage: D, birthday: new Date('1-23-1990')}], birthday: new Date('11-16-1993')},
        {name: 'Mary Smith',userId: 2, birthday: new Date('1-23-1990'),hometown: 'Chevy Chase'},
        {name: 'Jimmy John',userId: 3, profileImage: K, friends: [
            {name: 'Mary Smith',userId: 2, profileImage: D, birthday: new Date('1-23-1990')},
            {name: 'John Doe', userId: 1, profileImage: K, friends: [{name: 'Mary Smith',userId: 2, profileImage: D, birthday: new Date('1-23-1990')}], birthday: new Date('11-16-1993'), currentLocation: 'washington dc'}
            ]
        },
        {name: 'Franklin Moore', userId: 4, profileImage: D, friends: [{name: 'John Doe', userId: 1, profileImage: K, friends: [{name: 'Mary Smith',userId: 2, profileImage: D, birthday: new Date('1-23-1990')}], birthday: new Date('11-16-1993')}],birthday: new Date('7-10-1996'),  currentLocation: 'washington dc'}
    ]

    const exAllFriends = sampleFriends.map(friend => (<Friend{...friend} myFriends={sampleFriends}/>))
    const exBirthdays = sampleFriends.filter(friend => checkBirthday(friend.birthday)).map(friend => (<Friend {...friend} myFriends={sampleFriends}/>))
    const exCurrentCity = sampleFriends.filter(friend => friend.currentLocation === props.currentLocation).map(friend => (<Friend {...friend} myFriends={sampleFriends}/>))
    const exHometown = sampleFriends.filter(friend => friend.hometown === props.hometown.name).map(friend => (<Friend {...friend} myFriends={sampleFriends}/>))
    const exFollowing = sampleFriends.filter(friend => friend.following).map(friend => (<Friend {...friend} myFriends={sampleFriends}/>))

    const toggleFilter = (filter) => {
        setFilter(filter);
        switch (filter) {
            case 'ALL':
                // setSelectedFriends(allFriends);
                setSelectedFriends(exAllFriends);
                break;
            case 'BIRTHDAYS':
                // setSelectedFriends(birthdays);
                setSelectedFriends(exBirthdays);
                break;
            case 'CURRENT_CITY':
                // setSelectedFriends(currentCity);
                setSelectedFriends(exCurrentCity);
                if (moreFiltering) {
                    setMoreFiltering(false);
                }
                break;
            case 'HOMETOWN':
                // setSelectedFriends(hometown);
                setSelectedFriends(exHometown);
                if (moreFiltering) {
                    setMoreFiltering(false);
                }
                break;
            case 'FOLLOWING':
                // setSelectedFriends(following);
                setSelectedFriends(exFollowing);
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

    const searchFriends = useCallback((searchedName, selectedFriends) => {
        const filteredFriends = [...selectedFriends]
            .filter(friend => {
            const [firstName, lastName] = friend.props.name.split(' ')
            return firstName.slice(0,searchedName.length).toLowerCase() === searchedName.toLowerCase() || lastName.slice(0,searchedName.length).toLowerCase() === searchedName.toLowerCase()
        })
        setSelectedFriends(filteredFriends);
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

    return (
        <div className={classes.FriendsContainer}>
            <section className={classes.HeaderSection}>
                <div className={classes.Title}>
                    <span>F</span>
                    <span>r</span>
                    <span>i</span>
                    <span>e</span>
                    <span>n</span>
                    <span>d</span>
                    <span>s</span>
                </div>
                <div className={classes.HeaderControlsContainer}>
                    <Searchbar currentlySelected={selectedFriends} filterResults={searchFriends} className={classes.SearchBar} iconClass={classes.SearchGlass} placeholder='Search'/>
                    <div className={classes.TextButton}>
                        Friend Requests
                    </div>
                    <div className={classes.TextButton}>
                        Find Friends
                    </div>
                    <div className={classes.MoreOptionsButton} onClick={openEditDropdown}>
                        <Dots />
                    </div>
                    <div className={classes.EditDropdownPositioner}>
                        {editingDropdown}
                    </div>
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
                {selectedFriends || <InlineDots />}
            </section>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        friends: state.profile.friends || [],
        following: state.profile.following || [],
        currentLocation: state.profile.currentLocation || '',
        hometown: state.profile.hometown || {name: ''},
    }
}


export default connect(mapStateToProps)(friends);