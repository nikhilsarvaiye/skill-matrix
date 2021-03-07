import { configure } from 'mobx';
import { Observer } from 'mobx-react';
import { ScreenRoutes } from '@screens/screens.router';
import { Internationalization } from './../internationalization';
import { UserContext } from '@auth';
import './App.scss';

configure({
    enforceActions: 'never',
});

const MainContent = () => {
    return (
        <Observer>
            {() => (
                <div className="">
                    {UserContext.User ? (
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

export function App() {
    return (
        <div className="app">
            <Internationalization>
                <MainContent />
            </Internationalization>
        </div>
    );
}

// export default App;
