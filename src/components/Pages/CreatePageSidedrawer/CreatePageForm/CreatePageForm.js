

import React, {useEffect, useContext} from 'react';
import classes from './CreatePageForm.css';
import Input from '../../../UI/Input/Input';

import {PageContext} from "../../../../context/page-context";

const createPageForm = props => {

    useEffect(() => {
        console.log(pageContext.pageName)
    })
    const pageContext = useContext(PageContext);

    const nameInput = (
        <Input
            elementType="input"
            type="text"
            placeholder="Page name (required)"
            value={pageContext.pageName}
            validation={{required: true}}
            valid={false}
            touched={false}
            changed={(event) => pageContext.updateName(event)}
        />
    )

    const categoryInput = (
        <Input
            elementType="input"
            type="text"
            placeholder="Category (required)"
            value={pageContext.category}
            validation={{required: true}}
            valid={false}
            touched={false}
            changed={(event) => pageContext.updateCategory(event)}
        />
    )

    const descriptionInput = (
        <Input
            elementType="textarea"
            placeholder="Description"
            value={pageContext.description}
            changed={(event) => pageContext.updateDescription(event)}
            className={classes.DescriptionInput}
        />
    )

    let createButtonClasses = [classes.CreateButton];
    if (!pageContext.formValid) {
        createButtonClasses.push(classes.CreateDisabled);
    }

    return (
        <section className={classes.FormContainer}>
            <section className={classes.Form}>
                <h1 className={classes.FormTitle}>Page Information</h1>
                {nameInput}
                <span className={classes.Caption}>Use the name of your business, brand or organization, or a name that explains what the Page is about.</span>
                {categoryInput}
                <span className={classes.Caption}>Choose a category that describes what type of business, organization or topic the Page represents</span>
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