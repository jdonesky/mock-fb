
import React, {useEffect, useRef} from 'react';

const autoScroll = () => {
    const scrollToMe = useRef(null);
    useEffect(() => {
        scrollToMe.current.scrollIntoView()
    })
    return <div ref={scrollToMe}></div>
}

export default autoScroll;