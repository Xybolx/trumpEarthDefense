import React, { forwardRef } from 'react';
import NavBtn from '../buttons/NavBtn';

const HighScoresForm = forwardRef((props, inputRef) => {

    return (
        <div className="input-group input-group-sm bg-dark">
            <input
                ref={inputRef}
                id="search"
                name="search"
                value={props.search || ""}
                onChange={props.handleChange}
                type="search"
                placeholder="initials or minimum score"
                aria-label="Search Scores"
                aria-describedby="button-search"
                autoComplete="off"
            />
            <div className="input-group-append mb-3 ml-5 form-inline">
                <NavBtn 
                    id="button-addon2"
                    onClick={props.handleClearForm}>
                    Reset
                </NavBtn>
            </div>
            {props.children}
        </div>
    );
});

export default HighScoresForm
