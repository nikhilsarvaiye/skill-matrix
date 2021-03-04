import { Configuration } from '@azure/msal-browser';

export enum AuthType {
    Azure = 'Azure',
    Custom = 'Custom',
}

export declare type User = {
    userId: string;
    name: string;
    pictureUrl: string;
    accessToken: string;
};

export interface IAuthConfiguration extends Configuration {
    type: AuthType;
}
