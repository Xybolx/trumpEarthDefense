import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div style={{ marginTop: 100 }}>
            <div className="container text-center home-earth">
                <h2 className='title'>Round Earth Defense</h2>
                <div className="home-controls col-md-6 offset-md-3">
                    <div>
                        <Link className="btn btn-link btn-lg" to='/instructions'>&nbsp;&nbsp;Start&nbsp;&nbsp;</Link>
                    </div>
                    <div>
                        <Link className="btn btn-link btn-lg" to='/scores'>&nbsp;&nbsp;High Scores&nbsp;&nbsp;</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;