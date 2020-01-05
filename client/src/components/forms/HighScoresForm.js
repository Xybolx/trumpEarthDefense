import React, { forwardRef } from 'react';
import Btn from '../buttons/Btn';

const HighScoresForm = forwardRef((props, inputRef) => {

    return (
        <div className="input-group input-group-sm sticky-top bg-dark">
            <input
                ref={inputRef}
                id="search"
                name="search"
                value={props.search || ""}
                onChange={props.handleChange}
                type="search"
                className="form-control"
                placeholder="initials or minimum score"
                aria-label="Search Scores"
                aria-describedby="button-search"
                autoComplete="off"
            />
            <div className="input-group-append">
                <Btn 
                    id="button-addon2"
                    className={"border"}
                    onClick={props.handleClearForm}>
                    Reset
                </Btn>
            </div>
            {props.children}
        </div>
    );
});

export default HighScoresForm
