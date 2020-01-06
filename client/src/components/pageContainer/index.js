import React, { forwardRef } from 'react';

const PageContainer = forwardRef(({ id, className, children }, earthRef) => {

    return (
        <div ref={earthRef} id={`${id}`} className={`${className} text-center container`}>
            { children }
        </div>
    );
});

export default PageContainer;