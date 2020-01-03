import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import routes from './components/routes';
import GamepadConnected from './components/GamepadConnected';
import './App.css';

const App = () => {

  return (
    <Router>
      <div className="App">
        <div className="text-left ml-3">
          <GamepadConnected />
        </div>
        <Switch>
          {routes.map((route, index) => (
              <Route key={index} exact path={route.path} component={route.component} />
            ))}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
