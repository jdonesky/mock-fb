

import React from 'react';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";


const overview = props => {

  const {occupations, education, currLocations, hometown, relationships, contacts} = props;

  const currentOccupation = occupations && occupations.find(job => job.currentEmployer)
  const mostRecentOccupation = occupations && occupations.sort((a,b) => (new Date(a.endYear) < new Date(b.endYear)) ? 1: -1)[0]

  const currentDate = new Date()
  const sortedEducation = education && education.sort((a,b) => (new Date(a.endDate) < new Date(b.endDate)) ? 1: -1)

  return (
      <React.Fragment>
          <ContentEntry
              category="work"
              mainText={occupations ? `Employed as a ${currentOccupation ? currentOccupation.position : mostRecentOccupation && mostRecentOccupation.position}` : 'Add a job'}
              subText={occupations? `${occupations[0].company}, ${occupations[0].location}` : 'Employer, location'}
              sharedWith="friends"
          />
          <ContentEntry
              category="education"
              mainText={sortedEducation && `${new Date(sortedEducation[0].endDate) > currentDate && !sortedEducation[0].graduated ? 'Studies': 'Former Student'} at ${sortedEducation[0].school}`}
              // mainText={education ? `Studied at ${education[0].school}` : 'Add a school'}
              subText={sortedEducation ? `${sortedEducation[0].startDate} to ${sortedEducation[0].endDate} ` : 'Years attended'}
              sharedWith="private"
          />
          <ContentEntry
              category="currLocation"
              mainText={currLocations ? `Lives in ${currLocations[0].name}` : 'Add your current location'}
              sharedWith="public"
          />
          <ContentEntry
              category="fromLocation"
              mainText={hometown ? `Originally from ${hometown.name}` : "Add your hometown"}
              sharedWith="public"
          />
          <ContentEntry
              category="relationship"
              mainText={relationships ? `${relationships[0].status}` : "Add your relationship status"}
              subText={relationships ? `With ${relationships[0].partner}` : "With: "}
              sharedWith="private"
          />
          <ContentEntry
              category="contact"
              mainText={contacts? `${contacts.phone}` : "Add contact information"}
              subText={contacts? null : "Phone, Email, IG, Twitter"}
              sharedWith="friends"
          />
      </React.Fragment>
  );
}

const mapStateToProps = state => {
    return {
        occupations: state.profile.occupations,
        education: state.profile.education,
        currLocations: state.profile.currLocations,
        hometown: state.profile.hometown,
        relationships: state.profile.relationships,
        contacts: state.profile.contacts
    }
}

export default connect(mapStateToProps)(overview);