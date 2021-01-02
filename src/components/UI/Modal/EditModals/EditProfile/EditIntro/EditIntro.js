
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import classes from './EditIntro.css';
import AddContentButton from '../../../../../Profile/ProfileAbout/AboutContent/SharedContent/AddContentButton';
import Switch from '../../../../Switch/Switch';
import Edit from '../../../../../../assets/images/edit';
import * as actions from "../../../../../../store/actions";

const editIntro = props => {

    const {authToken, firebaseKey, occupations, education} = props
    const [addWork, setAddWork] = useState({});
    const [addEducation, setAddEducation] = useState({})

    useEffect(() => {
        console.log(addWork)
    })

    useEffect(() => {
        if (occupations) {
            setAddWork(occupations && occupations.map(job => job.id).reduce((ids, id) => ({...ids, [id]: occupations.find(job => job.id === id).introItem || false}), {}))
        }
    }, [occupations])


    const updateWorkIntro = (event, id) => {
        event.persist()
        setAddWork(prevState => ({
            ...prevState,
            [id]: event.target && event.target.checked
        }))
    }

    let existingWork;
    if (occupations) {
        existingWork = occupations.map(job => (
            <div key={job.id} className={classes.IntroItem}>
                <div className={classes.ItemLeftBlock}>
                    <div className={classes.ItemSwitch}>
                        <Switch name={job.id} isSelected={addWork[job.id]} onChange={(event) => updateWorkIntro(event,job.id)} />
                    </div>
                    {`${job.position} at ${job.company}`}
                </div>
                <div className={classes.EditItemButton}>
                    <Edit />
                </div>
            </div>
        ))
    }

    return (
        <div className={classes.Container}>
            <div className={classes.SubHeader}>Customize Your Intro</div>
            <section className={classes.IntroSection}>
                <div className={[classes.SubHeader, classes.SectionHeader].join(" ")}>Work</div>
                {existingWork}
                 <AddContentButton category="work" textLineHeight="23px"/>
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
        relationships: state.profile.relationships
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (authToken, firebaseKey, fieldName, payload, how, id) => dispatch(actions.updateProfileAttempt(authToken, firebaseKey, fieldName, payload, how, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(editIntro);