import React, { useEffect, useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Title from '../components/title';
import NavBtn from '../components/buttons/NavBtn';
import PageContainer from '../components/pageContainer';
import CenteredColumn from '../components/centeredColumn';
import ScoreContext from '../context/scoreContext';
import useGamepad from '../hooks/useGamepad';
import useInterval from '../hooks/useInterval';
import RoundBtn from '../components/buttons/roundBtn';

const Home = () => {

    const earthRef = useRef();

    const [currentClass, setCurrentClass] = useState("home-earth");

    const classSwitch = () => {
      switch (true) {
        case currentClass === "alternate":
          setCurrentClass("home-earth");
          earthRef.current.className = "home-earth";
          break;
        case currentClass === "home-earth":
          setCurrentClass("alternate");
          earthRef.current.className = "alternate";
          break;
        default:
          console.log(currentClass);
          break;
      }
    };

    useInterval(() => {
      classSwitch();
  }, 3300);

  //   useInterval(() => {
  //     earthRef.current.className = "home-earth";
  // }, 3000);

    let history = useHistory();

    const fake = new Audio("fake.mp3");

    // context
    const { clearScore } = useContext(ScoreContext);
    
    // clear score on mount
    useEffect(() => {
      clearScore();
    }, [clearScore]);
    
    // handle gamepad controls
    const startHandler = () => {
      history.push("/instructions");
    };

    const redirect = () => {
      fake.play();
      history.push("/scores");
    };

    useEffect(() => {
      const hailToTheChief = document.getElementById("hail");
          hailToTheChief.volume = .75;
          hailToTheChief.playbackRate = .15;
          hailToTheChief.play();
  }, []);
    
    const { gamepad } = useGamepad(startHandler);
    
    return (
        <PageContainer className="home-earth-wrapper">
          <audio id="hail" src="hail.mp3" loop />
          <div ref={earthRef} className={currentClass}>
            {gamepad}
            <CenteredColumn>
              <Title>Trump Earth Defense</Title>
            </CenteredColumn>
            <CenteredColumn className="home-controls">
                <small className="m-3">Ready to make Earth great again?</small>
                <div className="text-center">
                  <NavBtn className="mt-3" onClick={startHandler}>I'm Ready!</NavBtn>
                  <NavBtn className="mt-3" onClick={redirect}>High Scores</NavBtn>
                  {/* <RoundBtn isPressed={isPressed} onMouseDown={e => toggleTrue(e)} onMouseUp={e => toggleFalse(e)} /> */}
                </div>
            </CenteredColumn>
          </div>
        </PageContainer>
    );
};

export default Home;