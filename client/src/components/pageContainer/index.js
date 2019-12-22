import React from 'react';

const PageContainer = ({ id, className, children }) => {

    return (
        <div id={`${id}`} className={`${className} text-center container`}>
            { children }
        </div>
    );
};

export default PageContainer;