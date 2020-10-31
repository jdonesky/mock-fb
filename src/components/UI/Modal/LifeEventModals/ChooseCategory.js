import React, {useContext} from 'react';
import classes from "./ChooseCategory.css"
import {LifeEventContext} from "../../../../context/life-event-context";
import CategoryButton from './CategoryButton'
import Balloon from '../../../../assets/images/LifeEventIcons/hot-air-balloon'
import Cake from '../../../../assets/images/LifeEventIcons/cake'
import Fireworks from '../../../../assets/images/LifeEventIcons/fireworks'
import Basket from '../../../../assets/images/LifeEventIcons/shopping-basket'
import Swirl from '../../../../assets/images/LifeEventIcons/line-swirl'
import Seagulls from '../../../../assets/images/LifeEventIcons/seagull'

const chooseCategory = () => {
    const lifeEventContext = useContext(LifeEventContext);

    const onCategorySelect = (category) => {
        lifeEventContext.passData('category',category);
        lifeEventContext.toggleModalContent();
    }

    const categories = ['Work','Education','Relationship','Home','Family','Travel','Interests','Health','Milestones','Remembrance','Custom']
    const buttons = categories.map(category => <CategoryButton clicked={() => onCategorySelect(category)} type={category} />)

    return (
        <div className={classes.EventCategoryModal}>
            <div className={classes.MainImage}>
                <div className={classes.Balloon}>
                    <Balloon />
                </div>
                <div className={classes.Basket}>
                    <Basket />
                </div>
                <div className={classes.Cake}>
                    <Cake />
                </div>
                <div className={classes.Fireworks}>
                    <Fireworks />
                </div>
                <div className={classes.Swirl}>
                    <Swirl/>
                </div>
                <div className={classes.Seagulls}>
                    <Seagulls />
                </div>
            </div>
            <section className={classes.Heading}>
                <h2>Life Events</h2>
                <p>Share and remember important moments from your life</p>
            </section>
            <div className={classes.Break}/>
            <section className={classes.Categories}>
                <h4>SELECT A CATEGORY</h4>
                <div className={classes.ButtonsContainer}>
                    {buttons}
                </div>
            </section>
        </div>
    );
}

export default chooseCategory;