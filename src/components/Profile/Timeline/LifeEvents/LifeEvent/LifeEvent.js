
import React from 'react';
import classes from './LifeEvent.css'
import Briefcase from "../../../../../assets/images/LifeEventIcons/briefcase";
import Work from "../../../../UI/Modal/LifeEventModals/EventForms/Work";
import LadderClimb from "../../../../../assets/images/LifeEventGifs/ladderClimb.gif";
import GradCap from "../../../../../assets/images/LifeEventIcons/gradCap";
import School from "../../../../UI/Modal/LifeEventModals/EventForms/School";
import CapThrow from "../../../../../assets/images/LifeEventGifs/grad_cap.gif";
import Hearts from "../../../../../assets/images/LifeEventIcons/hearts";
import Relationship from "../../../../UI/Modal/LifeEventModals/EventForms/Relationship";
import Love from "../../../../../assets/images/LifeEventGifs/paint-heart.gif";
import Home from "../../../../../assets/images/LifeEventIcons/home";
import Location from "../../../../UI/Modal/LifeEventModals/EventForms/Locations";
import Move from "../../../../../assets/images/LifeEventGifs/moving-day.gif";
import Tree from "../../../../../assets/images/LifeEventIcons/magnolia";
import Family from "../../../../../assets/images/LifeEventGifs/couple-kids.gif";
import Globe from "../../../../../assets/images/LifeEventIcons/globe";
import Journey from "../../../../../assets/images/LifeEventGifs/journey.gif";
import Stars from "../../../../../assets/images/LifeEventIcons/shooting-stars";
import Sports from "../../../../../assets/images/LifeEventGifs/sports.gif";
import Health from "../../../../../assets/images/LifeEventIcons/health-report";
import Motivation from "../../../../../assets/images/LifeEventGifs/motivation.gif";
import Milestone from "../../../../../assets/images/LifeEventIcons/goal";
import Dreams from "../../../../../assets/images/LifeEventGifs/catch-stars.gif";
import Candle from "../../../../../assets/images/LifeEventIcons/candle";
import Lanterns from "../../../../../assets/images/LifeEventGifs/lanterns.gif";
import Flag from "../../../../../assets/images/LifeEventIcons/finish";
import PlusPhoto from "../../../../../assets/images/LifeEventIcons/addCamera";

const event = (props) => {

    let icon;
    let animation;
    let backColor;
    switch (props.category) {
        case "Work":
            icon = <Briefcase fill="white"/>;
            animation = LadderClimb;
            backColor = "rgba(255, 162, 122,0.9)"
            break;
        case "Education":
            icon = <GradCap fill="white"/>;
            animation = CapThrow;
            backColor = "rgba(61, 208, 224,0.9)"
            break;
        case "Relationship":
            icon = <Hearts fill="white"/>;
            animation = Love;
            backColor = "white"
            break;
        case "Home":
            icon = <Home fill="white"/>;
            animation = Move;
            backColor = "rgba(141, 212, 247,0.9)"
            break;
        case "Family":
            icon = <Tree fill="white"/>;
            animation = Family;
            backColor = "rgba(255, 241, 199,0.9)"
            break;
        case "Travel":
            icon = <Globe fill="white"/>;
            animation = Journey;
            backColor = "rgba(173, 107, 0,0.9)"
            break;
        case "Interests":
            icon = <Stars fill="white"/>;
            animation = Sports;
            backColor = "rgba(255, 204, 0,0.9)"
            break;
        case "Health":
            icon = <Health fill="white"/>;
            animation = Motivation;
            backColor = "rgba(23, 139, 255,0.9)"
            break;
        case "Milestones":
            icon = <Milestone fill="white"/>;
            animation = Dreams;
            backColor = "rgba(243, 135, 255,0.9)"
            break;
        case "Remembrance":
            icon = <Candle fill="white"/>;
            animation = Lanterns;
            backColor = "rgba(37, 41, 37,0.9)"
            break;
        case "Custom":
            icon = <Flag fill="white"/>;
            break;
        default:
            icon = <Stars fill="white"/>;
    }

    const containerClass = [classes.Container, props.className].join(" ");
    const imageClass = [classes.MainImage, props.imageClass].join(" ");
    return (
        <div className={containerClass}>
            <div className={imageClass} style={{backgroundImage: props.image || `url(${animation})`, backgroundColor: backColor}}/>
            <section className={classes.IconSection}>
                <div style={{position: 'absolute', left: '50%'}}>
                    <div className={classes.CenteredIcon}>
                        {icon}
                    </div>
                </div>
            </section>
            <p className={classes.MainText}>{props.mainText && props.mainText}</p>
            <p className={classes.SubText}>{props.subText && props.subText}</p>
        </div>
    );
}

export default event;