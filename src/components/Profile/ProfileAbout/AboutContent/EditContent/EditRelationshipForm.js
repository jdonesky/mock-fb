

import React, {useState} from 'react';
import {connect} from 'react-redux'
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import {fieldBuilder} from "../../../../../shared/utility";
import formClasses from "./EditRelationshipForm.css"
import sharedClasses from './SharedEditFormUI.css'

const editRelationshipForm = (props) => {

    const [status, setStatus] = useState(props.relationshipStatus || '');
    const [partner, setPartner] = useState(props.partner || '');
    const [start, setStart] = useState(props.relationshipStart || '');

    const statusOptions = ['Single', 'In a Relationship','Engaged','Married','In a civil union', 'In a domestic partnership','In an open relationship',"It's complicated",'Separated','Divorced','Widowed']
        .map(option => ({value:option, label: option}))
    statusOptions.unshift({label: 'Status'})

    const { birthday } = props
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(birthday).getFullYear()
    const startYearArray = Array(currentYear-birthYear+1).fill().map((_,idx) => (currentYear - idx).toString())
    const startYearOptions = startYearArray.map(date => ({value:date,label:date}))
    startYearOptions.unshift({label: 'Year'})

    const formFields = {
        status: fieldBuilder(
            "select",
            null,
            null,
            status,
            {required: true},
            false,
            false,
            null,
            statusOptions,
            null,
            null
        ),
        partner: fieldBuilder(
            "input",
            "text",
            "Partner",
            partner,
            null,
            true,
        ),
        start: fieldBuilder(
            "select",
            null,
            null,
            start,
            null,
            true,
            null,
            null,
            startYearOptions,
            "start",
            "Since"

        )
    }

    const updateInput = (event, key) => {
        switch (key) {
            case "status":
                setStatus(event.target.value)
                break;
            case "partner":
                setPartner(event.target.value)
                break;
            case "start":
                setStart(event.target.value)
                break;
            default:
                throw new Error("Oops, shouldn't be here")
        }
    }

    const formInputs = Object.keys(formFields).map(key => {
        if (status === 'Single') {
            if (key === 'partner' || key === 'start') {
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
        const payload = {
            status: status,
            partner: partner,
            started: start
        }
        props.save('relationships', payload)
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
        birthday: state.profile.birthday
    }
}


export default connect(mapStateToProps)(editRelationshipForm);