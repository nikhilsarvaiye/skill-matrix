import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { configure } from 'mobx';
import { Observer } from 'mobx-react';
import { UserContext } from '@components/user';
import { ScreenRoutes } from '@screens/screens.router';
import { Internationalization } from './../internationalization';
import './App.scss';

configure({
    enforceActions: 'never',
});

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: '2em' }} />);

const MainContent = () => {
    return (
        <Observer>
            {() => (
                <div className="">
                    {UserContext.LoggedInUser ? (
                        <ScreenRoutes
                            user={UserContext.LoggedInUser}
                            theme={UserContext.theme}
                        />
                    ) : (
                        <div style={{ margin: '0.5em' }}>
                            <Spin spinning={true}></Spin>
                            <h3>Loading...</h3>
                        </div>
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
