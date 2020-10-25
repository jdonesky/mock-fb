

import React from 'react';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";

const overview = props => {

  const {occupations, education, currLocation, hometown, relationships, contacts} = props;

  const currentOccupation = occupations && occupations.find(job => job.currentEmployer)
  const mostRecentOccupation = occupations && occupations.sort((a,b) => (new Date(a.endYear) < new Date(b.endYear)) ? 1: -1)[0]

  const currentDate = new Date()
  const sortedEducation = education && education.sort((a,b) => (new Date(a.endDate) < new Date(b.endDate)) ? 1: -1)


  return (
      <React.Fragment>
          <ContentEntry
              id={currentOccupation ? currentOccupation.id : mostRecentOccupation && mostRecentOccupation.id }
              category="work"
              mainText={occupations && occupations.length ? `Employed as a ${currentOccupation ? currentOccupation.position : mostRecentOccupation && mostRecentOccupation.position}` : 'Add a job'}
              subText={occupations && occupations.length ? `${occupations[0].company}, ${occupations[0].location}` : 'Employer, location'}
              sharedWith="friends"
              content={occupations}
          />
          <ContentEntry
              id={sortedEducation && sortedEducation[0].id}
              category="education"
              mainText={sortedEducation && sortedEducation.length ? `${new Date(sortedEducation[0].endDate) > currentDate && !sortedEducation[0].graduated ? 'Studies': 'Former Student'} at ${sortedEducation[0].school}`: 'Add a School'}
              subText={sortedEducation && sortedEducation.length ? `${sortedEducation[0].startDate} to ${sortedEducation[0].endDate} ` : 'Years attended'}
              sharedWith="private"
              content={sortedEducation}
          />
          <ContentEntry
              category="currLocation"
              mainText={currLocation ? `Lives in ${currLocation.name}` : 'Add your current location'}
              sharedWith="public"
              content={currLocation}
          />
          <ContentEntry
              category="fromLocation"
              mainText={hometown ? `Originally from ${hometown.name}` : "Add your hometown"}
              sharedWith="public"
              content={hometown}
          />
          <ContentEntry
              id={relationships && relationships[0].id}
              category="relationship"
              mainText={relationships && relationships.length ? `${relationships[0].status}` : "Add your relationship status"}
              subText={relationships && relationships.length ? `With ${relationships[0].partner}` : "With: "}
              sharedWith="private"
              content={relationships}
          />
          <ContentEntry
              category="contact"
              mainText={contacts && contacts.phone? `${contacts.phone}` : "Add contact information"}
              subText={contacts? null : "Phone, Email, IG, Twitter"}
              sharedWith="friends"
              content={contacts}
          />
      </React.Fragment>
  );
}

const mapStateToProps = state => {
    return {
        occupations: state.profile.occupations,
        education: state.profile.education,
        currLocation: state.profile.currLocation,
        hometown: state.profile.hometown,
        relationships: state.profile.relationships,
        contacts: state.profile.contacts
    }
}

export default connect(mapStateToProps)(overview);