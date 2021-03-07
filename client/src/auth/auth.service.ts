import {
    AccountInfo,
    AuthenticationResult,
    IPublicClientApplication,
    PublicClientApplication,
} from '@azure/msal-browser';
import { AuthType, IAuthConfiguration, User } from './auth-types';
import { graphConfig, loginRequest } from './auth-config';
import { UserContext } from './auth.instances';

export class AuthService {
    userKey = 'userKey';
    constructor(public config: IAuthConfiguration) {
        const user = this.getUser();
        if (user) {
            UserContext.setUser(user);
        } else {
            this.logIn();
        }
    }

    logIn = async (): Promise<User | null> => {
        try {
            switch (this.config.type) {
                case AuthType.Azure:
                    const instance = new PublicClientApplication(this.config);

                    const authenticationResult = await instance.loginPopup(
                        loginRequest,
                    );
                    const account = this.getAzureAccountFromAuthenticationResult(
                        instance,
                        authenticationResult,
                    );
                    const tokenResponse = await instance.acquireTokenSilent({
                        ...loginRequest,
                        account: account,
                    });
                    const pictureUrl = await this.getAzureUserPicture(
                        tokenResponse.accessToken,
                    );
                    this.setUser(
                        this.getUserFromAzureTokenResponse(
                            tokenResponse,
                            pictureUrl,
                        ),
                    );
                    return UserContext.User;

                default:
                    throw new Error(
                        'Log In not defined for ' + this.config.type,
                    );
            }
        } catch (e) {
            alert('Failed to log in, please try again');
            return null;
        }
    };

    logout = async (): Promise<void> => {
        debugger;
        switch (this.config.type) {
            case AuthType.Azure:
                this.clearAccessToken();
                const instance = new PublicClientApplication(this.config);
                await instance.logout();
                break;
            default:
                throw new Error('Log Out not defined for ' + this.config.type);
        }
    };

    getUser = (): User | null => {
        const value = localStorage.getItem(this.userKey);
        return value ? JSON.parse(value) : null;
    };

    private setUser = (user: User) => {
        localStorage.setItem(this.userKey, JSON.stringify(user));
        UserContext.setUser(user);
    };

    private clearAccessToken = (): void => {
        localStorage.removeItem(this.userKey);
    };

    private getUserFromAzureTokenResponse = (
        tokenResponse: AuthenticationResult,
        pictureUrl: string,
    ): User => {
        return {
            userId: tokenResponse.account?.username,
            name: tokenResponse.account?.name,
            pictureUrl: pictureUrl,
            ...tokenResponse,
        } as any;
    };

    private getAzureAccountFromAuthenticationResult(
        instance: IPublicClientApplication,
        response: AuthenticationResult,
    ) {
        if (response !== null && response.account !== null) {
            return response.account;
        } else {
            return this.getAzureAccount(instance);
        }
    }

    private getAzureAccount(
        instance: IPublicClientApplication,
    ): AccountInfo | undefined {
        console.log(`loadAuthModule`);
        const currentAccounts = instance.getAllAccounts();
        if (currentAccounts === null) {
            // @ts-ignore
            console.log('No accounts detected');
            return undefined;
        }

        if (currentAccounts.length > 1) {
            // TBD: Add choose account code here
            // @ts-ignore
            console.log(
                'Multiple accounts detected, need to add choose account code.',
            );
            return currentAccounts[0];
        } else if (currentAccounts.length === 1) {
            return currentAccounts[0];
        }
    }

    private async getAzureUserPicture(accessToken: string) {
        const headers = new Headers();
        const bearer = `Bearer ${accessToken}`;
        headers.append('Authorization', bearer);
        const options = {
            method: 'GET',
            headers: headers,
        };

        const binaryImageResponse = (await fetch(
            graphConfig.graphPictureUrl,
            options,
        )
            .then((response) => response)
            .catch((error) => console.log(error))) as Response;
        var blob = await binaryImageResponse.blob();
        const url = window.URL || window.webkitURL;
        const blobUrl = url.createObjectURL(blob);
        return blobUrl;
    }
}
