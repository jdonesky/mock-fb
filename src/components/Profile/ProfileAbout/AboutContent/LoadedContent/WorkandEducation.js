

import React from 'react';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";
import sharedClasses from './SharedLoadedContentUI.css'
import AddButton from '../SharedContent/AddContentButton'

const workAndEducation = props => {

    const {occupations, education} = props;
    const sortedOccupations = occupations && occupations.sort((a,b) => (new Date(a.endYear) < new Date(b.endYear)) ? 1: -1)
    const sortedEducation = education && education.sort((a,b) => (new Date(a.endDate) < new Date(b.endDate)) ? 1: -1)

    const workEntries = sortedOccupations && sortedOccupations.map((job,i) => (
        <ContentEntry
            key={job.id}
            id={job.id}
            category="work"
            mainText={`${!job.currentEmployer ? 'Former': ''} ${job.position} at ${job.company}`}
            subText={job.location}
            sharedWith={job.privacy || 'public'}
            content={job}
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
        />
    ))

    return (
        <React.Fragment>
            <section className={sharedClasses.SubCategory} style={{marginTop: '0'}}>
                <h3>Work</h3>
                <AddButton category="work"/>
                {workEntries && workEntries}
            </section>
            <section className={sharedClasses.SubCategory}>
                <h3>Education</h3>
                <AddButton category="education"/>
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