import React from 'react';

const Spinner = ({ text }) => {

    return (
        <>
            <tr className="spinner-grow text-white" role="status" aria-hidden="true">
                <th>
                    {text}
                </th>
            </tr>
        </>
    );
};

export default Spinner;