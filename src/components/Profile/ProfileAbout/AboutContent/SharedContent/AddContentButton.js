

import React, {useState, useContext} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux'
import classes from './AddContentButton.css'
import Plus from '../../../../../assets/images/MiscIcons/plus';
import EditWorkForm from "../EditContent/EditWorkForm";
import EditSchoolForm from "../EditContent/EditSchoolForm";
import EditLocationForm from "../EditContent/EditLocationForm";
import EditRelationshipForm from "../EditContent/EditRelationshipForm";
import EditPhoneForm from "../EditContent/EditPhoneForm"
import EditEmailForm from "../EditContent/EditEmailForm"
import EditGenderForm from "../EditContent/EditGenderForm";
import EditFamilyForm from "../EditContent/EditFamilyForm";
import {LifeEventContext} from "../../../../../context/life-event-context";
import {EditProfileContext} from "../../../../../context/edit-profile-context";
import * as actions from "../../../../../store/actions";

const addContentButton = props => {

    const [addingContent, setAddingContent] = useState(false);
    const editProfileContext = useContext(EditProfileContext)
    const lifeEventContext = useContext(LifeEventContext)

    const saveEdits = (fieldName, payload) => {
        props.onProfileUpdate(props.authToken, props.firebaseKey, fieldName, payload, 'add')
    }

    const toggleEditing = () => {
        setAddingContent((prevState) => {
            return !prevState
        })
    }

    const navToAboutForm = (path) => {
        props.history.push(`/user-profile/me/about/${path}`)
        editProfileContext.closeEditModal()
        editProfileContext.toggleModalContent('BASE')
    }

    let text;
    let editForm;
    let path;
    switch (props.category) {
        case 'work':
            text = 'Add a workplace'
            editForm = <EditWorkForm cancel={toggleEditing} save={saveEdits}/>
            path = 'work-education'
            break;
        case 'education':
            text = 'Add a school'
            editForm = <EditSchoolForm cancel={toggleEditing} save={saveEdits}/>
            path = 'work-education'
            break;
        case 'currLocation':
            text = 'Add current location'
            editForm = <EditLocationForm locType="current" cancel={toggleEditing} save={saveEdits}/>
            path = 'places-lived'
            break;
        case 'pastLocation':
            text = "Add past location"
            editForm = <EditLocationForm locType="pastLocation" cancel={toggleEditing} save={saveEdits}/>
            path = 'places-lived'
            break;
        case 'hometown':
            text = 'Add hometown'
            editForm = <EditLocationForm locType="origin" cancel={toggleEditing} save={saveEdits}/>
            path = 'places-lived'
            break;
        case 'relationship':
            text = 'Add a relationship '
            editForm = <EditRelationshipForm cancel={toggleEditing} save={saveEdits}/>
            path = 'family-relationships'
            break;
        case 'family':
            text = 'Add a family member'
            editForm = <EditFamilyForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'phone':
            text = 'Add a phone number'
            editForm = <EditPhoneForm cancel={toggleEditing} save={saveEdits}/>
            path = 'contact-info'
            break;
        case 'email':
            text = 'Add an email'
            editForm = <EditEmailForm cancel={toggleEditing} save={saveEdits}/>
            path = 'contact-info'
            break;
        case 'gender':
            text = 'Add your gender'
            editForm = <EditGenderForm cancel={toggleEditing} save={saveEdits}/>
            path = 'contact-info'
            break;
        case 'lifeEvent':
            text = 'Add a life event'
            path = 'life-events'
            break;
        default:
            text = null;
            editForm = null;
    }

    let action;
    if (props.actionType === 'NAV') {
        action = () => navToAboutForm(path);
    } else {
        if (props.category === 'lifeEvent') {
            action = lifeEventContext.toggleModal
        } else {
            action = toggleEditing
        }
    }

    const addButton = (
        <div className={classes.AddButton} onClick={action}>
            <div className={classes.PlusIcon}>
                <Plus fill="#0B86DE" className={classes.Plus}/>
            </div>
            <span className={classes.AddButtonText} style={{lineHeight: props.textLineHeight || null}}>{text}</span>
        </div>
    )

    let content = addingContent ? editForm : addButton;
    return content ;
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (authToken, firebaseKey, fieldName, payload, how) => dispatch(actions.updateProfileAttempt(authToken, firebaseKey, fieldName, payload, how))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(addContentButton));