

import {useState, useEffect } from 'react';

export default function useInfiniteScroll() {
    const [isBottom, setIsBottom] = useState(false);

    const handleScroll = () => {
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight
        if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
            setIsBottom(true);
        } else {
            if (setIsBottom) {
                setIsBottom(false);
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return [isBottom, setIsBottom]
}
