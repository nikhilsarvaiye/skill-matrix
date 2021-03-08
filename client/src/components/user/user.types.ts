import { BaseModel } from '@components/base/models';

export class User extends BaseModel {
    userId: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    name: string = '';
    pictureUrl: string = '';
    designationId: string = '';
    skillWeightagesId: string = '';
}

export class LoggedInUser {
    user: User;
    accessToken: string;
    configuration?: any;

    constructor(user: User, accessToken: string, configuration?: any) {
        this.user = user;
        this.accessToken = accessToken;
        this.configuration = configuration;
    }
}
