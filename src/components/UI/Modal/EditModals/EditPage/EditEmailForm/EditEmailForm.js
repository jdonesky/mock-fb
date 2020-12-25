

import React, {useEffect, useState, useContext} from 'react';
import {connect} from 'react-redux';
import sharedClasses from '../Shared.css';
import classes from './EditEmailForm.css';
import Web from '../../../../../../assets/images/MiscIcons/web';
import Input from "../../../../Input/Input";
import Spinner from '../../../../Spinner/Spinner';

import {validityCheck} from "../../../../../../shared/utility";
import {PageContext} from "../../../../../../context/page-context";

const editEmailForm = (props) => {

    const pageContext = useContext(PageContext)
    const {ownedPage} = props
    const [email, setEmail] = useState('');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (ownedPage) {
            setEmail(ownedPage.email);
        }
    }, [ownedPage])

    const validate = () => {
        setFormValid(email !== ownedPage.email && validityCheck(email, {required: true, isEmail:true}));
    }

    let pageName;
    if (ownedPage) {
        pageName = ownedPage.name + "'s"
    } else {
        pageName = 'your'
    }

    const updateEmail = (event) => {
        setEmail(event.target.value);
        validate();
    }

    const emailInput = (
        <Input
            elementType="input"
            type="text"
            value={email}
            placeholder="Email"
            validation={{required: true, isEmail: true}}
            changed={(event) => updateEmail(event)}
            valid={formValid}
        />
    )

    const saveButtonClasses = [sharedClasses.SaveEditsButton, sharedClasses.SingleEntrySave]
    if (!formValid) {
        saveButtonClasses.push(sharedClasses.SaveDisabled);
    }

    const saveEdits = () => {
        pageContext.saveAboutEdits('email', email);
    }

    return (
        <section className={sharedClasses.FormContainer}>
            <section className={sharedClasses.Header}>
                <div className={sharedClasses.CategoryIcon}><Web /></div>
                <div className={sharedClasses.HeaderCaptionBlock}>
                    <div className={sharedClasses.EditingCaption}>Editing...</div>
                    <div className={sharedClasses.CaptionQuestion}>
                        {`What is ${pageName} email?`}
                    </div>
                </div>
            </section>
            <section className={sharedClasses.Form}>
                {emailInput}
            </section>
            <div className={saveButtonClasses.join(" ")} onClick={formValid ? saveEdits : null}>
                {props.editingPageAbout ? <Spinner /> : 'Save Email'}
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


export default connect(mapStateToProps)(editEmailForm);