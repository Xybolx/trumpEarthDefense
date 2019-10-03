import React from 'react';
import { Link } from 'react-router-dom';

const Instructions = () => {

    return (
        <div style={{ marginTop: 100 }}>
            <div className="container text-center home-earth">
                <h2 className='title'>How To Play</h2>
                <div className="instructions col-md-6 offset-md-3">
                    <p>Aliens have invaded the Sol System and you and your Starfighter are the last line of defense! If too many aliens get past you the Earth will be destroyed!</p>
                    <p>Move Up = Scroll Wheel Up</p>
                    <p>Move Down = Scroll Wheel Down</p>
                    <p>Fire Laser = Mouse Click</p>
                    <Link className="btn btn-link btn-lg" to="/game">&nbsp;&nbsp;Start&nbsp;&nbsp;</Link>
                </div>
            </div>
        </div>
    );
};

export default Instructions;