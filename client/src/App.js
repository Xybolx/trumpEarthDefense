import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import routes from './components/routes';
import useGamepad from './hooks/useGamepad';
// import GamepadConnected from './components/gamepad/GamepadConnected';
import './App.css';

const App = () => {

  const { gamepadConnected } = useGamepad();

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
          {gamepadConnected}
        </div>
        <Switch>
            {mappedRoutes}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
