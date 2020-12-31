import {useState, useEffect} from 'react';

export const useComponentDimensions = (myRef) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (myRef.current) {
            setWidth(myRef.current.offsetWidth)
            setHeight(myRef.current.offsetHeight)
        }
    })

    return {width, height}
}

