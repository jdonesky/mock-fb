

import React, {useState} from 'react';
import Input from '../../../../UI/Input/Input'
import {fieldBuilder} from "../../../../../shared/utility";
import classes from './EditWorkForm.css'

const editWorkForm = (props) => {

    const [company, setCompany] = useState(props.company || '');
    const [position, setPosition] = useState(props.position || '');
    const [location, setLocation] = useState(props.location || '');
    const [description, setDescription] = useState(props.description || '');

    const formFields = {
        company: fieldBuilder(
            "input",
            "text",
            "Company",
            company,
            {required: true},
            false,
            false
        ),
        position: fieldBuilder(
            "input",
            "text",
            "Position",
            position,
            null,
            true,
            null
        ),
        location: fieldBuilder(
            "input",
            "text",
            "City/Town",
            location,
            null,
            true,
            null
        ),
        description: fieldBuilder(
            "textArea",
            "text",
            "Company",
            description,
            null,
            true,
            null
        )
    }

    const updateInput = (event, key) => {
        switch (key) {
            case "company":
                setCompany(event.target.value)
                break;
            case "position":
                setPosition(event.target.value)
                break;
            case "location":
                setLocation(event.target.value)
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
            <h2>TEST</h2>
            // <Input
            //     key={key}
            //     changed={(event) => updateInput(event,key)}
            // />
        )
    })

    return formInputs

}


export default editWorkForm;