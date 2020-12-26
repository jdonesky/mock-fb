
import React, {useEffect, useState, useContext} from 'react';
import {connect} from 'react-redux';
import sharedClasses from '../Shared.css';
import classes from './EditDescriptionForm.css';
import Info from "../../../../../../assets/images/MiscIcons/info";
import Input from "../../../../Input/Input";
import Spinner from '../../../../Spinner/Spinner';

import {PageContext} from "../../../../../../context/page-context";

const editDescriptionForm = (props) => {

    const pageContext = useContext(PageContext)
    const {ownedPage} = props
    const [description, setDescription] = useState('');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (ownedPage) {
            setDescription(ownedPage.description);
        }
    }, [ownedPage])

    const validate = () => {
        setFormValid(description !== ownedPage.description);
    }


    let pageName;
    if (ownedPage) {
        pageName = ownedPage.name + "'s"
    } else {
        pageName = 'your'
    }

    const updateDescription = (event) => {
        setDescription(event.target.value);
        validate();
    }

    const descriptionInput = (
        <Input
            elementType="textarea"
            value={description}
            placeholder="Description"
            changed={(event) => updateDescription(event)}
            className={classes.DescriptionBox}
        />
    )

    const saveButtonClasses = [sharedClasses.SaveEditsButton, sharedClasses.SingleEntrySave]
    if (!formValid) {
        saveButtonClasses.push(sharedClasses.SaveDisabled);
    }

    const saveEdits = () => {
        const newDescription = description;
        pageContext.saveAboutEdits('description', newDescription);
    }

    return (
        <section className={sharedClasses.FormContainer}>
            <section className={sharedClasses.Header}>
                <div className={sharedClasses.CategoryIcon}><Info /></div>
                <div className={sharedClasses.HeaderCaptionBlock}>
                    <div className={sharedClasses.EditingCaption}>Editing...</div>
                    <div className={sharedClasses.CaptionQuestion}>
                        {`What is ${pageName} description?`}
                    </div>
                </div>
            </section>
            <section className={sharedClasses.Form}>
                {descriptionInput}
            </section>
            <div className={saveButtonClasses.join(" ")} onClick={formValid ? saveEdits : null}>
                {props.editingPageAbout ? <Spinner /> : 'Save Description'}
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


export default connect(mapStateToProps)(editDescriptionForm);