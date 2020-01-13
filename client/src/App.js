import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import routes from './components/routes';
import useGamepad from './hooks/useGamepad';
import GamepadConnected from './components/GamepadConnected';
import './App.css';

const App = () => {

  const { gamepad, connected } = useGamepad();

  const mappedRoutes = routes.map(route => (
    <Route 
      key={route.id} 
      exact path={route.path} 
      component={route.component} 
    />
  ));

  return (
    <Router>
      <div className="App">
        <div className="text-left ml-3">
          {/* {gamepad} */}
          <GamepadConnected connected={connected} />
        </div>
        <Switch>
            {mappedRoutes}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
