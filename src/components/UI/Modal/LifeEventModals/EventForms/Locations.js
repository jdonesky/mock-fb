
import React from 'react';
import Input from '../../../Input/Input'

const locationEvent = ({update, values}) => {

    const updateLocation = (event) => {
        update("location", event.target.value)
    }

    const locationInput = (
        <Input
            elementType="input"
            type="text"
            value={values["location"] ? values['location'].name : ''}
            valid={true}
            touched={false}
            placeholder="Location"
            changed={(event) => updateLocation(event)}
        />
    );

    return (
        <React.Fragment>
            {locationInput}
        </React.Fragment>
    );
}

export default locationEvent;