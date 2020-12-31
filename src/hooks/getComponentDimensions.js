import {useState, useEffect} from 'react';

export const useComponentDimensions = (myRef) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (myRef.current) {
            setWidth(myRef.current.offsetWidth || 0)
            setHeight(myRef.current.offsetWidth || 0)
        }
    }, [myRef.current])

    return {width, height}
}

