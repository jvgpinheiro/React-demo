import './styles.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainApp from './components/MainAppComponent/MainAppComponent';
import ModalsComponent from './components/ModalsComponent/ModalsComponent';
import React from 'react';
import AppManager from './controls/AppManager';
import { generatePersonID } from './stores/peopleStore/PeopleStore';

function App(): JSX.Element {
    // @ts-ignore
    window.AppManager = AppManager;
    // @ts-ignore
    window.utils = { generatePersonID };

    return (
        <StrictMode>
            <MainApp></MainApp>
            <ModalsComponent></ModalsComponent>
        </StrictMode>
    );
}

const root = createRoot(document.querySelector('#app')!);
root.render(App());
