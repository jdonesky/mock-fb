

import React, {useState} from 'react';
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import {fieldBuilder} from "../../../../../shared/utility";
import classes from './SharedEditFormUI.css'

const editWorkForm = (props) => {

    const [location, setLocation] = useState(props.location || '');

    let placeholder;
    switch (props.locType) {
        case "current":
            placeholder = "Current City/Town"
            break;
        case "origin":
            placeholder = "Hometown"
            break
        default:
    }

    const formFields = {
        location: fieldBuilder(
            "input",
            "text",
            placeholder,
            location,
            {required: true},
            false,
            false
        )
    }

    const updateInput = (event) => {
       setLocation(event.target.value)
    }

    const formInputs = Object.keys(formFields).map(key => {
        return (
            <Input
                key={key}
                elementType={formFields[key].elementType}
                type={formFields[key].elementConfig.type}
                placeholder={formFields[key].elementConfig.placeholder}
                rows={formFields[key].elementConfig.rows}
                cols={formFields[key].elementConfig.cols}
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


export default editWorkForm;