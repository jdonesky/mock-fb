

import React from 'react';
import classes from './StartCreating.css'
import NoGenderPlaceholder from '../../../../../assets/images/profile-placeholder-gender-neutral'

const startPost = () => {

    return (
        <div className={classes.Container}>
            <section className={classes.Header}>
                <div className={classes.ProfileImageContainer}>
                    <div className={classes.ProfileImage}>
                        <NoGenderPlaceholder />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default startPost;