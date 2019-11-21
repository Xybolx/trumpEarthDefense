import React from 'react';
import useFizzBuzz from '../hooks/useFizzBuzz';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';

const Home = () => {

    const numbers = useFizzBuzz(100);

    console.log(numbers);
    
    return (
        <div className="container text-center home-earth">
            <Title>Round Earth Defense</Title>
            <div className="home-controls col-md-6 offset-md-3">
                <NavBtn to="/instructions">Start</NavBtn>
                <NavBtn to="/scores">Scores</NavBtn>
            </div>
        </div>
    );
};

export default Home;