

import React from 'react';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";
import sharedClasses from './SharedLoadedContentUI.css'
import AddButton from '../SharedContent/AddContentButton'

const workAndEducation = props => {

    const {occupations, education} = props;

    const workEntries = occupations && occupations.map((job,i) => (
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
                <AddButton text="Add a workplace"/>
                {workEntries && workEntries}
            </section>
            <section className={sharedClasses.SubCategory}>
                <h3>Education</h3>
                <AddButton text="Add a school"/>
                {educationEntries && educationEntries}
            </section>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        occupations: state.profile.occupations,
        education: state.profile.education,
    }
}

export default connect(mapStateToProps)(workAndEducation);