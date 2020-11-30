
import React from 'react';
import classes from './Friends.css';
import Searchbar from '../../Search/Searchbar';

import Dots from '../../../assets/images/dots';

const friends = (props) => {

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
                    <Searchbar placeholder='Search friends'/>
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
        </div>
    )

}

export default friends;