

import React, {useState} from 'react';
import {connect} from 'react-redux'
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import {fieldBuilder} from "../../../../../shared/utility";
import classes from './SharedEditFormUI.css'

const editLocationForm = (props) => {

    const [currentLocation, setCurrentLocation] = useState(props.currLocation || '');
    const [pastLocation, setPastLocation] = useState(props.pastLocations || '')
    const [hometown, setHometown] = useState(props.hometown || '');
    const [moveDate, setMoveDate] = useState('')

    const { birthday } = props
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(birthday).getFullYear()
    const moveYearArray = Array(currentYear-birthYear+1).fill().map((_,idx) => (currentYear - idx).toString())
    const moveYearOptions = moveYearArray.map(date => ({value:date,label:date}))
    moveYearOptions.unshift({label: 'Year'})

    let placeholder;
    let value;
    let changeHandler;
    let fieldName;
    let payload;
    switch (props.locType) {
        case "current":
            placeholder = "City/Town";
            value = currentLocation;
            changeHandler = setCurrentLocation;
            fieldName = 'currLocation'
            payload = {name: value}
            break;
        case "pastLocation":
            placeholder = "City/Town";
            value = pastLocation;
            changeHandler = setPastLocation;
            fieldName = 'pastLocations'
            payload = {name: value, moveDate: moveDate}
            break;
        case "origin":
            placeholder = "Hometown";
            value = hometown;
            changeHandler = setHometown;
            fieldName = 'hometown'
            payload = {name: value}
            break;
        default:
            placeholder = null;
    }

    const formFields = {
        location: fieldBuilder(
            "input",
            "text",
            placeholder,
            value,
            {required: true},
            false,
            false
        ),
        moveDate: fieldBuilder(
            "select",
            null,
            null,
            moveDate,
            null,
            true,
            null,
            null,
            moveYearOptions,
            "start",
            "Moved in"
        )
    }

    const updateInput = (event,key) => {
        switch (key) {
            case 'location':
                changeHandler(event.target.value);
                break;
            case 'moveDate':
                setMoveDate(event.target.value);
                break;
            default:
                console.log('oops')
        }
    }

    const saveChangesHandler = (event) => {
        event.preventDefault();
        props.save(fieldName, payload)
    }

    const formInputs = Object.keys(formFields).map(key => {
        if (props.locType !== 'pastLocation') {
            if (key === 'moveDate') {
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

    return (
        <form onSubmit={saveChangesHandler} className={classes.EditForm}>
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

export default connect(mapStateToProps)(editLocationForm);