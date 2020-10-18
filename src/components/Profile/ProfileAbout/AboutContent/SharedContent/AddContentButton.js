

import React, {useState} from 'react';
import classes from './AddContentButton.css'
import Plus from '../../../../../assets/images/plus'
import EditWorkForm from "../EditContent/EditWorkForm";
import EditSchoolForm from "../EditContent/EditSchoolForm";
import EditLocationForm from "../EditContent/EditLocationForm";
import EditRelationshipForm from "../EditContent/EditRelationshipForm";
import EditContactForm from "../EditContent/EditContactForm";

const addContentButton = props => {
    const [addingContent, setAddingContent] = useState(false);

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
            text = 'workplace'
            editForm = <EditWorkForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'education':
            text = 'school'
            editForm = <EditSchoolForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'currLocation':

            text = 'current location'
            editForm = <EditLocationForm locType="current" cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'fromLocation':
            editForm = <EditLocationForm locType="origin" cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'relationship':
            editForm = <EditRelationshipForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'contact':
            text = 'contact information'
            editForm = <EditContactForm cancel={toggleEditing} save={saveEdits}/>
            break;
        default:
            text = null;
            editForm = null;
    }

    const addButton = (
        <div className={classes.AddButton} onClick={toggleEditing}>
            <div className={classes.PlusIcon}>
                <Plus fill="#0B86DE" className={classes.Plus}/>
            </div>
            <span>{props.text}</span>
        </div>
    )

    let content = addingContent ? editForm : addButton;
    return content ;
}

export default addContentButton;