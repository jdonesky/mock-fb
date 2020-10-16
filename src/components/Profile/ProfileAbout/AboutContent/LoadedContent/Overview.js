

import React from 'react';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";

const overview = props => {

  const {occupations, education, currLocations, hometown, relationships, contacts} = props;

  return (
      <React.Fragment>
          <ContentEntry
              category="work"
              occupations={occupations}
              mainText={occupations ? `Employed as a ${occupations[0].position}` : 'Add your current job'}
              subText={occupations? `${occupations[0].company}, ${occupations[0].location}` : 'Employer, location'}
              sharedWith="friends"
          />
          <ContentEntry
              category="education"
              mainText={education ? `Studied at ${education[0].school}` : 'Add a school'}
              subText={education? `${education[0].startDate} to ${education[0].endDate} `  : 'Years attended'}
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