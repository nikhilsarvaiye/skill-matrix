import { TopMenu } from '@library/top-menu';
import { SkillScreen } from '@screens/skill';
// import { AppDemo } from './App-Demo';
import './App.css';

function App() {
    return (
        <div className="app">
            <TopMenu />
            <div className="content">
                <SkillScreen />
            </div>
        </div>
    );
}

export default App;
