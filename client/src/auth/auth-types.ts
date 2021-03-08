import { Configuration } from '@azure/msal-browser';

export enum AuthType {
    Azure = 'Azure',
    Custom = 'Custom',
}

export interface IAuthConfiguration extends Configuration {
    type: AuthType;
}
