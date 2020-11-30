
import React from 'react';
import classes from './Friends.css';

const friends = (props) => {

    return (
        <div className={classes.FriendsContainer}>
            <section className={classes.HeaderSection}>
                <h2 className={classes.Title}>Friends</h2>
            </section>
        </div>
    )

}

export default friends;