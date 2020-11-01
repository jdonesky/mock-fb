
import React, {useState, useContext, useEffect} from 'react';
import classes from './CreateEvent.css'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import PrivacyButton from '../../Button/PrivacyButton'
import {convertDate} from "../../../../shared/utility";
import {LifeEventContext} from "../../../../context/life-event-context";

import BackArrow from '../../../../assets/images/LifeEventIcons/left-arrow'
import PlusPhoto from '../../../../assets/images/LifeEventIcons/addCamera'
import Calendar from '../../../../assets/images/LifeEventIcons/calendar'
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

import Work from './EventForms/Work'
import School from './EventForms/School'
import Relationship from './EventForms/Relationship'
import Location from './EventForms/Locations'
import DateForm from './EventForms/Dropdowns/Date'
import CurrentLocationForm from './EventForms/Dropdowns/CurrentLocation'
import OutsideAlerter from "../../../../hooks/outsideClickHandler";

const createEvent = (props) => {

    const [showDateForm, setShowDateForm] = useState(false)
    const [showLocationForm, setShowLocationForm] = useState(false);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [addedInputs, setAddedInputs] = useState({})

    useEffect(() => {
        const payload = {
            title: title,
            ...addedInputs,
            description: description,
            year: addedInputs['year'] || year,
            month: addedInputs['month'] || month[0],
            day: addedInputs['day'] || day
        }
        console.log(payload)
    })

    const toggleDateForm = () => {
        setShowDateForm((prevState) => {
            return !prevState
        })
    }

    const closeDateForm = () => {
        setShowDateForm(false)
    }

    const toggleLocationForm = () => {
        setShowLocationForm((prevState) => {
            return !prevState
        })
    }
    const closeLocationForm = () => {
        setShowLocationForm(false)
    }


    const lifeEventContext = useContext(LifeEventContext)
    const [month,day,year] = convertDate(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`);
    const date = `${addedInputs['month'] || month} ${addedInputs['day'] || day}, ${addedInputs['year'] || year}`

    const updateTitle = (event) => {
        setTitle(event.target.value)
    }
    const updateDescription = (event) => {
        setDescription(event.target.value)
    }

    const updateInputs = (field, value) => {
        setAddedInputs({...addedInputs,[field] : value})
    }

    const saveEvent = (event) => {
        event.preventDefault()
    }

    let icon;
    let caption;
    let addInputs;
    switch (lifeEventContext.category) {
        case "Work":
            icon = <Briefcase fill="white"/>
            caption = "Example: achievement, volunteer, new skill or certification"
            addInputs = <Work values={addedInputs} update={updateInputs}/>
            break;
        case "Education":
            icon = <GradCap fill="white"/>
            caption = "Example: achievement, new skill or joined a club or team"
            addInputs = <School values={addedInputs} update={updateInputs}/>
            break;
        case "Relationship":
            icon = <Hearts fill="white"/>
            caption = "Example: shared milestone, first trip or moved in together"
            addInputs = <Relationship values={addedInputs} update={updateInputs}/>
            break;
        case "Home":
            icon = <Home fill="white"/>
            caption = "Example: new roommate, home improvement, new house or new car"
            addInputs = <Location values={addedInputs} update={updateInputs}/>
            break;
        case "Family":
            icon = <Tree fill="white"/>
            caption = "Example: new family member, family reunion, family event or adopted a pet"
            break;
        case "Travel":
            icon = <Globe fill="white"/>
            caption = "Example: travel, road trip or first flight"
            addInputs = <Location values={addedInputs} update={updateInputs}/>
            break;
        case "Interests":
            icon = <Stars fill="white"/>
            caption = "Example: concert, event, new hobby or activism"
            break;
        case "Health":
            icon = <Health fill="white"/>
            caption = "Example: new habit, health update, training or athletic event"
            break;
        case "Milestones":
            icon = <Milestone fill="white"/>
            caption = "Example: cultural event, religious event, achievement, first or milestone birthday"
            break;
        case "Remembrance":
            icon = <Candle fill="white"/>
            caption = "Example: remembering a friend, celebration of life, in memory of..."
            break;
        case "Custom":
            icon = <Flag fill="white"/>
            break;
        default:
            icon = <Stars fill="white"/>;
    }

    const titleInput = (
        <Input
            elementType="input"
            type="text"
            valid={true}
            value={title}
            touched={false}
            placeholder="Title"
            changed={(event) => updateTitle(event)}
            className={classes.BaseInput}
        />
    )

    const titleCaption = caption ? <div className={classes.TitleCaption}>{caption}</div> : null

    const descriptionClass = [classes.BaseInput]
    if (!addInputs) {
        descriptionClass.push(classes.NoAddedInputs)
    }
    const descriptionInput = (
        <Input
            elementType="textarea"
            placeholder="Description (optional)"
            value={description}
            changed={(event) => updateDescription(event)}
            className={descriptionClass.join(" ")}
        />
    );

    let dateForm;
    if (showDateForm) {
        dateForm = <DateForm values={addedInputs} update={updateInputs} toggle={toggleDateForm} year={year} month={month} day={day} />
    }

    let currentLocationForm;
    if (showLocationForm) {
        currentLocationForm = <CurrentLocationForm />
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
            <section className={classes.FormSection}>
                <form onSubmit={saveEvent}>
                    {titleInput}
                    {titleCaption}
                    <div className={classes.AddInputs}>
                    {addInputs ? addInputs : null}
                    </div>
                    {descriptionInput}
                    <section className={classes.BaseButtons}>
                        <OutsideAlerter action={closeDateForm}>
                            {dateForm}
                            <Button className={classes.CalendarButton} addClass="Neutral" type="button" clicked={toggleDateForm}><div className={classes.CalendarIcon}><Calendar /></div>{date}</Button>
                        </OutsideAlerter>
                        <OutsideAlerter action={closeLocationForm}>
                            {currentLocationForm}
                            <Button className={classes.LocationButton} addClass="Neutral" type="button" clicked={toggleLocationForm}><div className={classes.PinIcon}><Pin/></div></Button>
                        </OutsideAlerter>
                        <Button className={classes.ShareButton} addClass="Neutral" type="submit">Share</Button>
                    </section>
                </form>
            </section>
        </div>
    );
}

export default createEvent;