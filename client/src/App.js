import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/home';
import Initials from './pages/initials';
import HighScores from './pages/HighScores';
import Instructions from './pages/intructions';
import GameContainer from './pages/gameContainer';
import Gamepad from './pages/Gamepad';
import './App.css';

const App = () => {

  return (
    <Router>
      <div className="App">
        <Gamepad />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/initials" component={Initials} />
          <Route exact path="/scores" component={HighScores} />
          <Route exact path="/instructions" component={Instructions} />
          <Route exact path="/game" component={GameContainer} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
