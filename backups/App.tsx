import { ScreenRoutes } from '@screens/screens.router';
import { Internationalization } from './internationalization';
import { configure } from 'mobx';
// import { AppDemo } from './App-Demo';
import React, { useState } from 'react';
import { Button, ButtonType } from '@library/button';
import {
    MsalProvider,
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
    useMsal,
    useAccount,
} from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest } from './auth/auth-config';
import { ProfileData, callMsGraph, callMsGraphAll } from './auth/graph';
import './App.css';

configure({
    enforceActions: 'never',
});

export const PageLayout = (props: any) => {
    const { instance } = useMsal();
    return (
        <>
            <AuthenticatedTemplate>
                <Button
                    onClick={() => instance.logout()}
                    type={ButtonType.Tertiary}
                >
                    Sign Out
                </Button>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Button onClick={() => instance.loginPopup(loginRequest)}>
                    Sign in using Popup
                </Button>
                <Button onClick={() => instance.loginRedirect(loginRequest)}>
                    Sign in using Redirect
                </Button>
            </UnauthenticatedTemplate>
            <h5 className="sample-header">
                Welcome to the Microsoft Authentication Library For Typescript -
                React Quickstart
            </h5>
            <br />
            <br />
            {props.children}
        </>
    );
};

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        if (account) {
            instance
                .acquireTokenSilent({
                    ...loginRequest,
                    account: account,
                })
                .then((response) => {
                    localStorage.setItem('token', response.accessToken);
                    callMsGraph(response.accessToken).then((response) =>
                        setGraphData(response),
                    );
                    callMsGraphAll(response.accessToken).then((response) => {
                        debugger;
                    });
                });
        }
    }

    return (
        <>
            <h5 className="card-title">
                Welcome {account ? account.name : 'unknown'}
                <ScreenRoutes />
            </h5>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button onClick={RequestProfileData}>
                    Request Profile Information
                </Button>
            )}
        </>
    );
};

const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">
                    Please sign-in to see your profile information.
                </h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

// function App() {
//     const msalInstance = new PublicClientApplication(msalConfig);

//     return (
//         <div className="app">
//             <Internationalization>
//                 <MsalProvider instance={msalInstance}>
//                     <PageLayout>
//                         <MainContent />
//                     </PageLayout>
//                 </MsalProvider>
//             </Internationalization>
//         </div>
//     );
// }

function App() {
    const msalInstance = new PublicClientApplication(msalConfig);

    return (
        <div className="app">
            <Internationalization>
                <MsalProvider instance={msalInstance}>
                    <PageLayout>
                        <MainContent />
                    </PageLayout>
                </MsalProvider>
            </Internationalization>
        </div>
    );
}

export default App;
