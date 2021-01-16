
import React, {useContext} from 'react';
import classes from './UnderConstructionModal.css';
import {UnderConstructionContext} from "../../../../context/under-construction-context";
import GuardRail from '../../../../assets/images/ConstructionIcons/guardRail'
import Jackhammer from '../../../../assets/images/ConstructionIcons/jackhammer'
import TrafficControl from '../../../../assets/images/ConstructionIcons/trafficControl'
import Planning from '../../../../assets/images/ConstructionIcons/planning'

const underConstructionModal = props => {

    const underConstructionContext = useContext(UnderConstructionContext)
    const { showModal, closeModal } = underConstructionContext

    let containerClasses = [classes.Container]
    if (showModal) {
        containerClasses.push(classes.Show)
    }

    return (
        <div className={containerClasses.join(" ")} onClick={closeModal}>
            <div className={classes.Content}>
                <div className={classes.Title}>Oops...</div>
                <div className={classes.SubTitle}>
                    The feature you're trying to access is under construction
                </div>
                <section className={classes.ImageContainer}>
                    <div className={classes.GuardRail}><GuardRail fill="white"/></div>
                    <div className={classes.Planning}><Planning fill="white"/></div>
                    <div className={classes.Jackhammer}><Jackhammer fill="white"/></div>
                    <div className={classes.TrafficControl}><TrafficControl fill="white"/></div>
                </section>
            </div>
        </div>
    )
}

export default underConstructionModal;