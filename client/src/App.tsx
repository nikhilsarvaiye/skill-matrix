import { ScreenRoutes } from '@screens/screens.router';
import { configure } from 'mobx';
// import { AppDemo } from './App-Demo';
import './App.css';

configure({
    enforceActions: 'never',
});

function App() {
    return (
        <div className="app">
            <ScreenRoutes />
        </div>
    );
}

export default App;
