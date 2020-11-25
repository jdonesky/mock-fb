import React, { useRef, useEffect } from "react";

function useOutsideAlerter(ref, func) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                func();
            }
        }
        document.addEventListener("mouseenter", handleClickOutside);
        return () => {
            document.removeEventListener("mouseenter", handleClickOutside);
        };
    }, [ref]);
}

export default function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props.action);

    return <div ref={wrapperRef}>{props.children}</div>;
}