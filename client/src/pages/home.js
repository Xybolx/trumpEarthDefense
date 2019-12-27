import React, { useState } from 'react';
import useFizzBuzz from '../hooks/useFizzBuzz';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import PageContainer from '../components/pageContainer';
import CenteredColumn from '../components/centeredColumn';

const Home = () => {

    // state
    const [fake] = useState(new Audio('fake.mp3'));
    const [allFake] = useState(new Audio('all-fake.mp3'))

    // const fake = new Audio('fake.mp3');

    // const allFake = new Audio('all-fake.mp3');

    const numbers = useFizzBuzz(200);

    console.log(numbers);
    
    return (
        <PageContainer className="home-earth">
            <Fake ref={fakeRef} />
            <Allfake ref={allFakeRef} />
            <Title>Trump Earth Defense</Title>
            <CenteredColumn className="home-controls">
                <p>Ready to make Earth great again?</p>
                <NavBtn to="/instructions"><span onClick={() => fake.play()}>I'm Ready!</span></NavBtn>
                <NavBtn to="/scores"><span onClick={() => allFake.play()}>High Scores</span></NavBtn>
            </CenteredColumn>
        </PageContainer>
    );
};

export default Home;