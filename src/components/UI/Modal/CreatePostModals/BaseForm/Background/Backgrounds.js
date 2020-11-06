
import React from 'react';
import classes from './Background.css';
import Background from './Background';
import OrangeSquares from '../../../../../../assets/images/Backgrounds/Patterns/Protruding-Squares.svg';
import SpectrumGradient from '../../../../../../assets/images/Backgrounds/Patterns/Spectrum-Gradient.svg';
import FlatMountains from '../../../../../../assets/images/Backgrounds/Patterns/Flat-Mountains.svg';
import Honeycomb from '../../../../../../assets/images/Backgrounds/Patterns/Honeycomb.svg';
import TortoiseShell from '../../../../../../assets/images/Backgrounds/Patterns/Tortoise-Shell.svg';
import Stingrays from '../../../../../../assets/images/Backgrounds/Patterns/Colorful-Stingrays.svg';
import Confetti from '../../../../../../assets/images/Backgrounds/Patterns/Confetti-Doodles.svg';
import WinterBurst from '../../../../../../assets/images/Backgrounds/Patterns/Wintery-Sunburst.svg';
import BermudaSquare from '../../../../../../assets/images/Backgrounds/Patterns/Bermuda-Square.svg';
import DragonScales from '../../../../../../assets/images/Backgrounds/Patterns/Dragon-Scales.svg';
import LiquidCheese from '../../../../../../assets/images/Backgrounds/Patterns/Liquid-Cheese.svg';
import QuantumGradient from '../../../../../../assets/images/Backgrounds/Patterns/Quantum-Gradient.svg';
import HollowedBoxes from '../../../../../../assets/images/Backgrounds/Patterns/Hollowed-Boxes.svg';
import RosePetals from '../../../../../../assets/images/Backgrounds/Patterns/Rose-Petals.svg';
import Chevrons from '../../../../../../assets/images/Backgrounds/Patterns/Repeating-Chevrons.svg';
import GridView from "../../../../../../assets/images/grid";


const backgroundSelectBar = (props) => {

    const options = [
        {svg: OrangeSquares},
        {svg: SpectrumGradient},
        {svg: Honeycomb},
        {svg: TortoiseShell},
        {svg: Stingrays},
        {svg: FlatMountains},
        {svg: WinterBurst},
        {svg: BermudaSquare},
        {svg: LiquidCheese},
        {svg: QuantumGradient},
    ];

    const backgrounds = options.map(opt => (
        <Background
            svg={opt.svg}
            color={opt.color}
        />
    ))

    return (
        <div className={classes.BackgroundOptions}>
            {backgrounds}

        </div>
    );
}

export default backgroundSelectBar;