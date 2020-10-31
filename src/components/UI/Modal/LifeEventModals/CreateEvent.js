
import React, {useState, useContext, useEffect} from 'react';
import classes from './CreateEvent.css'
import Button from '../../Button/Button'
import PrivacyButton from '../../Button/PrivacyButton'
import BackArrow from '../../../../assets/images/LifeEventIcons/left-arrow'
import PlusPhoto from '../../../../assets/images/LifeEventIcons/addCamera'
import Calendar from '../../../../assets/images/LifeEventIcons/calendar'
import {fieldBuilder} from "../../../../shared/utility";
import {convertDate} from "../../../../shared/utility";
import {LifeEventContext} from "../../../../context/life-event-context";
import Briefcase from "../../../../assets/images/LifeEventIcons/briefcase";
import GradCap from "../../../../assets/images/LifeEventIcons/gradCap";
import Hearts from "../../../../assets/images/LifeEventIcons/hearts";
import Home from "../../../../assets/images/LifeEventIcons/home";
import Tree from "../../../../assets/images/LifeEventIcons/magnolia";
import Globe from "../../../../assets/images/LifeEventIcons/globe";
import Stars from "../../../../assets/images/LifeEventIcons/shooting-stars";
import Health from "../../../../assets/images/LifeEventIcons/health-report";
import Milestone from "../../../../assets/images/LifeEventIcons/goal";
import Candle from "../../../../assets/images/LifeEventIcons/candle";
import Flag from "../../../../assets/images/LifeEventIcons/finish";
import Pin from "../../../../assets/images/pin"

const createEvent = (props) => {

    const lifeEventContext = useContext(LifeEventContext)
    const [month,day,year] = convertDate(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`);
    const date = `${month} ${day}, ${year}`

    let icon;
    let caption;
    let form;
    switch (lifeEventContext.category) {
        case "Work":
            icon = <Briefcase fill="white"/>
            caption = "Work"
            break;
        case "Education":
            icon = <GradCap fill="white"/>
            caption = "Education"
            break;
        case "Relationship":
            icon = <Hearts fill="white"/>
            caption = "Relationship"
            break;
        case "Home":
            icon = <Home fill="white"/>
            caption = "Home & Living"
            break;
        case "Family":
            icon = <Tree fill="white"/>
            caption = "Family"
            break;
        case "Travel":
            icon = <Globe fill="white"/>
            caption = "Travel"
            break;
        case "Interests":
            icon = <Stars fill="white"/>
            caption = "Interests & Activities"
            break;
        case "Health":
            icon = <Health fill="white"/>
            caption = "Health & Wellness"
            break;
        case "Milestones":
            icon = <Milestone fill="white"/>
            caption = "Milestones & Achievements"
            break;
        case "Remembrance":
            icon = <Candle fill="white"/>
            caption = "Remembrance"
            break;
        case "Custom":
            icon = <Flag fill="white"/>
            caption = "Create Your Own"
            break;
        default:
            icon = <Stars fill="white"/>;
            caption = null;
    }

    return (
        <div>
            <section className={classes.Header}>
                <div className={classes.BackButton} onClick={lifeEventContext.toggleModalContent}>
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
            </div>
            <section className={classes.IconSection}>
                <div style={{position: 'absolute', left: '50%'}}>
                    <div className={classes.CenteredIcon}>
                        {icon}
                    </div>
                </div>
            </section>

            <section className={classes.BaseButtons}>
                <Button className={classes.CalendarButton} addClass="Neutral"><div className={classes.CalendarIcon}><Calendar /></div>{date}</Button>
                <Button className={classes.LocationButton} addClass="Neutral"><div className={classes.PinIcon}><Pin/></div></Button>
                <Button className={classes.ShareButton} addClass="Neutral">Share</Button>
            </section>
        </div>
    );
}

export default createEvent;