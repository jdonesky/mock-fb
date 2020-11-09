
import React from 'react';
import classes from './Background.css';
import Background from './Background';
import OrangeSquares from '../../../../../../assets/images/Backgrounds/Patterns/Protruding-Squares.svg';
import SpectrumGradient from '../../../../../../assets/images/Backgrounds/Patterns/Spectrum-Gradient.svg';
import FlatMountains from '../../../../../../assets/images/Backgrounds/Patterns/Flat-Mountains.svg';
import Honeycomb from '../../../../../../assets/images/Backgrounds/Patterns/Honeycomb.svg';
import TortoiseShell from '../../../../../../assets/images/Backgrounds/Patterns/Tortoise-Shell.svg';
import Stingrays from '../../../../../../assets/images/Backgrounds/Patterns/Colorful-Stingrays.svg';
import WinterBurst from '../../../../../../assets/images/Backgrounds/Patterns/Wintery-Sunburst.svg';
import BermudaSquare from '../../../../../../assets/images/Backgrounds/Patterns/Bermuda-Square.svg';
import LiquidCheese from '../../../../../../assets/images/Backgrounds/Patterns/Liquid-Cheese.svg';
import QuantumGradient from '../../../../../../assets/images/Backgrounds/Patterns/Quantum-Gradient.svg';



const backgroundSelectBar = (props) => {

    const options = [
        {svg: null, color: "white"},
        {svg: OrangeSquares},
        {svg: SpectrumGradient},
        {svg: Honeycomb},
        {svg: TortoiseShell},
        {svg: Stingrays},
        {svg: FlatMountains},
        {svg: WinterBurst},
        {svg: BermudaSquare},
        {svg: LiquidCheese},
    ];

    const backgrounds = options.map((opt, i) => (
        <Background
            key={i}
            toggle={() => props.toggle(opt.svg)}
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