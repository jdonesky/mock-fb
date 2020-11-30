import React from 'react';
import classes from './Photos.css';

const friends = (props) => {

    return (
        <div className={classes.PhotosContainer}>
            <section className={classes.HeaderSection}>
                <h2 className={classes.Title}>Photos</h2>
            </section>
        </div>
    )

}

export default friends;