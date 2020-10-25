

import React, {useState} from 'react';
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import {fieldBuilder} from "../../../../../shared/utility";
import classes from './SharedEditFormUI.css'

const editEmailForm = (props) => {

    const [email, setEmail] = useState(props.email || '');

    const formFields = {
        email: fieldBuilder(
            "input",
            "text",
            "Email",
            email,
            {required:false, isEmail:true},
            true,
            null
        )
    }

    const updateInput = (event) => {
         setEmail(event.target.value)
    }

    const submitChangesHandler = (event) => {
        event.preventDefault();
        props.save('email', email)
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
                    <Button addClass="Neutral" clicked={props.cancel} type="button">Cancel</Button>
                    <Button addClass="Save" type="submit">Save</Button>
                </div>
            </div>
        </form>
    )

}


export default editEmailForm;