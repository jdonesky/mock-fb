
import React from 'react';
import Input from '../../../Input/Input'

const workEvent = ({update, values}) => {

    const updateWorkPlace = (event) => {
        update('workplace', event.target.value)
    }

    // const updateDescription = (event) => {
    //     update('description',event.target.value)
    // }

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

    // const descriptionInput = (
    //     <Input
    //         elementType="textarea"
    //         placeholder="Description"
    //         value={values['description'] || ''}
    //         changed={(event) => updateDescription(event)}
    //     />
    // );

    return (
        <React.Fragment>
            {workPlaceInput}
            {/*{descriptionInput}*/}
        </React.Fragment>
    );
}

export default workEvent;