

import React, {useState} from 'react';
import {connect} from 'react-redux'
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import {fieldBuilder} from "../../../../../shared/utility";
import formClasses from "./EditRelationshipForm.css"
import sharedClasses from './SharedEditFormUI.css'

const editRelationshipForm = (props) => {

    const [name, setName] = useState(props.name|| '');
    const [relationship, setRelationship] = useState(props.relationship || '');


    const relationshipOptions = ['Mother', 'Father','Daughter','Son ','Sister', 'Brother','Aunt','Uncle','Niece','Nephew','Cousin (Male)', 'Cousin (Female)', 'Grandmother','Grandfather','Granddaughter','Grandson', 'Stepsister','Stepbrother','Stepfather','Stepmother','Sister-in-law','Brother-in-law','Mother-in-law','Father-in-law','Pet']
        .map(option => ({value:option, label: option}))
    relationshipOptions.unshift({label: 'Relationship'})


    const formFields = {
        name: fieldBuilder(
            "input",
            "text",
            "Family Member's Name",
            name,
            {required:true},
            true,
        ),
        relationship: fieldBuilder(
            "select",
            null,
            null,
            relationship,
            {required: true},
            false,
            false,
            null,
            relationshipOptions,
            null,
            null
        ),
    }

    const updateInput = (event, key) => {
        switch (key) {
            case "name":
                setName(event.target.value)
                break;
            case "relationship":
                setRelationship(event.target.value)
                break;
            default:
                throw new Error("Oops, shouldn't be here")
        }
    }

    const formInputs = Object.keys(formFields).map(key => {
        return (
            <Input
                key={key}
                elementType={formFields[key].elementType}
                type={formFields[key].elementConfig.type}
                placeholder={formFields[key].elementConfig.placeholder}
                value={formFields[key].value}
                validation={formFields[key].validation}
                invalid={!formFields[key].valid}
                touched={formFields[key].touched}
                changed={(event) => updateInput(event,key)}
                options={formFields[key].options}
                extra={formFields[key].extra}
                header={formFields[key].header}
            />
        )
    })

    const saveChangesHandler = (event) => {
        event.preventDefault();
        const payload = {
            name: name,
            relationship: relationship
        }
        props.save('family', payload)
    }

    return (
        <form onSubmit={saveChangesHandler} className={sharedClasses.EditForm}>
            {formInputs}
            <hr/>
            <div className={sharedClasses.Buttons}>
                <Button addClass="Neutral">Privacy</Button>
                <div className={sharedClasses.SubmitOrCancel}>
                    <Button addClass="Neutral" clicked={props.cancel} type="button">Cancel</Button>
                    <Button addClass="Save" type="submit">Save</Button>
                </div>
            </div>
        </form>
    )

}

const mapStateToProps = state => {
    return {
        birthday: state.profile.birthday
    }
}


export default connect(mapStateToProps)(editRelationshipForm);