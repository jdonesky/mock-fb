

import React, {useState} from 'react';
import {connect} from "react-redux";
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import {fieldBuilder} from "../../../../../shared/utility";
import classes from './SharedEditFormUI.css'

const editWorkForm = (props) => {

    const [company, setCompany] = useState(props.company || '');
    const [position, setPosition] = useState(props.position || '');
    const [location, setLocation] = useState(props.location || '');
    const [description, setDescription] = useState(props.description || '');
    const [currentEmployer, setCurrentEmployer] = useState(props.currentEmployer || '');
    const [startYear, setStartYear] = useState(props.startYear || '');
    const [endYear, setEndYear] = useState(props.endYear || '');

    const { birthday } = props
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(birthday).getFullYear()
    const startYearArray = Array(currentYear-birthYear+1).fill().map((_,idx) => (currentYear - idx).toString())
    const startYearOptions = startYearArray.map(date => ({value:date,label:date}))
    const endYearOptions = startYear ?
        startYearOptions.slice(0, startYearOptions.findIndex(option => option.value === startYear)+1)
        : startYearOptions.slice()
    startYearOptions.unshift({label: 'Year'})
    endYearOptions.unshift({label: 'Year'})

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
            "textarea",
            "text",
            "Description",
            description,
            null,
            true,
            null
        ),
        currentEmployer: fieldBuilder(
            "checkbox",
            "checkbox",
            null,
            currentEmployer,
            null,
            true,
            null,
            "I currently work here"
        ),
        startYear: fieldBuilder(
            "select",
            null,
            null,
            startYear,
            null,
            true,
            null,
            null,
            startYearOptions,
            currentEmployer ? "start" : 'break',
            currentEmployer ? "Since" : 'to',
        ),
        endYear: fieldBuilder(
            "select",
            null,
            null,
            endYear,
            null,
            true,
            null,
            null,
            endYearOptions,
        )
    }

    const updateInput = (event, key) => {
        switch (key) {
            case "company":
                setCompany(event.target.value);
                break;
            case "position":
                setPosition(event.target.value);
                break;
            case "location":
                setLocation(event.target.value);
                break;
            case "description":
                setDescription(event.target.value);
                break;
            case "currentEmployer":
                setCurrentEmployer(event.target.checked);
                break;
            case "startYear":
                setStartYear(event.target.value);
                break;
            case "endYear":
                setEndYear(event.target.value);
                break;
            default:
                throw new Error("Oops, shouldn't be here")
        }
    }

    const formInputs = Object.keys(formFields).map(key => {
        if (currentEmployer) {
            if (key === 'endYear') {
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
                label={formFields[key].label}
                options={formFields[key].options}
                header={formFields[key].header}
                extra={formFields[key].extra}
            />
        )
    })

    const saveChangesHandler = (event) => {
        event.preventDefault();
        const payload = {
            company: company,
            position: position,
            location: location,
            description: description,
            currentEmployer: currentEmployer,
            startYear: startYear,
            endYear: endYear
        }
        props.save('occupations',payload)
    }

    return (
        <form onSubmit={saveChangesHandler} >
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


const mapStateToProps = state => {
    return {
        birthday: state.profile.birthday
    }
}


export default connect(mapStateToProps)(editWorkForm);