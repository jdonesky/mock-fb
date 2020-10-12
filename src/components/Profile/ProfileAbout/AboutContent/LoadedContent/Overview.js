

import React from 'react';
import ContentEntry from "../ContentShared/ContentEntry";

const overview = props => {

  const {occupation, education, currLocation, fromLocation, relationship, contact} = props;



  return (
      <React.Fragment>
          <ContentEntry
              category="work"
              mainText={occupation? `Employed as a ${occupation[0]}` : 'Add your current job'}
              subText={occupation? `${occupation[0][1]}` : 'Employer, location'}
              sharedWith="friends"
          />
          <ContentEntry
              category="education"
              mainText={education? `Studied at ${education[0]}` : 'Add a school'}
              subText={education? `${education[0][1]}` : 'Location, Years attended'}
              sharedWith="private"
          />
          <ContentEntry
              category="currLocation"
              mainText={currLocation? `Lives in ${currLocation}` : 'Add your current location'}
              sharedWith="public"
          />
          <ContentEntry
              category="fromLocation"
              mainText={fromLocation? `Originally from ${fromLocation}` : "Add your hometown"}
              sharedWith="public"
          />
          <ContentEntry
              category="relationship"
              mainText={relationship? `${relationship}` : "Add your relationship status"}
              subText={relationship? `${relationship[1]}` : "With: "}
              sharedWith="private"
          />
          <ContentEntry
              category="contact"
              mainText={contact? `${contact.phone}` : "Add contact information"}
              subText={contact? `${contact.phone.type}` : "Phone, email, IM"}
              sharedWith="friends"
          />
      </React.Fragment>
  );
}

export default overview;