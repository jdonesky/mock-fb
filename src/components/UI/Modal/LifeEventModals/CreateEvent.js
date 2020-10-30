
import React, {useState, useContext} from 'react';
import classes from './CreateEvent.css'
import PrivacyButton from '../../Button/PrivacyButton'
import BackArrow from '../../../../assets/images/LifeEventIcons/left-arrow'
import PlusPhoto from '../../../../assets/images/LifeEventIcons/addCamera'
import {fieldBuilder} from "../../../../shared/utility";
import {LifeEventContext} from "../../../../context/life-event-context";


const createEvent = (props) => {

    const lifeEventContext = useContext(LifeEventContext)

    let icon;
    let form;

    switch (lifeEventContext.category) {
        case "":
            break;
        default:
            icon = null;
    }

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
                    <div className={classes.UploadImageIcon}><PlusPhoto /></div>
                    <span className={classes.UploadImageText}>Add a Photo</span>
                </div>
                <section className={classes.IconSection}>
                    <div className={classes.CenteredIcon}>
                        {icon}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default createEvent;