
import React from 'react';
import classes from './CreateEvent.css'
import PrivacyButton from '../../Button/PrivacyButton'
import BackArrow from '../../../../assets/images/LifeEventIcons/left-arrow'

const createEvent = (props) => {
    return (
        <div>
            <section className={classes.Header}>
                <div className={classes.BackButton}>
                    <BackArrow />
                </div>
                <h3>Create Life Event</h3>
            </section>
            <div className={classes.Break}/>
            <section className={classes.PrivacySelection}>
                <span>Sharing with</span><div className={classes.PrivacyButton}><PrivacyButton privacy="public"></PrivacyButton></div>
            </section>
            <div className={classes.MainImage}>
                <div className={classes.UploadImageButton}>

                </div>
            </div>
        </div>
    );
}

export default createEvent;