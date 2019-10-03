import { useState, useEffect } from "react";

const useBoundingClientRect = el => {

    const [rect, setRect] = useState(null);

    useEffect(() => {
        const elRect = el.current.getBoundingClientRect();
        setRect(elRect);
    }, [el]);

    return rect; 
};

export default useBoundingClientRect;