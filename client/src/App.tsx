// import env from 'react-dotenv';
import { Internationalization } from './internationalization';
import { TopMenu } from '@library/top-menu';
import { Input } from '@library/input';
import { Dropdown } from '@library/dropdown';
import { Button, ButtonHTMLType, ButtonType } from './library/button';
import './App.css';

function App() {
    return (
        <div className="app">
            <TopMenu />
            <div className="content">
                <Internationalization>
                    {/* <div>{env.ENV}</div> */}
                    <div>
                        <Input name="firstName" />
                        <Dropdown
                            name="gender"
                            data={[
                                {
                                    id: 1,
                                    title: 'Male',
                                },
                                {
                                    id: 2,
                                    title: 'Female',
                                },
                            ]}
                            textField="title"
                            valueField="id"
                        />
                    </div>
                    <div style={{ margin: '20px' }}>
                        <Button
                            type={ButtonType.Primary}
                            htmlType={ButtonHTMLType.Button}
                        >
                            Primary Button
                        </Button>
                        <Button type={ButtonType.Secondary}>
                            Secondary Button
                        </Button>
                        <Button type={ButtonType.Tertiary}>
                            Tertiary Button
                        </Button>
                        <Button type={ButtonType.Quaternary}>
                            Quaternary Button
                        </Button>
                    </div>
                </Internationalization>
            </div>
        </div>
    );
}

export default App;
