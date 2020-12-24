
import React, {useContext} from 'react';
import classes from './EditLocationForm.css';
import sharedClasses from '../Shared.css';
import {PageContext} from "../../../../../../context/page-context";

const editLocationForm = props => {

    const pageContext = useContext(PageContext);

    return (
        <section className={sharedClasses.FormContainer}>
            <section className={sharedClasses.Header}>
                <div className={sharedClasses.CategoryIcon}></div>
                <div clasName={sharedClasses.HeaderCaptionBlock}>
                    <div className={sharedClasses.EditingCaption}>Editing...</div>
                    <div className={sharedClasses.CaptionQuestion}>
                        {`What is ${pageContext.pageName}'s location?`}
                    </div>
                </div>
            </section>
        </section>
    )
}

export default editLocationForm;