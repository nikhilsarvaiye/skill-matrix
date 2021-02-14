// import env from 'react-dotenv';
import { Internationalization } from './internationalization';
import { InternationalizationDemo } from './internationalization/internationalization-demo';
import { Button, ButtonHTMLType } from './library/button';
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <Internationalization>
            <div className="App">
                <header className="App-header">
                    {/* <div>{env.ENV}</div> */}
                    <Button htmlType={ButtonHTMLType.Button}>
                        Normal Button
                    </Button>
                    <Button primary>Primary Button</Button>
                    <InternationalizationDemo />
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Check Internationalization Hot reload</p>
                </header>
            </div>
        </Internationalization>
    );
}

export default App;
