
import React from 'react';
import Input from '../../../Input/Input'

const workEvent = ({update, values}) => {

    const updateWorkPlace = (event) => {
        update('workplace', event.target.value)
    }

    const workPlaceInput = (
        <Input
            elementType="input"
            type="text"
            value={values['workplace'] || ''}
            valid={true}
            touched={false}
            placeholder="Workplace"
            changed={(event) => updateWorkPlace(event)}
        />
    );

    return (
        <React.Fragment>
            {workPlaceInput}
        </React.Fragment>
    );
}

export default workEvent;