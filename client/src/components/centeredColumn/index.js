import React from 'react';

const CenteredColumn = ({ className, children }) => {

    return (
        <div className={`${className} col-md-6 offset-md-3`}>
            { children }
        </div>
    );
};

export default CenteredColumn;