

import React, {useState} from 'react';
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import {fieldBuilder} from "../../../../../shared/utility";
import classes from './SharedEditFormUI.css'

const editBirthdayForm = (props) => {

    const [birthday, setBirthday] = useState(props.birthday || '');

    const formFields = {
        email: fieldBuilder(
            "input",
            "date",
            "Birthday",
            birthday,
            {required: true},
            false,
            null
        )
    }

    const updateInput = (event) => {
        setBirthday(event.target.value)
    }

    const submitChangesHandler = (event) => {
        event.preventDefault();
        props.save('birthday', birthday)
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
                changed={(event) => updateInput(event)}
            />
        )
    })

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


export default editBirthdayForm;