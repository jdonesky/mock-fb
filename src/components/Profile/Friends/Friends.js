
import React, {useState} from 'react';
import classes from './Friends.css';
import Searchbar from '../../Search/Searchbar';
import getWindowDimensions from "../../../hooks/getWindowDimensions";
import Dots from '../../../assets/images/dots';

const friends = (props) => {

    const [filter, setFilter] = useState('ALL')
    const {width, height} = getWindowDimensions();

    const toggleFilter = (filter) => {
        setFilter(filter);
    }

    const allButtonClasses = [classes.FilterButton];
    const birthdaysButtonClasses = [classes.FilterButton];
    const currentCityButtonClasses = [classes.FilterButton];
    const hometownButtonClasses = [classes.FilterButton];
    const followingButtonClasses = [classes.FilterButton];

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
                    <Searchbar className={classes.SearchBar} iconClass={classes.SearchGlass} placeholder='Search friends'/>
                    <div className={classes.TextButton}>
                        Friend Requests
                    </div>
                    <div className={classes.TextButton}>
                        Find Friends
                    </div>
                    <div className={classes.MoreOptionsButton}>
                        <Dots />
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
                <div className={hometownButtonClasses.join(" ")} onClick={() => toggleFilter('HOMETOWN')}>
                    Hometown
                </div>
                <div className={followingButtonClasses.join(" ")} onClick={() => toggleFilter('FOLLOWING')}>
                    Following
                </div>
            </section>
        </div>
    )

}

export default friends;