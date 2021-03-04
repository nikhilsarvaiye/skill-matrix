import { Configuration, LogLevel } from '@azure/msal-browser';
// import env from 'react-dotenv';

const AzureActiveDirectoryAppClientId: any =
    process.env.REACT_APP_AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID;

export const MSAL_CONFIG: Configuration = {
    auth: {
        clientId: AzureActiveDirectoryAppClientId,
        authority:
            'https://login.microsoftonline.com/8c3dad1d-b6bc-4f8b-939b-8263372eced6',
        // knownAuthorities: [
        //     'api://7cf8fedc-63db-4190-946a-2bed6c2f00e4',
        //     'access_as_user'
        // ]
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true,
    },
    // cache: {
    //     cacheLocation: 'sessionStorage',
    //     storeAuthStateInCookie: false,
    // },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
        },
    },
};
