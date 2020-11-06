
import React, {useContext} from 'react';
import baseClasses from "../BaseForm/BaseForm.css";
import classes from './ChooseBackground.css'
import BackArrow from "../../../../../assets/images/LifeEventIcons/left-arrow";
import {PostContext} from "../../../../../context/post-context";



const chooseBackground = (props) => {

    const postContext = useContext(PostContext)

    return (
        <div className={classes.PageContainer}>
            <section className={baseClasses.Header}>
                <div className={baseClasses.CancelIcon} onClick={() => postContext.toggleModalContent('CREATE_POST')}>
                    <BackArrow />
                </div>
                <div className={baseClasses.Title}>
                    <h3>Choose background</h3>
                </div>
            </section>
            <div className={baseClasses.Break}/>
            <section className={classes.BackgroundSection}>
                <h4 className={classes.BackgroundTitle}>Patterns</h4>
                <div className={classes.SectionContainer}>

                </div>
            </section>
            <section className={classes.BackgroundSection}>
                <h4 className={classes.BackgroundTitle}>Emoji</h4>
                <div className={classes.SectionContainer}>

                </div>
            </section>
            <section className={classes.BackgroundSection}>
                <h4 className={classes.BackgroundTitle}>Objects</h4>
                <div className={classes.SectionContainer}>

                </div>
            </section>
        </div>
    );
};

export default chooseBackground;