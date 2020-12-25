
import React, {useEffect, useState} from 'react';
import sharedClasses from '../Shared.css';
import classes from './EditDescriptionForm.css';
import Info from "../../../../../../assets/images/MiscIcons/info";
import Input from "../../../../Input/Input";

const editDescriptionForm = (props) => {

    const {ownedPage} = props
    const [description, setDescription] = useState(false);
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (ownedPage) {
            setDescription(ownedPage.description);
        }
    }, [ownedPage])

    let pageName;
    if (ownedPage) {
        pageName = ownedPage.name + "'s"
    } else {
        pageName = 'your'
    }

    const updateDescription = (event) => {

    }

    const descriptionInput = (
        <Input
            elementType="textarea"
            value={description}
            changed={(event) => updateDescription(event)}
        />
    )

    const saveButtonClasses = [classes.SaveEditsButton]
    if (!formValid) {
        saveButtonClasses.push(classes.SaveDisabled);
    }

    return (
        <section className={sharedClasses.FormContainer}>
            <section className={sharedClasses.Header}>
                <div className={sharedClasses.CategoryIcon}><Info /></div>
                <div className={sharedClasses.HeaderCaptionBlock}>
                    <div className={sharedClasses.EditingCaption}>Editing...</div>
                    <div className={sharedClasses.CaptionQuestion}>
                        {`What is ${pageName} location?`}
                    </div>
                </div>
            </section>
            <section className={classes.Form}>

            </section>
            <div className={saveButtonClasses.join(" ")}>
                Save Location
            </div>
        </section>
    )
}

export default editDescriptionForm;