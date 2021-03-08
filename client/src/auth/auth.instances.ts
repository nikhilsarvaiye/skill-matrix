import { userService } from '@components/user';
import { msalConfig } from './auth-config';
import { AuthType } from './auth-types';
import { AuthService } from './auth.service';

const type = process.env.AUTHENTICATION_TYPE;
export const authService = new AuthService(
    {
        ...msalConfig,
        type: AuthType.Azure,
    },
    userService,
);
