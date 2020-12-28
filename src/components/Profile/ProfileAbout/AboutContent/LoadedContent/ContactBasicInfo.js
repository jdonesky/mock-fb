

import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";
import AddContentButton from '../SharedContent/AddContentButton'
import sharedClasses from './SharedLoadedContentUI.css'
import {convertDate} from "../../../../../shared/utility";

const contactAndBasicInfo = (props) => {

    const [displayProfile, setDisplayProfile] = useState(props.match.params.id);

    useEffect(() => {
        if (displayProfile !== props.match.params.id) {
            setDisplayProfile(props.match.params.id);
        }
    })

    const {myContacts, myBirthday, myGender, otherProfile} = props

    let contacts;
    let birthday;
    let gender;
    if (displayProfile === 'me') {
        contacts = myContacts
        birthday = myBirthday;
        gender = myGender;
    } else if (displayProfile !== 'me') {
        if (otherProfile) {
            contacts = otherProfile.contacts;
            birthday = otherProfile.birthday;
            gender = otherProfile.gender;
        }
    }

    const emailEntry = contacts && contacts.email ? (
        <ContentEntry
            category="email"
            mainText={`${contacts.email}`}
            sharedWith={contacts.email.privacy || 'public'}
            content={contacts}
            displayProfile={displayProfile}
        />
    ) : displayProfile === 'me' ? <AddContentButton category="email"/> : <span className={sharedClasses.Placeholder}>No email to show</span>

    const phoneEntry = contacts && contacts.phone ? (
        <ContentEntry
            category="phone"
            mainText={ contacts && contacts.phone && contacts.phone}
            sharedWith={contacts ? contacts.phone.privacy : "public"}
            content={contacts}
            displayProfile={displayProfile}
        />
    ) : displayProfile === 'me' ? <AddContentButton category="phone" /> : <span className={sharedClasses.Placeholder}>No phone number to show</span>

    const convertedBDay = birthday && convertDate(birthday);

    const birthDayEntry = (
        <ContentEntry
            category="birthday"
            mainText={ birthday && `${convertedBDay[0]} ${convertedBDay[1]}, ${convertedBDay[2]}`}
            subText='Birth Date'
            sharedWith={birthday ? birthday.privacy : "public"}
            content={birthday}
            displayProfile={displayProfile}
        />
    )

    const genderEntry = gender ? (
        <ContentEntry
            category="gender"
            mainText={gender && gender}
            subText='Gender'
            sharedWith={gender ? gender.privacy : "public"}
            extra={gender && gender}
            content={gender}
            displayProfile={displayProfile}
        />
    ) : displayProfile === 'me' ? <AddContentButton category="gender" /> : <span className={sharedClasses.Placeholder}>No gender to show</span>

    return (
        <React.Fragment>
            <section className={sharedClasses.SubCategory} style={{marginTop: '0'}}>
                <h3>Contact Info</h3>
                {phoneEntry}
                {emailEntry}
            </section>
            <section className={sharedClasses.SubCategory}>
                <h3>Basic Info</h3>
                {genderEntry}
                {birthDayEntry}
            </section>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        myContacts: state.profile.contacts,
        birthday: state.profile.birthday,
        language: state.profile.language,
        religion: state.profile.religion,
        politics: state.profile.politics,
        gender: state.profile.gender,
        orientation: state.profile.orientation,
        otherProfile: state.users.otherProfile
    }
}

export default connect(mapStateToProps)(withRouter(contactAndBasicInfo));