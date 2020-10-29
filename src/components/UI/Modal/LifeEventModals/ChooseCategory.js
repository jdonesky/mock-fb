import React, {useContext} from 'react';
import classes from "./ChooseCategory.css"
import {LifeEventContext} from "../../../../context/life-event-context";

const chooseCategory = () => {
    const lifeEventContext = useContext(LifeEventContext);

    const categories = ['Work','Education','Relationship','Home & Living','Family','Travel','Interests & Activities','Health & Wellness','Milestones & Achievements','Remembrance','Create Your Own']
    const buttons = categories.map(category => <div onClick={}></div>)

    return (
        <div className={classes.EventCategoryModal}>
            <div className={classes.MainImage}>
            </div>
            <section className={classes.Heading}>
                <h2>Life Events</h2>
                <p>Share and remember important moments from your life</p>
            </section>
            <div className={classes.Break}/>
            <section className={classes.CategoryButtons}>
                <h4>SELECT A CATEGORY</h4>
            </section>
        </div>
    );
}

export default chooseCategory;