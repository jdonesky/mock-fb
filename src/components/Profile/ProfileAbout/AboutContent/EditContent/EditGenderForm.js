

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import {fieldBuilder} from "../../../../../shared/utility";
import formClasses from "./EditRelationshipForm.css"
import sharedClasses from './SharedEditFormUI.css'

const editGenderForm = (props) => {

    const [gender, setGender] = useState('');
    const [custom, setCustom] = useState('')

    const genderOptions = ['Male', 'Female','Custom']
        .map(option => ({value:option, label: option}))
    genderOptions.unshift({label: 'Gender'})


    const formFields = {
        gender: fieldBuilder(
            "select",
            null,
            null,
            gender,
            {required: true},
            false,
            false,
            null,
            genderOptions,
            null,
            null
        ),
        custom: fieldBuilder(
            "input",
            "text",
            "",
            custom,
            null,
            true,
        )
    }

    const updateInput = (event, key) => {
        switch (key) {
            case "gender":
                setGender(event.target.value)
                break;
            case "custom":
                setCustom(event.target.value)
                break;
            default:
                throw new Error("Oops, shouldn't be here")
        }
    }

    const formInputs = Object.keys(formFields).map(key => {
        if (gender === 'Male' || gender === 'Female' || gender !== 'Custom') {
            if (key === 'custom') {
                return null;
            }
        }
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
        const payload = custom ? custom : gender;
        props.save('gender', payload)
    }

    return (
        <form onSubmit={saveChangesHandler} className={formClasses.Form}>
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
        gender: state.profile.gender
    }
}


export default connect(mapStateToProps)(editGenderForm);