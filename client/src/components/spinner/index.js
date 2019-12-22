import React from 'react';

const Spinner = ({ text }) => {

    return (
        <>
            {text}
            <tr className="spinner-border text-white" role="status" aria-hidden="true" />
        </>
    );
};

export default Spinner;