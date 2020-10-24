

import React from 'react';
import {connect} from 'react-redux'
import ContentEntry from "../SharedContent/ContentEntry";
import AddContentButton from '../SharedContent/AddContentButton'
import sharedClasses from './SharedLoadedContentUI.css'
import {convertDate} from "../../../../../shared/utility";

const contactAndBasicInfo = ({contacts,birthday,language,religion,politics,orientation,gender}) => {

    const emailEntry = contacts && contacts.email ? (
        <ContentEntry
            category="email"
            mainText={`${contacts.email}`}
            sharedWith={contacts.email.privacy || 'public'}
            content={contacts}
        />
    ) : <AddContentButton category="email"/>

    const phoneEntry = contacts && contacts.phone ? (
        <ContentEntry
            category="phone"
            mainText={ contacts && contacts.phone && contacts.phone}
            sharedWith={contacts ? contacts.phone.privacy : "public"}
            content={contacts}
        />
    ) : <AddContentButton category="phone" />

    const convertedBDay = birthday && convertDate(birthday);

    const birthDayEntry = (
        <ContentEntry
            category="birthday"
            mainText={ birthday && `${convertedBDay[0]} ${convertedBDay[1]}, ${convertedBDay[2]}`}
            subText='Birth Date'
            sharedWith={birthday ? birthday.privacy : "public"}
            content={birthday}
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
        />
    ) : <AddContentButton category="gender" />

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
        contacts: state.profile.contacts,
        birthday: state.profile.birthday,
        language: state.profile.language,
        religion: state.profile.religion,
        politics: state.profile.politics,
        gender: state.profile.gender,
        orientation: state.profile.orientation
    }
}

export default connect(mapStateToProps)(contactAndBasicInfo);