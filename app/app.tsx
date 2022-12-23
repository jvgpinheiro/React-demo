import './styles.scss';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import MainApp from './MainAppComponent/MainAppComponent';
import React from 'react';

function App(): JSX.Element {
    return (
        <StrictMode>
            <MainApp timesClicked={10} onClick={() => console.log('Parent callback')}></MainApp>
        </StrictMode>
    );
}

render(App(), document.querySelector('#app'));
