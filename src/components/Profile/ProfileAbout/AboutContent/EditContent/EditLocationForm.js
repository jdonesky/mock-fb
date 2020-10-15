

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
    // let submitHandler;  <<<<<<< !

    switch (props.locType) {
        case "current":
            placeholder = "Current City/Town";
            value = currentLocation;
            changeHandler = setCurrentLocation;
            break;
        case "origin":
            placeholder = "Hometown";
            value = hometown;
            changeHandler = setHometown;
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

    const submitChangesHandler = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={submitChangesHandler} className={classes.EditForm}>
            {formInputs}
            <hr/>
            <div className={classes.Buttons}>
                <Button addClass="Neutral">Privacy</Button>
                <div className={classes.SubmitOrCancel}>
                    <Button addClass="Neutral" clicked={props.cancel}>Cancel</Button>
                    <Button addClass="Save">Save</Button>
                </div>
            </div>
        </form>
    )

}


export default editLocationForm;