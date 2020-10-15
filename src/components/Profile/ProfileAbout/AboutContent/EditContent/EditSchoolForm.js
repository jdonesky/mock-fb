
import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import {fieldBuilder} from "../../../../../shared/utility";
import classes from './SharedEditFormUI.css'

const editSchoolForm = (props) => {

    const [school, setSchool] = useState(props.school || '');
    const [startYear, setStartYear] = useState(props.startYear || '');
    const [startMonth, setStartMonth] = useState(props.startMonth || '');
    const [endYear, setEndYear] = useState(props.endYear || '');
    const [endMonth, setEndMonth] = useState(props.endMonth || '');
    const [graduated, setGraduated] = useState(false);
    const [description, setDescription] = useState(props.description || '');

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

    const startMonthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const startMonthOptions = startMonthArray.map(month => ({value: month, label: month}))
    const endMonthOptions = startYear && startMonth && startYear === endYear ?
        startMonthOptions.slice(startMonthOptions.findIndex(option => option.value === startMonth )) : startMonthOptions.slice()
    startMonthOptions.unshift({label:'Month'})
    endMonthOptions.unshift({label:'Month'})

    const formFields = {
        school: fieldBuilder(
            "input",
            "text",
            "School",
            school,
            {required: true},
            false,
            false
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
            "start"
        ),
        startMonth: fieldBuilder(
            "select",
            null,
            null,
            startMonth,
            null,
            true,
            null,
            null,
            startMonthOptions,
            'break'
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
        ),
        endMonth: fieldBuilder(
            "select",
            null,
            "End Date",
            endMonth,
            null,
            true,
            null,
            null,
            endMonthOptions,
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
            case "startYear":
                setStartYear(event.target.value)
                break;
            case "startMonth":
                setStartMonth(event.target.value)
                break;
            case "endYear":
                setEndYear(event.target.value)
                break;
            case "endMonth":
                setEndMonth(event.target.value)
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
                extra={formFields[key].extra}
                header={formFields[key].header}
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