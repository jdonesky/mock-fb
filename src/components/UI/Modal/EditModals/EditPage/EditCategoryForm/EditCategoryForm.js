
import React, {useEffect, useState, useContext} from 'react';
import {connect} from 'react-redux';
import sharedClasses from '../Shared.css';
import Web from '../../../../../../assets/images/MiscIcons/web';
import Input from "../../../../Input/Input";
import Spinner from '../../../../Spinner/Spinner';

import {PageContext} from "../../../../../../context/page-context";

const editCategoryForm = (props) => {

    const pageContext = useContext(PageContext)
    const {ownedPage} = props
    const [category, setCategory] = useState('');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (ownedPage) {
            setCategory(ownedPage.category);
        }
    }, [ownedPage])

    const validate = () => {
        setFormValid(category !== ownedPage.category);
    }

    let pageName;
    if (ownedPage) {
        pageName = ownedPage.name + "'s"
    } else {
        pageName = 'your'
    }

    const updateCategory = (event) => {
        setCategory(event.target.value);
        validate();
    }

    const categoryInput = (
        <Input
            elementType="input"
            type="text"
            value={category}
            placeholder="Category"
            changed={(event) => updateCategory(event)}
        />
    )

    const saveButtonClasses = [sharedClasses.SaveEditsButton, sharedClasses.SingleEntrySave]
    if (!formValid) {
        saveButtonClasses.push(sharedClasses.SaveDisabled);
    }

    const saveEdits = () => {
        const newCategory= category;
        pageContext.saveAboutEdits('category', newCategory);
    }

    return (
        <section className={sharedClasses.FormContainer}>
            <section className={sharedClasses.Header}>
                <div className={sharedClasses.CategoryIcon}><Web /></div>
                <div className={sharedClasses.HeaderCaptionBlock}>
                    <div className={sharedClasses.EditingCaption}>Editing...</div>
                    <div className={sharedClasses.CaptionQuestion}>
                        {`What is ${pageName} category?`}
                    </div>
                </div>
            </section>
            <section className={sharedClasses.Form}>
                {categoryInput}
            </section>
            <div className={saveButtonClasses.join(" ")} onClick={formValid ? saveEdits : null}>
                {props.editingPageAbout ? <Spinner /> : 'Save Category'}
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


export default connect(mapStateToProps)(editCategoryForm);