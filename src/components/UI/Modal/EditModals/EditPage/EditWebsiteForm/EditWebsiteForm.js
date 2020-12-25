
import React, {useEffect, useState, useContext} from 'react';
import {connect} from 'react-redux';
import sharedClasses from '../Shared.css';
import classes from './EditWebsiteForm.css';
import Web from '../../../../../../assets/images/MiscIcons/web';
import Input from "../../../../Input/Input";
import Spinner from '../../../../Spinner/Spinner';

import {PageContext} from "../../../../../../context/page-context";

const editWebsiteForm = (props) => {

    const pageContext = useContext(PageContext)
    const {ownedPage} = props
    const [website, setWebsite] = useState('');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (ownedPage) {
            setWebsite(ownedPage.website);
        }
    }, [ownedPage])

    const validate = () => {
        setFormValid(website !== ownedPage.website);
    }

    let pageName;
    if (ownedPage) {
        pageName = ownedPage.name + "'s"
    } else {
        pageName = 'your'
    }

    const updateWebsite = (event) => {
        setWebsite(event.target.value);
        validate();
    }

    const websiteInput = (
        <Input
            elementType="input"
            type="text"
            value={website}
            placeholder="Website"
            changed={(event) => updateWebsite(event)}
        />
    )

    const saveButtonClasses = [sharedClasses.SaveEditsButton, sharedClasses.SingleEntrySave]
    if (!formValid) {
        saveButtonClasses.push(sharedClasses.SaveDisabled);
    }

    const saveEdits = () => {
        const newWebsite = website;
        pageContext.saveAboutEdits('website', newWebsite);
    }

    return (
        <section className={sharedClasses.FormContainer}>
            <section className={sharedClasses.Header}>
                <div className={sharedClasses.CategoryIcon}><Web /></div>
                <div className={sharedClasses.HeaderCaptionBlock}>
                    <div className={sharedClasses.EditingCaption}>Editing...</div>
                    <div className={sharedClasses.CaptionQuestion}>
                        {`What is ${pageName} website?`}
                    </div>
                </div>
            </section>
            <section className={sharedClasses.Form}>
                {websiteInput}
            </section>
            <div className={saveButtonClasses.join(" ")} onClick={formValid ? saveEdits : null}>
                {props.editingPageAbout ? <Spinner /> : 'Save Website'}
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


export default connect(mapStateToProps)(editWebsiteForm);