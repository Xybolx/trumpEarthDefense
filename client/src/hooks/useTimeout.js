import { useEffect, useRef } from "react";

function useTimeout(cb, delay) {
    const savedCb = useRef();

    useEffect(() => {
        savedCb.current = cb;
    });

    useEffect(() => {
        const tick = () => {
            savedCb.current();
        }

        if (delay !== null) {
            let id = setTimeout(tick, delay);
            return () => clearTimeout(id);
        }
    }, [delay]);
};

export default useTimeout;