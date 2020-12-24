
import React, {useState, useContext} from 'react';
import {connect} from 'react-redux';
import classes from './EditLocationForm.css';
import sharedClasses from '../Shared.css';
import {PageContext} from "../../../../../../context/page-context";
import Input from '../../../../Input/Input';
import Map from '../../../../../Map/Map';

import LocationArrow from '../../../../../../assets/images/MiscIcons/locationArrow';

const editLocationForm = props => {

    const pageContext = useContext(PageContext);
    const [address, setAddress] = useState(ownedPage && ownedPage.location ? ownedPage.location.address : null);
    const [city, setCity] = useState(ownedPage && ownedPage.location ? ownedPage.location.city : null);
    const [zip, setZip] = useState(ownedPage && ownedPage.location ? ownedPage.location.zip : null);

    const {ownedPage} = props

    let pageName;
    if (ownedPage) {
        pageName = ownedPage.name + "'s"
    } else {
        pageName = 'your'
    }

    const updateField = (event, field) => {
        switch (field) {
            case 'ADDRESS':
                setAddress(event.target.value);
                break;
            case 'CITY':
                setCity(event.target.value);
                break;
            case 'ZIP':
                setZip(event.target.value);
                break;
        }
    }

    const addressInput = (
        <Input
            elementType='input'
            type='text'
            placeholder='Address'
            value={address}
            onChange={(event) => updateField(event,'ADDRESS')}
        />
    )

    const cityInput = (
        <Input
            elementType='input'
            type='text'
            placeholder='City'
            value={city}
            onChange={(event) => updateField(event,'CITY')}
            width="46%"
        />
    )

    const zipInput = (
        <Input
            elementType='input'
            type='text'
            placeholder='Zip code'
            value={zip}
            onChange={(event) => updateField(event,'ZIP')}
            inputMode="numeric"
            pattern="[0-9]*"
            width="46%"
        />
    )



    return (
        <section className={sharedClasses.FormContainer}>
            <section className={sharedClasses.Header}>
                <div className={sharedClasses.CategoryIcon}><LocationArrow /></div>
                <div className={sharedClasses.HeaderCaptionBlock}>
                    <div className={sharedClasses.EditingCaption}>Editing...</div>
                    <div className={sharedClasses.CaptionQuestion}>
                        {`What is ${pageName} location?`}
                    </div>
                </div>
            </section>
            <section className={classes.Form}>
                {addressInput}
                <div className={classes.CityAndZip}>
                    {cityInput}
                    {zipInput}
                </div>
            </section>
            <section className={classes.MapContainer}>
                <Map />
            </section>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        ownedPage: state.pages.ownedPage
    }
}

export default connect(mapStateToProps)(editLocationForm);