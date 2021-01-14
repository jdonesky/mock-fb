
import React, {useState} from 'react';
import classes from './NewCounter.css';

const newCounter = props => {

    const [internalCount, setInternalCount] = useState(null);
    const { count } = props;

    const subtractOne = () => {
        setInternalCount(prevState => {
            return prevState - 1;
        })
    }

    const addOne = () => {
        setInternalCount(prevState => {
            return prevState + 1;
        })
    }

    let tally;
    if (count) {
        tally = count;
    }

    if (internalCount) {
        tally = internalCount
    }

    let counter;
    if (tally) {
        counter = (
            <div className={classes.Positioner}>
                <div className={classes.Badge}>
                    <div className={classes.Counter}>{tally}</div>
                </div>
            </div>
        )
    }

    return counter;
}

export default newCounter;