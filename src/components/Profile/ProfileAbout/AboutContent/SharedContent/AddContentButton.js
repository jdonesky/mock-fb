

import React, {useState, useContext} from 'react';
import {connect} from 'react-redux'
import classes from './AddContentButton.css'
import Plus from '../../../../../assets/images/plus'
import EditWorkForm from "../EditContent/EditWorkForm";
import EditSchoolForm from "../EditContent/EditSchoolForm";
import EditLocationForm from "../EditContent/EditLocationForm";
import EditRelationshipForm from "../EditContent/EditRelationshipForm";
import EditPhoneForm from "../EditContent/EditPhoneForm"
import EditEmailForm from "../EditContent/EditEmailForm"
import EditGenderForm from "../EditContent/EditGenderForm";
import EditFamilyForm from "../EditContent/EditFamilyForm";
import {LifeEventContext} from "../../../../../context/life-event-context";
import * as actions from "../../../../../store/actions";

const addContentButton = props => {
    const [addingContent, setAddingContent] = useState(false);
    const lifeEventContext = useContext(LifeEventContext)

    const saveEdits = (fieldName, payload) => {
        props.onProfileUpdate(props.authToken, props.firebaseKey, fieldName, payload, 'add')
    }

    const toggleEditing = () => {
        setAddingContent((prevState) => {
            return !prevState
        })
    }

    let text;
    let editForm;
    switch (props.category) {
        case 'work':
            text = 'Add a workplace'
            editForm = <EditWorkForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'education':
            text = 'Add a school'
            editForm = <EditSchoolForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'currLocation':
            text = 'Add current location'
            editForm = <EditLocationForm locType="current" cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'pastLocation':
            text = "Add past location"
            editForm = <EditLocationForm locType="pastLocation" cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'hometown':
            text = 'Add hometown'
            editForm = <EditLocationForm locType="origin" cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'relationship':
            text = 'Add a relationship '
            editForm = <EditRelationshipForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'family':
            text = 'Add a family member'
            editForm = <EditFamilyForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'phone':
            text = 'Add a phone number'
            editForm = <EditPhoneForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'email':
            text = 'Add an email'
            editForm = <EditEmailForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'gender':
            text = 'Add your gender'
            editForm = <EditGenderForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'lifeEvent':
            text = 'Add a life event'
            break;
        default:
            text = null;
            editForm = null;
    }

    const addButton = (
        <div className={classes.AddButton} onClick={props.category === 'lifeEvent' ? lifeEventContext.toggleModal :toggleEditing}>
            <div className={classes.PlusIcon}>
                <Plus fill="#0B86DE" className={classes.Plus}/>
            </div>
            <span>{text}</span>
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

export default connect(mapStateToProps,mapDispatchToProps)(addContentButton);