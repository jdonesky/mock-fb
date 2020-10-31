
import React from 'react';
import classes from './SharedFormUI.css'
import Input from '../../../Input/Input'

const workEvent = ({update, values}) => {

    const updatePartner = (event) => {
        update('partner', event.target.value)
    }

    const partnerInput = (
        <Input
            elementType="input"
            type="text"
            value={values['partner'] || ''}
            valid={true}
            touched={false}
            placeholder="Partner (optional)"
            changed={(event) => updatePartner(event)}
        />
    );
    const partnerCaption = <div className={classes.Caption}>{"Partner will get a notification that you tagged them in your relationship status. Their name won't be added to your profile unless they approve this tag."}</div>

    return (
        <React.Fragment>
            {partnerInput}
            {partnerCaption}
        </React.Fragment>
    );
}

export default workEvent;