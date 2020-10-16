

import React from 'react';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";
import sharedClasses from './SharedLoadedContentUI.css'

const workAndEducation = ({currLocations, hometown}) => {



    const currLocationEntries = currLocations && occupations.map((job,i) => (
        <ContentEntry
            key={i}
            category="work"
            mainText={`${!job.currentEmployer && 'Former'} ${job.position} at ${job.company}`}
            subText={job.location}
            sharedWith={job.privacy || 'public'}
        />
    ))
    const currentDate = new Date()
    const educationEntries = education && education.map((school,i) => (
        <ContentEntry
            key={i}
            category="education"
            mainText={`${new Date(school.endDate) > currentDate && !school.graduated ? 'Studies': 'Former Student'} at ${school.school}`}
            subText={`${school.startDate.split(' ')[1]} - ${school.endDate.split(' ')[1]}`}
            sharedWith={school.privacy || "public"}
        />
    ))

    return (
        <React.Fragment>
            <section className={sharedClasses.SubCategory} style={{marginTop: '0'}}>
                <h3>Work</h3>
                {workEntries && workEntries}
            </section>
            <section className={sharedClasses.SubCategory}>
                <h3>Education</h3>
                {educationEntries && educationEntries}
            </section>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        currLocations: state.profile.currLocations,
        hometown: state.profile.hometown,
    }
}

export default connect(mapStateToProps)(workAndEducation);