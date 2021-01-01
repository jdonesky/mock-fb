
import React, {useState, useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import classes from './EditLocationForm.css';
import sharedClasses from '../Shared.css';
import {PageContext} from "../../../../../../context/page-context";
import Input from '../../../../Input/Input';
import Map from '../../../../../Map/Map';
import {geocode} from "../../../../../../shared/utility";

import LocationArrow from '../../../../../../assets/images/MiscIcons/locationArrow';
import Spinner from '../../../../Spinner/Spinner';
import OutsideAlerter from "../../../../../../hooks/outsideClickHandler";

const editLocationForm = props => {

    const pageContext = useContext(PageContext);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [formValid, setFormValid] = useState(false);

    const [suggestedAddress, setSuggestedAddress] = useState(null);
    const [showSuggestedAddress, setShowSuggestedAddress] = useState(false);
    const [storedCoordinates, setStoredCoordinates] = useState(null);
    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const {ownedPage} = props

    useEffect(() => {
        if (ownedPage && ownedPage.location) {
            setAddress(ownedPage.location.address);
            setCity(ownedPage.location.city);
            setZip(ownedPage.location.zip);
            setCoordinates(ownedPage.location.coordinates);
        }
    }, [ownedPage])

    useEffect(() => {
        if (formValid) {
            fetchCoordinates()
        }
    }, [formValid])

    const takeSuggestion = () => {
        setShowSuggestedAddress(false);
        setAddress(suggestedAddress);
        setCoordinates(storedCoordinates);
        setStoredCoordinates(null);
    }

    const clearSuggestion = () => {
        setShowSuggestedAddress(false);
        setStoredCoordinates(null);
    }

    const tryAgain = () => {
        setShowErrorMessage(false);
        setError(null);
        setAddress('');
        setCity('');
        setZip('');
        setCoordinates(null);
    }

    const dismissError = () => {
        setShowErrorMessage(false);
        setError(null);
    }

    let pageName;
    if (ownedPage) {
        pageName = ownedPage.name + "'s"
    } else {
        pageName = 'your'
    }

    const fetchCoordinates = () => {
        setTimeout(() => {
            geocode(`${address} ${city} ${zip}`, (type, payload) => {
                switch (type) {
                    case 'SUCCESS':
                        setSuggestedAddress(payload.formatted_address);
                        setStoredCoordinates(payload.geometry.location);
                        setShowSuggestedAddress(true);
                        break;
                    case 'FAIL':
                        setError(payload);
                        setShowErrorMessage(true);
                        break;
                    default:
                        return;
                }
            })
        }, 1500)
    }

    const validate = () => {
        setFormValid(address !== '' && city !== '' && zip !== '');
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

    const saveButtonClasses = [sharedClasses.SaveEditsButton]
    if (!formValid) {
        saveButtonClasses.push(sharedClasses.SaveDisabled);
    }

    let suggestion;
    if (showSuggestedAddress) {
        suggestion = (
            <OutsideAlerter action={clearSuggestion}>
                <div className={classes.SuggestionContainer}>
                    <div className={classes.SuggestionCaption}>Did you mean...</div>
                    <div className={classes.Suggestion} onClick={takeSuggestion}>{`${suggestedAddress}?`}</div>
                </div>
            </OutsideAlerter>
        )
    }

    let errorMessage;
    if (showErrorMessage) {
        errorMessage = (
            <OutsideAlerter action={tryAgain}>
                <div className={classes.SuggestionContainer}>
                    <div className={classes.SuggestionCaption}>Sorry, we don't recognize that address</div>
                    <div className={classes.Suggestion} onClick={dismissError}>{`Use ${address} anyway?`}</div>
                    <div className={classes.TryAgain} onClick={tryAgain}>...or try again</div>
                </div>
            </OutsideAlerter>
        )
    }

    const saveEdits = () => {
        const newLocation = {address: address, city: city, zip: zip, coordinates: coordinates}
        pageContext.saveAboutEdits('location', newLocation)
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
            <section className={sharedClasses.Form}>
                {errorMessage}
                {suggestion}
                {addressInput}
                <div className={classes.CityAndZip}>
                    {cityInput}
                    {zipInput}
                </div>
            </section>
            <section className={classes.MapContainer}>
                <Map userLocation={coordinates} minWidth="410px"/>
            </section>
            <div className={saveButtonClasses.join(" ")} onClick={formValid ? saveEdits : null }>
                {props.editingPageAbout ? <Spinner /> : 'Save Location'}
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        ownedPage: state.pages.ownedPage,
        editingPageAbout: state.pages.editingPageAbout
    }
}

export default connect(mapStateToProps)(editLocationForm);