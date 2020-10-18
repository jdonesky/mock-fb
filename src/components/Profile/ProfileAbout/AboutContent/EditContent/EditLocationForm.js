

import React, {useState} from 'react';
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import {fieldBuilder} from "../../../../../shared/utility";
import classes from './SharedEditFormUI.css'

const editLocationForm = (props) => {

    const [currentLocation, setCurrentLocation] = useState(props.currentLocation || '');
    const [hometown, setHometown] = useState(props.hometown || '');



    let placeholder;
    let value;
    let changeHandler;
    let fieldName;
    switch (props.locType) {
        case "current":
            placeholder = "City/Town";
            value = currentLocation;
            changeHandler = setCurrentLocation;
            fieldName = 'currLocations'
            break;
        case "origin":
            placeholder = "Hometown";
            value = hometown;
            changeHandler = setHometown;
            fieldName = 'hometown'
            break;
        default:
            placeholder = null;
    }

    const formFields = {
        location: fieldBuilder(
            "input",
            "text",
            placeholder,
            value,
            {required: true},
            false,
            false
        )
    }

    const updateInput = (event) => {
        changeHandler(event.target.value);
    }

    const saveChangesHandler = (event) => {
        event.preventDefault();
        const payload = {name: value}
        props.save(fieldName, payload)

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
            />
        )
    })

    return (
        <form onSubmit={saveChangesHandler} className={classes.EditForm}>
            {formInputs}
            <hr/>
            <div className={classes.Buttons}>
                <Button addClass="Neutral">Privacy</Button>
                <div className={classes.SubmitOrCancel}>
                    <Button addClass="Neutral" clicked={props.cancel} type="button">Cancel</Button>
                    <Button addClass="Save" type="submit">Save</Button>
                </div>
            </div>
        </form>
    )

}


export default editLocationForm;