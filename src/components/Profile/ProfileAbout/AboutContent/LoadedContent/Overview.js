

import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import ContentEntry from "../SharedContent/ContentEntry";
import sharedClasses from './SharedLoadedContentUI.css';

const overview = props => {

  const [displayProfile, setDisplayProfile] = useState(props.match.params.id);

  const {occupations, education, currLocation, hometown, relationships, contacts, otherProfile} = props;

  useEffect(() => {
     if (displayProfile !== props.match.params.id) {
         setDisplayProfile(props.match.params.id);
     }
  })

  let currentOccupation;
  let mostRecentOccupation;
  let occupationPlaceholder;
  let occupationSubPlaceholder;
  let sortedEducation;
  let educationPlaceholder;
  let educationSubPlaceholder;
  let currentLocation;
  let currentLocationPlaceholder;
  let userHometown;
  let hometownPlaceholder;
  let userRelationships;
  let relationshipPlaceholder;
  let relationshipSubPlaceholder;
  let contactInfo;
  let contactsPlaceholder;
  let contactSubPlaceholder;
  const currentDate = new Date()

  if (displayProfile === 'me') {
      currentOccupation = occupations && occupations.find(job => job.currentEmployer);
      mostRecentOccupation = occupations && occupations.sort((a, b) => (new Date(a.endYear) < new Date(b.endYear)) ? 1 : -1)[0];
      occupationPlaceholder = 'Add a job'
      occupationSubPlaceholder = 'Employer, location'
      sortedEducation = education && education.sort((a, b) => (new Date(a.endDate) < new Date(b.endDate)) ? 1 : -1);
      educationPlaceholder = 'Add a School'
      educationSubPlaceholder = 'Years attended'
      currentLocation = currLocation;
      currentLocationPlaceholder = 'Add your current location'
      userHometown = hometown;
      hometownPlaceholder = 'Add your hometown'
      userRelationships = relationships;
      relationshipPlaceholder = "Add your relationship status"
      relationshipSubPlaceholder = 'With: '
      contactInfo = contacts;
      contactsPlaceholder = "Add contact information"
      contactSubPlaceholder = "Phone, Email, IG, Twitter"

  } else {
      occupationPlaceholder = <span className={sharedClasses.Placeholder}>No workplaces to show</span>
      educationPlaceholder = <span className={sharedClasses.Placeholder}>No schools to show</span>
      currentLocationPlaceholder = <span className={sharedClasses.Placeholder}>No current location to show</span>
      hometownPlaceholder = <span className={sharedClasses.Placeholder}>No hometown to show</span>
      relationshipPlaceholder = <span className={sharedClasses.Placeholder}>No relationships to show</span>
      contactsPlaceholder = <span className={sharedClasses.Placeholder}>No contacts to show</span>
      if (otherProfile) {
          if (otherProfile.occupations && otherProfile.occupations.length) {
              currentOccupation = otherProfile.occupations.find(job => job.currentEmployer)
              mostRecentOccupation = otherProfile.occupations.sort((a, b) => (new Date(a.endYear) < new Date(b.endYear)) ? 1 : -1)[0]
          }
          if (otherProfile.education && otherProfile.education.length) {
              sortedEducation = otherProfile.education.sort((a, b) => (new Date(a.endDate) < new Date(b.endDate)) ? 1 : -1)
          }
          currentLocation = otherProfile.currLocation;
          userHometown = otherProfile.hometown
          userRelationships = otherProfile.relationships
          contactInfo = otherProfile.contacts
      }
  }

  return (
      <React.Fragment>
          <ContentEntry
              id={currentOccupation ? currentOccupation.id : mostRecentOccupation && mostRecentOccupation.id }
              category="work"
              mainText={displayProfile === 'me' && occupations && occupations.length || displayProfile !== 'me' && otherProfile && otherProfile.occupations && otherProfile.occupations.length ? `Employed as a ${currentOccupation ? currentOccupation.position : mostRecentOccupation && mostRecentOccupation.position}` : occupationPlaceholder}
              subText={displayProfile === 'me' && occupations && occupations.length || displayProfile !== 'me' && otherProfile && otherProfile.occupation && otherProfile.occupation.length ? `${occupations[0].company}, ${occupations[0].location}` : occupationSubPlaceholder}
              sharedWith="friends"
              content={occupations}
              displayProfile={displayProfile}
          />
          <ContentEntry
              id={sortedEducation && sortedEducation[0].id}
              category="education"
              mainText={sortedEducation && sortedEducation.length ? `${new Date(sortedEducation[0].endDate) > currentDate && !sortedEducation[0].graduated ? 'Studies': 'Former Student'} at ${sortedEducation[0].school}`: educationPlaceholder}
              subText={sortedEducation && sortedEducation.length ? `${sortedEducation[0].startDate} to ${sortedEducation[0].endDate} ` : educationSubPlaceholder}
              sharedWith="private"
              content={sortedEducation}
              displayProfile={displayProfile}
          />
          <ContentEntry
              category="currLocation"
              mainText={currentLocation ? `Lives in ${currentLocation.name}` : currentLocationPlaceholder}
              sharedWith="public"
              content={currentLocation}
              displayProfile={displayProfile}
          />
          <ContentEntry
              category="fromLocation"
              mainText={userHometown ? `Originally from ${userHometown.name}` : hometownPlaceholder}
              sharedWith="public"
              content={userHometown}
              displayProfile={displayProfile}
          />
          <ContentEntry
              id={userRelationships && userRelationships[0].id}
              category="relationship"
              mainText={userRelationships && userRelationships.length ? `${userRelationships[0].status}` : relationshipPlaceholder}
              subText={userRelationships && userRelationships.length ? `With ${userRelationships[0].partner}` : relationshipSubPlaceholder}
              sharedWith="private"
              content={userRelationships}
              displayProfile={displayProfile}
          />
          <ContentEntry
              category="contact"
              mainText={contactInfo && contactInfo.phone? `${contactInfo.phone}` : contactsPlaceholder}
              subText={contactInfo ? null : contactSubPlaceholder}
              sharedWith="friends"
              content={contactInfo}
              displayProfile={displayProfile}
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
        contacts: state.profile.contacts,
        otherProfile: state.users.fullProfile,
    }
}

export default connect(mapStateToProps)(withRouter(overview));