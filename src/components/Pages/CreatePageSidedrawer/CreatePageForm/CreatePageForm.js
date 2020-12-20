

import React, {useState, useEffect} from 'react';
import classes from './CreatePageForm.css';

import Input from '../../../UI/Input/Input';
import {fieldBuilder} from "../../../../shared/utility";


const createPageForm = props => {

    const [pageName, setPageName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        console.log(pageName)
    })

    const nameInput = (
        <Input
            elementType="input"
            type="text"
            placeholder="Page name (required)"
            value={pageName}
            validation={{required: true}}
            valid={false}
            touched={false}
            changed={(event) => setPageName(event.target.value)}
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
            changed={(event) => setCategory(event.target.value)}
        />
    )

    const descriptionInput = (
        <Input
            elementType="textarea"
            placeholder="Description"
            value={description}
            changed={(event) => setDescription(event.target.value)}
            className={classes.DescriptionInput}
        />
    )


    return (
        <section className={classes.FormContainer}>
            <section className={classes.Form}>
                <h1 className={classes.FormTitle}>Page Information</h1>
                {nameInput}
                <span className={classes.Caption}>Use the name of your business, brand or organization, or a name that explains what the Page is about.</span>
                {categoryInput}
                <span className={classes.Caption}>Choose a category that describes what type of business, organization or topic the Page represents. You can add up to 3.</span>
                {descriptionInput}
                <section className={classes.ControlsContainer}>
                    <span className={classes.Caption}>You can add images, contact info and other details after you create the Page.</span>

                </section>
            </section>
        </section>
    )
};

export default createPageForm;