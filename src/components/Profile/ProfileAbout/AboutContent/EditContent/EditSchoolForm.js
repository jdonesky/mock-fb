
import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import {fieldBuilder} from "../../../../../shared/utility";
import classes from './SharedEditFormUI.css'

const editSchoolForm = (props) => {

    const [school, setSchool] = useState(props.school || '');
    const [startDate, setStartDate] = useState(props.startDate || '');
    const [endDate, setEndDate] = useState(props.endDate || '');
    const [graduated, setGraduated] = useState(false);
    const [description, setDescription] = useState(props.description || '');

    const { birthday } = props
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(birthday).getFullYear()
    const startDateArray = Array(currentYear-birthYear+1).fill().map((_,idx) => (currentYear - idx).toString())
    const startDateOptions = startDateArray.map(date => ({key: date,value:date,label:date}))

    const endDateOptions = startDate ?
        startDateOptions.slice(0, startDateOptions.findIndex(option => option.value === startDate)+1)
        : startDateOptions.slice()

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
            "select",
            null,
null,
             startDate,
            null,
            true,
            null,
            "Start Date",
            startDateOptions
        ),
        endDate: fieldBuilder(
            "select",
            null,
            "End Date",
            endDate,
            null,
            true,
            null,
            "End Date",
            endDateOptions
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
                options={formFields[key].options}
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

const mapStateToProps = state => {
    return {
        birthday: state.profile.birthday
    }
}


export default connect(mapStateToProps)(editSchoolForm);