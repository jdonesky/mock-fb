

import React, {useState} from 'react';
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import {fieldBuilder} from "../../../../../shared/utility";
import classes from './SharedEditFormUI.css'

const editWorkForm = (props) => {

    const [school, setSchool] = useState(props.school || '');
    const [startDate, setStartDate] = useState(props.startDate || '');
    const [endDate, setEndDate] = useState(props.endDate || '');
    const [graduated, setGraduated] = useState(false);
    const [description, setDescription] = useState(props.description || '');

    const formFields = {
        school: fieldBuilder(
            "input",
            "text",
            "School",
            school,
            {required: true},
            false,
            false,
            null
        ),
        startDate: fieldBuilder(
            "input",
            "text",
            "Start Date",
             startDate,
            null,
            true,
            null,
        ),
        endDate: fieldBuilder(
            "input",
            "text",
            "End Date",
            endDate,
            null,
            true,
            null,
        ),
        graduated: fieldBuilder(
            "checkbox",
            "checkbox",
            null,
            graduated,
            null,
            true,
            null,
            "Graduated"
        ),
        description: fieldBuilder(
            "textarea",
            "text",
            "Description",
            description,
            null,
            true,
            null
        )
    }

    const updateInput = (event, key) => {
        switch (key) {
            case "school":
                setSchool(event.target.value)
                break;
            case "startDate":
                setStartDate(event.target.value)
                break;
            case "endDate":
                setEndDate(event.target.value)
                break;
            case "graduated":
                setGraduated(event.target.checked);
                break;
            case "description":
                setDescription(event.target.value)
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
                label={formFields[key].label}
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