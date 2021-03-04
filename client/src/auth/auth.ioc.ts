import { msalConfig } from './auth-config';
import { AuthType } from './auth-types';
import { AuthService } from './auth.service';
import { AuthContext as AuthContextClass } from './auth.context';

export const AuthContext = new AuthContextClass();

const type = process.env.AUTHENTICATION_TYPE;
export const authService = new AuthService({
    ...msalConfig,
    type: AuthType.Azure,
});
