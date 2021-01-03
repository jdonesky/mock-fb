
import React, {useContext} from 'react';
import {connect} from 'react-redux';
import Button from '../../../UI/Button/Button'
import classes from './Intro.css'
import entryClasses from '../../../UI/Modal/EditModals/EditProfile/BaseForm/BaseForm.css'
import {EditProfileContext} from "../../../../context/edit-profile-context";
import House from "../../../../assets/images/home";
import Briefcase from "../../../../assets/images/briefcase";
import GraduationCap from "../../../../assets/images/graduation-cap";
import Pin from "../../../../assets/images/Pin";
import Heart from "../../../../assets/images/heart";

const intro = (props) => {

    const editProfileContext = useContext(EditProfileContext);

    const startEditingDetails = () => {
        console.log('clicked')
        editProfileContext.toggleModalContent('INTRO')
        editProfileContext.openEditModal()
    }

    let profile;
    let editButtons;
    let currLocationIntro;
    let workplaceIntro;
    let schoolIntro;
    let hometownIntro;
    let relationshipIntro;

    if (props.displayProfile === 'me') {
        editButtons = (
            <div className={classes.Buttons}>
                <Button addClass="Neutral" clicked={startEditingDetails}>Edit Details</Button>
                {/*<Button addClass="Neutral">Add Hobbies</Button>*/}
                {/*<Button addClass="Neutral">Edit Featured</Button>*/}
            </div>
        )
        profile = {
            currentLocation: props.currentLocation,
            occupations: props.occupations,
            education: props.education,
            hometown: props.hometown,
            relationships: props.relationships
        }
    } else if (props.displayProfile !== 'me') {
        if (props.otherProfile) {
            profile = {
                currentLocation: props.otherProfile.currLocation,
                occupations: props.otherProfile.occupations,
                education: props.otherProfile.education,
                hometown: props.otherProfile.hometown,
                relationships: props.otherProfile.relationships
            }
        }
    }

    if (profile) {
        if (profile.currentLocation && profile.currentLocation.introItem) {
            currLocationIntro = (
                <div className={entryClasses.IntroEntry}>
                    <div className={entryClasses.IntroIcon}><House fill="rgba(0,0,0,0.4)"/></div>
                    <span className={entryClasses.FilledEntry}>{`Lives in ${profile.currentLocation.name}`}</span>
                </div>
            )
        }

        if (profile.occupations && profile.occupations.filter(occupation => occupation.introItem).length !== 0) {
            workplaceIntro = (
                <div className={entryClasses.IntroEntry}>
                    <div className={[entryClasses.IntroIcon, entryClasses.Briefcase].join(" ")}><Briefcase
                        fill="rgba(0,0,0,0.4)"/></div>
                    <span
                        className={entryClasses.FilledEntry}>{`${profile.occupations.find(occupation => occupation.introItem).position} at ${profile.occupations.find(occupation => occupation.introItem).company}`}</span>
                </div>)
        }

        if (profile.education && profile.education.filter(school => school.introItem).length !== 0) {
            schoolIntro = (
                <div className={entryClasses.IntroEntry}>
                    <div className={[entryClasses.IntroIcon, entryClasses.GradCap].join(" ")}><GraduationCap fill="rgba(0,0,0,0.4)"/></div>
                    <span className={entryClasses.FilledEntry}>{profile.education.find(school => school.introItem).school}</span>
                </div>
            )
        }

        if (profile.hometown && profile.hometown.introItem) {
            hometownIntro = (
                <div className={entryClasses.IntroEntry}>
                    <div className={entryClasses.IntroIcon}><Pin fill="rgba(0,0,0,0.4)"/></div>
                    <span className={entryClasses.FilledEntry}>{`From ${profile.hometown.name}`}</span>
                </div>
            )

        }

        if (profile.relationships && profile.relationships.filter(relationship => relationship.introItem).length !== 0) {
            relationshipIntro = (
                <div className={entryClasses.IntroEntry}>
                    <div className={entryClasses.IntroIcon}><Heart fill="rgba(0,0,0,0.4)"/></div>
                    <span
                        className={entryClasses.FilledEntry}>{profile.relationships && profile.relationships.find(relationship => relationship.introItem).status}</span>
                </div>
            )
        }
    }

    return (
        <div className={classes.Container}>
            <h2>Intro</h2>
            <section className={classes.EntriesSection}>
                {hometownIntro}
                {currLocationIntro}
                {relationshipIntro}
                {workplaceIntro}
                {schoolIntro}
            </section>
            {editButtons}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        currLocation: state.profile.currLocation,
        occupations: state.profile.occupations,
        education: state.profile.education,
        hometown: state.profile.hometown,
        relationships: state.profile.relationships,
        otherProfile: state.users.fullProfile,
    }
}

export default connect(mapStateToProps)(intro);