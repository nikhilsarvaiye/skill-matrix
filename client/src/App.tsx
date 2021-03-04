import React, { useState } from 'react';
import { Observer } from 'mobx-react';
import { ScreenRoutes } from '@screens/screens.router';
import { Internationalization } from './internationalization';
import { configure } from 'mobx';
// import { AppDemo } from './App-Demo';
import { AuthContext } from '@auth';
import './App.css';

configure({
    enforceActions: 'never',
});

const MainContent = () => {
    return (
        <Observer>
            {() => (
                <div className="App">
                    {AuthContext.User ? (
                        <ScreenRoutes />
                    ) : (
                        <h3 style={{ margin: '0.5em' }}>
                            Please sign-in to proceed further
                        </h3>
                    )}
                </div>
            )}
        </Observer>
    );
};

function App() {
    return (
        <div className="app">
            <Internationalization>
                <MainContent />
            </Internationalization>
        </div>
    );
}

export default App;
