import React, { useMemo } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import useCounter from './hooks/useCounter';
import ScoreContext from './context/scoreContext';
import SpecialContext from './context/specialContext';
import Home from './pages/home';
import Initials from './pages/initials';
import HighScores from './pages/HighScores';
import Instructions from './pages/intructions';
import GameContainer from './pages/gameContainer';
import './App.css';

const App = () => {

  const [score, setScore, incScore, incScore100, incScore400, decScore, clearScore] = useCounter(0);

  const scoreValue = useMemo(() => ({ score, setScore, incScore, incScore100, incScore400, decScore, clearScore }), [score, setScore, incScore, incScore100, incScore400, decScore, clearScore]);

  const [special, setSpecial, incSpecial, incSpecial100, incSpecial400, decSpecial, clearSpecial] = useCounter(0);

  const specialValue = useMemo(() => ({ special, setSpecial, incSpecial, incSpecial100, incSpecial400, decSpecial, clearSpecial }), [special, setSpecial, incSpecial, incSpecial100, incSpecial400, decSpecial, clearSpecial]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <SpecialContext.Provider value={specialValue}>
            <ScoreContext.Provider value={scoreValue}>
              <Route>
                <Route exact path="/" component={Home} />
                <Route exact path="/initials" component={Initials} />
                <Route exact path="/scores" component={HighScores} />
                <Route exact path="/instructions" component={Instructions} />
                <Route exact path="/game" component={GameContainer} />
              </Route>
            </ScoreContext.Provider>
          </SpecialContext.Provider>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
