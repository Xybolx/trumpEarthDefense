import React from 'react';
import useFizzBuzz from '../hooks/useFizzBuzz';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import PageContainer from '../components/pageContainer';
import CenteredColumn from '../components/centeredColumn';

const Home = () => {

    const numbers = useFizzBuzz(200);

    console.log(numbers);
    
    return (
        <PageContainer className="home-earth">
            <Title>React Earth Defense</Title>
            <CenteredColumn className="home-controls">
                <NavBtn to="/instructions">Start</NavBtn>
                <NavBtn to="/scores">Scores</NavBtn>
            </CenteredColumn>
        </PageContainer>
    );
};

export default Home;