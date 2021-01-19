
import React, {useContext} from 'react';
import baseClasses from "../BaseForm/BaseForm.css";
import classes from './ChooseBackground.css'
import BackArrow from "../../../../../assets/images/LifeEventIcons/left-arrow";
import {PostContext} from "../../../../../context/post-context";

import Boxes from '../../../../../assets/images/Backgrounds/Patterns/Hollowed-Boxes.svg';
import Quantum from '../../../../../assets/images/Backgrounds/Patterns/Quantum-Gradient.svg';
import Confetti from '../../../../../assets/images/Backgrounds/Patterns/Confetti-Doodles.svg';
import Stingrays from '../../../../../assets/images/Backgrounds/Patterns/Colorful-Stingrays.svg';
import Tortoise from '../../../../../assets/images/Backgrounds/Patterns/Tortoise-Shell.svg';
import Honeycomb from '../../../../../assets/images/Backgrounds/Patterns/Honeycomb.svg';
import Chevrons from '../../../../../assets/images/Backgrounds/Patterns/Repeating-Chevrons.svg';
import Squares from '../../../../../assets/images/Backgrounds/Patterns/Protruding-Squares.svg';
import Geometric from '../../../../../assets/images/Backgrounds/Patterns/Geometric-Intersection.svg';
import Bermuda from '../../../../../assets/images/Backgrounds/Patterns/Bermuda-Square.svg';

import Happy from '../../../../../assets/images/Backgrounds/Emojis/Happy.svg';
import Sad from '../../../../../assets/images/Backgrounds/Emojis/Sad.svg';
import StarEyes from '../../../../../assets/images/Backgrounds/Emojis/Star-Eyes.svg';
import Sick from '../../../../../assets/images/Backgrounds/Emojis/Sick.svg';
import Injured from '../../../../../assets/images/Backgrounds/Emojis/Injured.svg';
import Laughing from '../../../../../assets/images/Backgrounds/Emojis/Laughing.svg';
import Love from '../../../../../assets/images/Backgrounds/Emojis/Love.svg';
import Mad from '../../../../../assets/images/Backgrounds/Emojis/Mad.svg';
import Tongues from '../../../../../assets/images/Backgrounds/Emojis/Tongue.svg';
import Angel from '../../../../../assets/images/Backgrounds/Emojis/Angel.svg';

import Pizza from '../../../../../assets/images/Backgrounds/Objects/Pizza.svg';
import Anchor from '../../../../../assets/images/Backgrounds/Objects/Anchor.svg';
import Beer from '../../../../../assets/images/Backgrounds/Objects/Beer.svg';
import Burger from '../../../../../assets/images/Backgrounds/Objects/Burgers.svg';
import Cassette from '../../../../../assets/images/Backgrounds/Objects/Cassettes.svg';
import Leaf from '../../../../../assets/images/Backgrounds/Objects/Leaf.svg';
import Money from '../../../../../assets/images/Backgrounds/Objects/Money.svg';
import Watermelon from '../../../../../assets/images/Backgrounds/Objects/Watermelon.svg';
import Crowns from '../../../../../assets/images/Backgrounds/Objects/crowns.svg';
import Avocados from '../../../../../assets/images/Backgrounds/Objects/Avocados.svg';


const chooseBackground = (props) => {

    const postContext = useContext(PostContext);

    const toggleBackground = (pattern) => {
        postContext.passData('background',pattern);
        postContext.toggleModalContent('CREATE_POST');
    }

    const patterns = [Boxes, Quantum, Confetti, Stingrays, Tortoise, Honeycomb, Chevrons, Squares, Geometric, Bermuda]
        .map((pattern, i) => (<div key={i} className={classes.Background} style={{backgroundImage: `url(${pattern}`}} onClick={() => toggleBackground(pattern)}></div>))

    const emojis = [Happy, Sad, StarEyes, Sick, Injured, Laughing, Love, Mad, Tongues, Angel]
        .map((pattern, i) => (<div key={i} className={classes.Background} style={{backgroundImage: `url(${pattern}`}} onClick={() => toggleBackground(pattern)}></div>))

    const objects = [{img: Pizza,color: "rgba(240, 162, 79,0.8)"}, {img:Anchor, color: 'rgba(14, 43, 232,0.8)'}, {img:Beer, color: 'rgba(199, 125, 28,0.8)'}, {img:Watermelon, color: 'rgba(124, 191, 69,0.9)'}, {img:Crowns, color: 'rgba(19, 146, 189,0.8)'}, {img:Money, color: 'rgba(103, 166, 134,0.9)'}, {img:Burger, color: 'rgba(242, 231, 157,0.9)'}, {img:Cassette, color: 'rgba(90, 150, 214,0.9)'}, {img:Leaf, color: 'rgba(242, 138, 10,0.9)'}, {img:Avocados, color: 'rgba(7, 125, 27,0.9)'}]
        .map((pattern, i)=> (<div key={i} className={classes.Background} style={{backgroundImage: `url(${pattern.img}`, backgroundColor: pattern.color}} onClick={() => toggleBackground(pattern)}></div>))


    return (
        <div className={classes.PageContainer}>
            <section className={classes.Header}>
                <div className={classes.CancelIcon} onClick={() => postContext.toggleModalContent('CREATE_POST')}>
                    <BackArrow />
                </div>
                <div className={classes.Title}>
                    <h3>Choose background</h3>
                </div>
            </section>
            <section className={classes.BackgroundSection}>
                <h4 className={classes.BackgroundTitle}>Patterns</h4>
                <div className={classes.SectionContainer}>
                    {patterns}
                </div>
            </section>
            <section className={classes.BackgroundSection}>
                <h4 className={classes.BackgroundTitle}>Emoji</h4>
                <div className={classes.SectionContainer}>
                    {emojis}
                </div>
            </section>
            <section className={classes.BackgroundSection}>
                <h4 className={classes.BackgroundTitle}>Objects</h4>
                <div className={classes.SectionContainer}>
                    {objects}
                </div>
            </section>
        </div>
    );
};

export default chooseBackground;