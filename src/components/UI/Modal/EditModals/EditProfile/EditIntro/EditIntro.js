
import React, {useState, useEffect, useContext} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './EditIntro.css';
import AddContentButton from '../../../../../Profile/ProfileAbout/AboutContent/SharedContent/AddContentButton';
import Switch from '../../../../Switch/Switch';
import InlineDots from '../../../../Spinner/InlineDots';
import Edit from '../../../../../../assets/images/edit';
import * as actions from "../../../../../../store/actions";
import {EditProfileContext} from "../../../../../../context/edit-profile-context";


const editIntro = props => {

    const {occupations, education, currLocation, hometown, relationships} = props;
    const editProfileContext = useContext(EditProfileContext);
    const [addWork, setAddWork] = useState({});
    const [addEducation, setAddEducation] = useState({});
    const [addCurrLocation, setAddCurrLocation] = useState(false);
    const [addHometown, setAddHometown] = useState(false)
    const [addRelationship, setAddRelationship] = useState({});

    useEffect(() => {
        if (occupations) {
            setAddWork(occupations && occupations.map(job => job.id).reduce((ids, id) => ({...ids, [id]: occupations.find(job => job.id === id).introItem || false}), {}))
        }
    }, [occupations])

    useEffect(() => {
        if (education) {
            setAddEducation(education && education.map(school => school.id).reduce((ids, id) => ({...ids, [id]: education.find(job => job.id === id).introItem || false}), {}))
        }
    }, [education])

    useEffect(() => {
        if (currLocation) {
            setAddCurrLocation(currLocation && currLocation.introItem || false)
        }
    }, [currLocation])

    useEffect(() => {
        if (hometown) {
            setAddHometown(hometown && hometown.introItem || false)
        }
    }, [hometown])

    useEffect(() => {
        if (relationships) {
            setAddRelationship(relationships && relationships.map(relationship => relationship.id).reduce((ids, id) => ({...ids, [id]: relationships.find(job => job.id === id).introItem || false}), {}))
        }
    }, [relationships])

    const updateIntro = (event, field, id) => {
        event.persist()
        let newEntry;
        switch (field) {
            case 'occupations':
                setAddWork(prevState => ({
                    ...prevState,
                    [id]: event.target && event.target.checked
                }))
                newEntry = {...occupations.find(job => job.id === id), introItem: event.target.checked}
                break;
            case 'education':
                setAddEducation(prevState => ({
                    ...prevState,
                    [id]: event.target && event.target.checked
                }))
                newEntry = {...education.find(school => school.id === id), introItem: event.target.checked}
                break;
            case 'currLocation':
                setAddCurrLocation(prevState => {
                    return !prevState
                })
                newEntry = {...currLocation, introItem: event.target.checked}
                break;
            case 'hometown':
                setAddHometown(prevState => {
                    return !prevState
                })
                newEntry = {...hometown, introItem: event.target.checked}
                break;
            case 'relationships':
                setAddRelationship(prevState => ({
                    ...prevState,
                    [id]: event.target && event.target.checked
                }))
                newEntry = {...relationships.find(relationship => relationship.id === id), introItem: event.target.checked}
                break;
        }

        props.onProfileUpdate(props.authToken, props.firebaseKey, field, newEntry, 'edit', id)
    }

    const navToEdit = (path) => {
        props.history.push(path);
        editProfileContext.closeEditModal()
        editProfileContext.toggleModalContent('BASE')
    }


    let existingWork;
    if (occupations) {
        existingWork = occupations.map(job => (
            <div key={job.id} className={classes.IntroItem}>
                <div className={classes.ItemLeftBlock}>
                    <div className={classes.ItemSwitch}>
                        <Switch name={job.id} isSelected={addWork[job.id]} onChange={(event) => updateIntro(event,'occupations', job.id)} />
                    </div>
                    {`${job.position} at ${job.company}`}
                </div>
                <div className={classes.EditItemButton} onClick={() => navToEdit('/user-profile/me/about/work-education')}>
                    <Edit />
                </div>
            </div>
        ))
    }

    let existingEducation;
    if (education) {
        existingEducation = education.map(school => (
            <div key={school.id} className={classes.IntroItem}>
                <div className={classes.ItemLeftBlock}>
                    <div className={classes.ItemSwitch}>
                        <Switch name={school.id} isSelected={addEducation[school.id]} onChange={(event) => updateIntro(event,'education', school.id)} />
                    </div>
                    {`Student at ${school.school}`}
                </div>
                <div className={classes.EditItemButton}  onClick={() => navToEdit('/user-profile/me/about/work-education')}>
                    <Edit />
                </div>
            </div>
        ))
    }

    let existingCurrLocation;
    if (currLocation) {
        existingCurrLocation = (
            <div className={classes.IntroItem}>
                <div className={classes.ItemLeftBlock}>
                    <div className={classes.ItemSwitch}>
                        <Switch name={currLocation.name} isSelected={addCurrLocation} onChange={(event) => updateIntro(event,'currLocation')} />
                    </div>
                    {`Lives in ${currLocation.name}`}
                </div>
                <div className={classes.EditItemButton} onClick={() => navToEdit('/user-profile/me/about/places-lived')}>
                    <Edit />
                </div>
            </div>
        )
    }

    let existingHometown;
    if (currLocation) {
        existingHometown = (
            <div className={classes.IntroItem}>
                <div className={classes.ItemLeftBlock}>
                    <div className={classes.ItemSwitch}>
                        <Switch name={hometown.name} isSelected={addHometown} onChange={(event) => updateIntro(event,'hometown')} />
                    </div>
                    {`Lives in ${hometown.name}`}
                </div>
                <div className={classes.EditItemButton} onClick={() => navToEdit('/user-profile/me/about/places-lived')}>
                    <Edit />
                </div>
            </div>
        )
    }

    let existingRelationship;
    if (currLocation) {
        existingRelationship = (
            <div className={classes.IntroItem}>
                <div className={classes.ItemLeftBlock}>
                    <div className={classes.ItemSwitch}>
                        <Switch name={relationships[0].id} isSelected={addRelationship[relationships[0].id]} onChange={(event) => updateIntro(event,'relationships', relationships[0].id)} />
                    </div>
                    {relationships[0].status}
                </div>
                <div className={classes.EditItemButton} onClick={() => navToEdit('/user-profile/me/about/family-relationships')}>
                    <Edit />
                </div>
            </div>
        )
    }

    return (
        <div className={classes.Container}>
            <div className={classes.SubHeader}>Customize Your Intro</div>
            <section className={classes.IntroSection}>
                <div className={[classes.SubHeader, classes.SectionHeader].join(" ")}>Work</div>
                {existingWork}
                 <AddContentButton actionType="NAV" category="work" textLineHeight="23px"/>
            </section>
            <section className={classes.IntroSection}>
                <div className={[classes.SubHeader, classes.SectionHeader].join(" ")}>Education</div>
                {existingEducation}
                <AddContentButton actionType="NAV" category="education" textLineHeight="23px"/>
            </section>
            <section className={classes.IntroSection}>
                <div className={[classes.SubHeader, classes.SectionHeader].join(" ")}>Current City</div>
                {existingCurrLocation}
                <AddContentButton actionType="NAV" category="currLocation" textLineHeight="23px"/>
            </section>
            <section className={classes.IntroSection}>
                <div className={[classes.SubHeader, classes.SectionHeader].join(" ")}>Hometown</div>
                {existingHometown}
                <AddContentButton actionType="NAV" category="hometown" textLineHeight="23px"/>
            </section>
            <section className={classes.IntroSection}>
                <div className={[classes.SubHeader, classes.SectionHeader].join(" ")}>Relationship</div>
                {existingRelationship}
                <AddContentButton actionType="NAV" category="relationship" textLineHeight="23px"/>
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        occupations: state.profile.occupations,
        education: state.profile.education,
        currLocation: state.profile.currLocation,
        hometown: state.profile.hometown,
        relationships: state.profile.relationships,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (authToken, firebaseKey, fieldName, payload, how, id) => dispatch(actions.updateProfileAttempt(authToken, firebaseKey, fieldName, payload, how, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(editIntro));