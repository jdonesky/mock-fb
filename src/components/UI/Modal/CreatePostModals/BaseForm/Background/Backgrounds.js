
import React from 'react';
import classes from './Background.css'
import Background from './Background'
import OrangeSquares from '../../../../../../assets/images/Backgrounds/Protruding-Squares.svg'


const backgroundSelectBar = (props) => {

    const options = [
        {svg: OrangeSquares,
            color: "#ee5522"},
        // {svg:,
        //     color:},
        // {svg:,
        //     color:},
        // {svg:,
        //     color:},
        // {svg:,
        //     color:},
        // {svg:,
        //     color:},
        // {svg:,
        //     color:},
        // {svg:,
        //     color:},
        // {svg:,
        //     color:},
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