import { useEffect, useRef } from "react";

const useInterval = (cb, delay) => {
    const savedCb = useRef();

    useEffect(() => {
        savedCb.current = cb;
    });

    useEffect(() => {
        const tick = () => {
            savedCb.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

export default useInterval;