

import React, {useState,useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";
import sharedClasses from './SharedLoadedContentUI.css'
import AddButton from '../SharedContent/AddContentButton'

const workAndEducation = props => {

    const {occupations, education, otherProfile} = props;
    const [displayProfile, setDisplayProfile]  = useState(props.match.params.id);

    useEffect(() => {
        if (displayProfile !== props.match.params.id) {
            setDisplayProfile(props.match.params.id);
        }
    })

    let sortedOccupations;
    let sortedEducation;
    if (displayProfile === 'me') {
        sortedOccupations = occupations && occupations.sort((a,b) => (new Date(a.endYear) < new Date(b.endYear)) ? 1: -1)
        sortedEducation = education && education.sort((a,b) => (new Date(a.endDate) < new Date(b.endDate)) ? 1: -1)
    } else if (displayProfile !== 'me') {
        if (otherProfile) {
            if (otherProfile.occupations && otherProfile.occupations.length) {
                sortedOccupations = otherProfile.occupation.sort((a,b) => (new Date(a.endYear) < new Date(b.endYear)) ? 1: -1)
            }
            if (otherProfile.education && otherProfile.education.length) {
                sortedEducation = otherProfile.education.sort((a,b) => (new Date(a.endDate) < new Date(b.endDate)) ? 1: -1)
            }
        }
    }

    const workEntries = sortedOccupations && sortedOccupations.map((job,i) => (
        <ContentEntry
            key={job.id}
            id={job.id}
            category="work"
            mainText={`${!job.currentEmployer ? 'Former': ''} ${job.position} at ${job.company}`}
            subText={job.location}
            sharedWith={job.privacy || 'public'}
            content={job}
            displayProfile={displayProfile}
        />
    ))
    const currentDate = new Date()
    const educationEntries = sortedEducation && sortedEducation.map((school,i) => (
        <ContentEntry
            key={school.id}
            id={school.id}
            category="education"
            mainText={`${new Date(school.endDate) > currentDate && !school.graduated ? 'Studies': 'Former Student'} at ${school.school}`}
            subText={`${school.startDate.split(' ')[1]} - ${school.endDate.split(' ')[1]}`}
            sharedWith={school.privacy || "public"}
            content={school}
            displayProfile={displayProfile}
        />
    ))

    let addWorkButton;
    let addSchoolButton;
    if (displayProfile === 'me') {
        addWorkButton = <AddButton category="work"/>
        addSchoolButton = <AddButton category="education"/>
    }

    return (
        <React.Fragment>
            <section className={sharedClasses.SubCategory} style={{marginTop: '0'}}>
                <h3>Work</h3>
                {addWorkButton}
                {workEntries ? workEntries : <span className={sharedClasses.Placeholder}>No work to show</span>}
            </section>
            <section className={sharedClasses.SubCategory}>
                <h3>Education</h3>
                {addSchoolButton}
                {educationEntries  ? educationEntries :  <span className={sharedClasses.Placeholder}>No school to show</span>}
            </section>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        occupations: state.profile.occupations,
        education: state.profile.education,
        otherProfile: state.users.otherProfile
    }
}

export default connect(mapStateToProps)(withRouter(workAndEducation));