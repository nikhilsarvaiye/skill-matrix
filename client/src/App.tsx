import { ScreenRoutes } from '@screens/screens.router';
import { Internationalization } from './internationalization';
import { configure } from 'mobx';
// import { AppDemo } from './App-Demo';
import './App.css';

configure({
    enforceActions: 'never',
});

function App() {
    return (
        <div className="app">
            <Internationalization>
                <ScreenRoutes />
            </Internationalization>
        </div>
    );
}

export default App;
