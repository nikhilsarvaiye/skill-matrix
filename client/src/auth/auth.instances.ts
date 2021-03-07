import { msalConfig } from './auth-config';
import { AuthType } from './auth-types';
import { AuthService } from './auth.service';
import { UserContext as UserContextClass } from './auth.context';

export const UserContext = new UserContextClass();

const type = process.env.AUTHENTICATION_TYPE;
export const authService = new AuthService({
    ...msalConfig,
    type: AuthType.Azure,
});
