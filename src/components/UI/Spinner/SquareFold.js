
import React from 'react';
import classes from "./SquareFold.css"

const foldingSquare = () => {
    return (
        <div className={classes['sk-folding-cube']}>
            <div className={[classes['sk-cube1'], classes['sk-cube']].join(" ")}></div>
            <div className={[classes['sk-cube2'], classes['sk-cube']].join(" ")}></div>
            <div className={[classes['sk-cube3'], classes['sk-cube']].join(" ")}></div>
            <div className={[classes['sk-cube4'], classes['sk-cube']].join(" ")}></div>
        </div>
    )
}

export default foldingSquare;