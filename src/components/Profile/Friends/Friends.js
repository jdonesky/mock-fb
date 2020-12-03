
import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import classes from './Friends.css';
import Searchbar from '../../Search/Searchbar';
import Friend from './Friend/Friend';
import getWindowDimensions from "../../../hooks/getWindowDimensions";
import Dots from '../../../assets/images/dots';
import InlineDots from '../../../components/UI/Spinner/InlineDots';

import K from '../../../assets/images/Raster/kaleidoscope.jpg'
import D from '../../../assets/images/Raster/d.png'

import {checkBirthday} from "../../../shared/utility";
import OutsideAlerter from "../../../hooks/outsideClickHandler";


const friends = (props) => {

    useEffect(() => {
        console.log(width);
        console.log(moreFilterButton)
        console.log(moreFilters)
    })
    useEffect(() => {
        setSelectedFriends(exAllFriends);
    }, [])

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

    let moreFiltersDropdown;
    let moreFilters;
    if (moreFiltering) {
        // if (props.following && props.following.length && width < 769 ) {
        if (width < 769) {
            moreFilters = [{text: 'Hometown', filter: 'HOMETOWN'}, {text: 'following', filter: 'FOLLOWING'}].map(filter => (<div className={classes.MoreFilterButton} onClick={() => toggleFilter(filter.filter)}><span>{filter.text}</span></div>) )
        }
        if (width < 573) {
            moreFilters = [{text: 'Current City', filter: 'CURRENT_CITY'},{text: 'Hometown', filter: 'HOMETOWN'}, {text: 'following', filter: 'FOLLOWING'}].map(filter => (<div className={classes.MoreFilterButton} onClick={() => toggleFilter(filter.filter)}><span>{filter.text}</span></div>) )
        }

        moreFiltersDropdown = (
            <OutsideAlerter action={closeMoreFiltersDropdown}>
                <div className={classes.MoreFiltersDropdownPositioner}>
                    <div className={classes.MoreFilterBlocker} onClick={closeMoreFiltersDropdown}/>
                    <div className={classes.MoreFiltersDropdown}>
                        {moreFilters}
                    </div>
                </div>
            </OutsideAlerter>
        )
    }

    let moreFilterButton;
    if ( width < 769 ) {
        moreFilterButton = (
                <div className={moreFilterButtonClasses.join(" ")} onClick={openMoreFiltersDropdown}>
                    More
                </div>
        )
    }

    let hometownFilterButton
    let followingFilterButton;
    // if (props.following && props.following.length) {
    if (width >= 769) {
        hometownFilterButton = (
            <div className={hometownButtonClasses.join(" ")} onClick={() => toggleFilter('HOMETOWN')}>
                Hometown
            </div>
        );
        followingFilterButton = (
            <div className={followingButtonClasses.join(" ")} onClick={() => toggleFilter('FOLLOWING')}>
                Following
            </div>
        )
    }

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
                break;
            case 'HOMETOWN':
                // setSelectedFriends(hometown);
                setSelectedFriends(exHometown);
                break;
            case 'FOLLOWING':
                // setSelectedFriends(following);
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
            currentCityButtonClasses.push(classes.ActiveFilter);
            break;
        case 'HOMETOWN':
            hometownButtonClasses.push(classes.ActiveFilter);
            break;
        case 'FOLLOWING':
            followingButtonClasses.push(classes.ActiveFilter);
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
                <div className={currentCityButtonClasses.join(" ")} onClick={() => toggleFilter('CURRENT_CITY')}>
                    Current City
                </div>
                {hometownFilterButton}
                {followingFilterButton}
                {moreFilterButton}
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
        friends: state.profile.friends,
        following: state.profile.following,
        currentLocation: state.profile.currentLocation,
        hometown: state.profile.hometown,
    }
}


export default connect(mapStateToProps)(friends);