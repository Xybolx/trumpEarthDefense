import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ScoreProvider from './context/ScoreProvider';
import SpecialProvider from './context/SpecialProvider';
import ConnectedProvider from './context/ConnectedProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <ScoreProvider>
        <SpecialProvider>
            <ConnectedProvider>
                <App />
            </ConnectedProvider>
        </SpecialProvider>
    </ScoreProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
