import React from 'react';

const Spinner = ({ text }) => {

    return (
        <>
            <tr style={{ height: 100, width: 100 }} className="spinner-grow text-white" role="status" aria-hidden="true">
                <th className="spinner-border spinner-text text-white"></th>
                <th>
                    {text}
                </th>
            </tr>
        </>
    );
};

export default Spinner;