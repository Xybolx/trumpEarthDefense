import React, { useState, useMemo } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import ScoreContext from './context/scoreContext';
import Home from './components/home';
import Initials from './components/initials';
import HighScores from './components/HighScores';
import Instructions from './components/intructions';
import GameContainer from './components/gameContainer';
import './App.css';

const App = () => {

  const [score, setScore] = useState(0);

  const scoreValue = useMemo(() => ({ score, setScore }), [score, setScore]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <ScoreContext.Provider value={scoreValue}>
            <Route>
              <Route exact path="/" component={Home} />
              <Route exact path="/initials" component={Initials} />
              <Route exact path="/scores" component={HighScores} />
              <Route exact path="/instructions" component={Instructions} />
              <Route exact path="/game" component={GameContainer} />
            </Route>
          </ScoreContext.Provider>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
