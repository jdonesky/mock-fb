
import React from 'react';
import classes from './SharedFormUI.css'
import Input from '../../../Input/Input'

const schoolEvent = ({update, values}) => {

    const schoolTypeOptions = ['High School','College']
        .map(type => ({label: type, value: type}))
    schoolTypeOptions.unshift({label:'School Type'})

    const updateSchoolType = (event) => {
        update('schoolType', event.target.value)
    }

    const updateSchool = (event) => {
        update('school', event.target.value)
    }

    const schoolTypeInput = (
        <Input
            elementType="select"
            value={values['schoolType'] || ''}
            changed={(event) => updateSchoolType(event)}
            options={schoolTypeOptions}
            className={classes.SchoolType}
        />
    );

    const schoolInput = (
        <Input
            elementType="input"
            type="text"
            value={values['school'] || ''}
            valid={true}
            touched={false}
            placeholder="School"
            changed={(event) => updateSchool(event)}
        />
    );

    return (
        <div className={classes.SchoolInputs}>
            {schoolTypeInput}
            {schoolInput}
        </div>
    );
}

export default schoolEvent;