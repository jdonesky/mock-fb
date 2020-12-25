
import React, {useEffect, useState, useContext} from 'react';
import {connect} from 'react-redux';
import sharedClasses from '../Shared.css';
import classes from './EditPhoneForm.css';
import Web from '../../../../../../assets/images/MiscIcons/web';
import Input from "../../../../Input/Input";
import Spinner from '../../../../Spinner/Spinner';

import {PageContext} from "../../../../../../context/page-context";

const editPhoneForm = (props) => {

    const pageContext = useContext(PageContext)
    const {ownedPage} = props
    const [phone, setPhone] = useState('');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (ownedPage) {
            setPhone(ownedPage.phone);
        }
    }, [ownedPage])

    const validate = () => {
        setFormValid(phone !== ownedPage.phone);
    }

    let pageName;
    if (ownedPage) {
        pageName = ownedPage.name + "'s"
    } else {
        pageName = 'your'
    }

    const updateWebsite = (event) => {
        setPhone(event.target.value);
        validate();
    }

    const phoneInput = (
        <Input
            elementType="input"
            type="text"
            value={phone}
            placeholder="Phone number"
            changed={(event) => updateWebsite(event)}
            pattern="[0-9]*"
        />
    )

    const saveButtonClasses = [sharedClasses.SaveEditsButton, sharedClasses.SingleEntrySave]
    if (!formValid) {
        saveButtonClasses.push(sharedClasses.SaveDisabled);
    }

    const saveEdits = () => {
        pageContext.saveAboutEdits('phone', phone);
    }

    return (
        <section className={sharedClasses.FormContainer}>
            <section className={sharedClasses.Header}>
                <div className={sharedClasses.CategoryIcon}><Web /></div>
                <div className={sharedClasses.HeaderCaptionBlock}>
                    <div className={sharedClasses.EditingCaption}>Editing...</div>
                    <div className={sharedClasses.CaptionQuestion}>
                        {`What is ${pageName} phone number?`}
                    </div>
                </div>
            </section>
            <section className={sharedClasses.Form}>
                {phoneInput}
            </section>
            <div className={saveButtonClasses.join(" ")} onClick={formValid ? saveEdits : null}>
                {props.editingPageAbout ? <Spinner /> : 'Save Phone Number'}
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


export default connect(mapStateToProps)(editPhoneForm);