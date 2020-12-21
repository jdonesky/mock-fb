

import React, {useState} from 'react';
import classes from './CreatePageForm.css';
import Input from '../../../UI/Input/Input';

const createPageForm = props => {

    const [pageName, setPageName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [formValid, setFormValid] = useState(false);

    const validateForm = () => {
        setFormValid(pageName !== '' && category !== '' && description.length <= 255);
    }

    const updateName = (event) => {
        setPageName(event.target.value);
        validateForm();
    }

    const updateCategory = (event) => {
        setCategory(event.target.value);
        validateForm();
    }

    const updateDescription = (event) => {
        setDescription(event.target.value);
        validateForm();
    }

    const nameInput = (
        <Input
            elementType="input"
            type="text"
            placeholder="Page name (required)"
            value={pageName}
            validation={{required: true}}
            valid={false}
            touched={false}
            changed={(event) => updateName(event)}
        />
    )

    const categoryInput = (
        <Input
            elementType="input"
            type="text"
            placeholder="Category (required)"
            value={category}
            validation={{required: true}}
            valid={false}
            touched={false}
            changed={(event) => updateCategory(event)}
        />
    )

    const descriptionInput = (
        <Input
            elementType="textarea"
            placeholder="Description"
            value={description}
            changed={(event) => updateDescription(event)}
            className={classes.DescriptionInput}
        />
    )

    let createButtonClasses = [classes.CreateButton];
    if (!formValid) {
        createButtonClasses.push(classes.CreateDisabled);
    }

    return (
        <section className={classes.FormContainer}>
            <section className={classes.Form}>
                <h1 className={classes.FormTitle}>Page Information</h1>
                {nameInput}
                <span className={classes.Caption}>Use the name of your business, brand or organization, or a name that explains what the Page is about.</span>
                {categoryInput}
                <span className={classes.Caption}>Choose a category that describes what type of business, organization or topic the Page represents. You can add up to 3.</span>
                {descriptionInput}
                <span className={classes.Caption}>Write about what your business does, the services you provide, or the purpose of the Page.</span>
                <span className={classes.Caption}>Character Limit: 255</span>
            </section>
            <section className={classes.ControlsContainer}>
                <span className={classes.Caption}>You can add images, contact info and other details after you create the Page.</span>
                <div className={createButtonClasses.join(" ")}>Create Page</div>
            </section>
        </section>
    )
};

export default createPageForm;