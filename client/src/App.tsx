// import env from 'react-dotenv';
import { Internationalization } from './internationalization';
import { TopMenu } from '@library/top-menu';
import { Button, ButtonHTMLType, ButtonType } from './library/button';
import './App.css';

function App() {
    return (
        <div className="app">
            <TopMenu />
            <div className="content">
                <Internationalization>
                    <header className="App-header">
                        {/* <div>{env.ENV}</div> */}
                        <Button
                            type={ButtonType.Primary}
                            htmlType={ButtonHTMLType.Button}
                        >
                            Normal Button
                        </Button>
                        <Button primary>Primary Button</Button>
                    </header>
                </Internationalization>
            </div>
        </div>
    );
}

export default App;
