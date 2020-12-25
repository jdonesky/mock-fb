
import React, {useState, useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import classes from './EditLocationForm.css';
import sharedClasses from '../Shared.css';
import {PageContext} from "../../../../../../context/page-context";
import Input from '../../../../Input/Input';
import Map from '../../../../../Map/Map';

import LocationArrow from '../../../../../../assets/images/MiscIcons/locationArrow';

const editLocationForm = props => {

    const pageContext = useContext(PageContext);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [formValid, setFormValid] = useState(false);

    const {ownedPage} = props

    useEffect(() => {
        if (ownedPage) {
            setAddress(ownedPage.location.address);
            setCity(ownedPage.location.city);
            setZip(ownedPage.location.zip);
        }
    }, [ownedPage])

    let pageName;
    if (ownedPage) {
        pageName = ownedPage.name + "'s"
    } else {
        pageName = 'your'
    }

    const validate = () => {
        setFormValid(address !== '' && city !== '' && zip !== '');
    }

    const saveEdits = () => {
        const newLocation = {address: address, city: city, zip: zip}
        pageContext.saveEdits('location', newLocation)
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
            default:
                return;
        }
        validate();
    }

    const addressInput = (
        <Input
            elementType='input'
            type='text'
            placeholder='Address'
            value={address}
            changed={(event) => updateField(event,'ADDRESS')}
        />
    )

    const cityInput = (
        <Input
            elementType='input'
            type='text'
            placeholder='City'
            value={city}
            changed={(event) => updateField(event,'CITY')}
            width="46%"
        />
    )

    const zipInput = (
        <Input
            elementType='input'
            type='text'
            placeholder='Zip code'
            value={zip}
            changed={(event) => updateField(event,'ZIP')}
            inputMode="numeric"
            pattern="[0-9]*"
            width="46%"
        />
    )

    const saveButtonClasses = [classes.SaveEditsButton]
    if (!formValid) {
        saveButtonClasses.push(classes.SaveDisabled);
    }

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
            <div className={saveButtonClasses.join(" ")} onClick={formValid ? saveEdits : null }>
                Save Location
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        ownedPage: state.pages.ownedPage
    }
}

export default connect(mapStateToProps)(editLocationForm);