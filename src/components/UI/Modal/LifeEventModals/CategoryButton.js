
import React from 'react';
import classes from './CategoryButton.css'
import Briefcase from '../../../../assets/images/LifeEventIcons/briefcase'
import GradCap from '../../../../assets/images/LifeEventIcons/gradCap'
import Hearts from '../../../../assets/images/LifeEventIcons/hearts'
import Home from '../../../../assets/images/LifeEventIcons/home'
import Globe from '../../../../assets/images/LifeEventIcons/globe'
import Stars from '../../../../assets/images/LifeEventIcons/shooting-stars'
import Tree from '../../../../assets/images/LifeEventIcons/magnolia'
import Candle from '../../../../assets/images/LifeEventIcons/candle'
import Milestone from '../../../../assets/images/LifeEventIcons/goal'
import Flag from '../../../../assets/images/LifeEventIcons/finish'
import Health from '../../../../assets/images/LifeEventIcons/health-report'

const categoryButton = (props) => {

    let icon;
    let caption;

    switch (props.type) {
        case "Work":
            icon = <Briefcase />
            caption = "Work"
            break;
        case "Education":
            icon = <GradCap />
            caption = "Education"
            break;
        case "Relationship":
            icon = <Hearts />
            caption = "Relationship"
            break;
        case "Home":
            icon = <Home />
            caption = "Home & Living"
            break;
        case "Family":
            icon = <Tree />
            caption = "Family"
            break;
        case "Travel":
            icon = <Globe />
            caption = "Travel"
            break;
        case "Interests":
            icon = <Stars />
            caption = "Interests & Activities"
            break;
        case "Health":
            icon = <Health />
            caption = "Health & Wellness"
            break;
        case "Milestones":
            icon = <Milestone />
            caption = "Milestones & Achievements"
            break;
        case "Remembrance":
            icon = <Candle />
            caption = "Remembrance"
            break;
        case "Custom":
            icon = <Flag />
            caption = "Create Your Own"
            break;
        default:
            icon = null;
            caption = null;
    }

    return (
        <div className={classes.Button}>
            <div className={classes.Content}>
                <section className={classes.Icon}>
                    {icon}
                </section>
                <p>{caption}</p>
            </div>
        </div>
        );
}

export default categoryButton;