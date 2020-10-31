

import React from 'react';
import classes from './Date.css'
import Input from '../../../Input/Input'
import {connect} from 'react-redux'
import {fieldBuilder} from "../../../../../shared/utility";

const dateForm = ({birthday, update, values, year, month, day}) => {

    const currentYear = new Date().getFullYear();
    const birthYear = new Date(birthday).getFullYear()
    const yearArray = Array(currentYear-birthYear+1).fill().map((_,idx) => (currentYear - idx).toString())
    const yearOptions = yearArray.map(date => ({value:date,label:date}))
    yearOptions.unshift({label: 'Year'})

    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const monthOptions = monthArray.map(month => ({value: month, label: month}))
    monthOptions.unshift({label: 'Month'})

    const dayOptions = [...Array(31).keys()].map(day => ({value:day, label: day}))

    let adjustedDayOptions;
    if (values['month'] === 'February') {
        adjustedDayOptions = dayOptions.slice(1,29)
    } else if (values['month'] === 'April' || values['month'] === 'June' || values['month'] === 'September' || values['month'] === 'November') {
        adjustedDayOptions = dayOptions.slice(1,31)
    } else {
        adjustedDayOptions = dayOptions.slice(1)
    }
    adjustedDayOptions.unshift({label:'Day'})

    const updateInput = (field, event) => {
        update(field, event.target.value)
    }

    const fields = {
        year: fieldBuilder('select',null,null, values['year'] || year, null,true,false,false, yearOptions),
        month: fieldBuilder('select',null,null, values['month'] || month, null,true,false,false, monthOptions),
        day: fieldBuilder('select',null,null,values['day'] || day, null,true,false,false, adjustedDayOptions)
    }

    const inputs = Object.keys(fields).map(key => (
        <Input
            elementType={fields[key].elementType}
            value={fields[key].value}
            changed={(event) => updateInput(key, event)}
            options={fields[key].options}
            className={key === 'day' || key === 'year' ? classes.ShortInput : classes.LongInput }
        />
    ))


    return (
        <div className={classes.Container}>
            {inputs}
        </div>
    );

}

const mapStateToProps = state => {
    return {
        birthday: state.profile.birthday
    }
}

export default connect(mapStateToProps)(dateForm);