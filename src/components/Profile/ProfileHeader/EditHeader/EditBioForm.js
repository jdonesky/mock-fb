
import React, {useState} from 'react';
import Input from '../../../UI/Input/Input'
import sharedClasses from '../../ProfileAbout/AboutContent/EditContent/SharedEditFormUI.css'
import classes from './EditBioForm.css';
import Button from "../../../UI/Button/Button";

const editBioForm = (props) => {
    const [bio, setBio] = useState(props.bio || '');
    const [disableSave, setDisableSave] = useState(false)

    const updateBio = (event) => {
        if (100-bio.length < 0) {
            setDisableSave(true)

        } else {
            setDisableSave(false);
        }
        setBio(event.target.value);
    }

    const saveChangesHandler = (event) => {
        event.preventDefault();
        props.save('bio',bio)
    }

    const bioInput = (
        <Input
            elementType="textarea"
            value={bio}
            placeholder="Describe who you are"
            changed={(event) => updateBio(event)}
            className={classes.BioInput}
        />
    )

    return (
        <form className={classes.BioForm} onSubmit={saveChangesHandler}>
            {bioInput}
            <div className={classes.CharCounter}>
                <div><p>{`${101 - bio.length} characters remaining`}</p></div>
            </div>
            <div className={sharedClasses.Buttons}>
                <Button addClass="Neutral">Privacy</Button>
                <div className={sharedClasses.SubmitOrCancel}>
                    <Button addClass="Neutral" clicked={props.cancel} type="button">Cancel</Button>
                    <Button addClass="Save" type="submit" disabled={disableSave}>Save</Button>
                </div>
            </div>
        </form>
    );
}

export default editBioForm;