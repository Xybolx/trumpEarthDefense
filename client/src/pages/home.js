import React from 'react';
import useFizzBuzz from '../hooks/useFizzBuzz';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import CenteredColumn from '../components/centeredColumn';

const Home = () => {

    const numbers = useFizzBuzz(100);

    console.log(numbers);
    
    return (
        <div className="container text-center home-earth">
            <Title>React Earth Defense</Title>
            <CenteredColumn className="home-controls">
                <NavBtn to="/instructions">Start</NavBtn>
                <NavBtn to="/scores">Scores</NavBtn>
            </CenteredColumn>
        </div>
    );
};

export default Home;