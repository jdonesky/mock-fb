

import React, {useState} from 'react';
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import {fieldBuilder} from "../../../../../shared/utility";
import classes from './SharedEditFormUI.css'

const editContactForm = (props) => {

    const [phone, setPhone] = useState(props.phone || '');
    const [email, setEmail] = useState(props.email || '');
    const [instagram, setInstagram] = useState(props.instagram || '');
    const [twitter, setTwitter] = useState(props.twitter || '');

    const formFields = {
        phone: fieldBuilder(
            "input",
            "tel",
            "(888)-888-8888",
            phone,
            {required: true},
            false,
            false
        ),
        email: fieldBuilder(
            "input",
            "text",
            "Email",
            email,
            {required:false, isEmail:true},
            true,
            null
        ),
        instagram: fieldBuilder(
            "input",
            "text",
            "@instagram",
            instagram,
            null,
            true,
            null
        ),
        twitter: fieldBuilder(
            "input",
            "text",
            "@twitter",
            twitter,
            null,
            true,
            null
        )
    }

    const updateInput = (event, key) => {
        switch (key) {
            case "phone":
                setPhone(event.target.value)
                break;
            case "email":
                setEmail(event.target.value)
                break;
            case "instagram":
                setInstagram(event.target.value)
                break;
            case "twitter":
                setTwitter(event.target.value)
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


export default editContactForm;