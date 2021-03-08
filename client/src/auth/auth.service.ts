import { LoggedInUser, UserContext, UserService } from '@components/user';
import { message } from '@library/message';
import { AuthType, IAuthConfiguration } from './auth-types';
import { AzureAuthService } from './azure';

export interface IAuthService {
    logIn: () => Promise<LoggedInUser>;
    logout: () => Promise<void>;
}

export class AuthService {
    userKey = 'userKey';
    authService: IAuthService;
    constructor(
        public config: IAuthConfiguration,
        public userService: UserService,
    ) {
        switch (this.config.type) {
            case AuthType.Azure:
                {
                    this.authService = new AzureAuthService(
                        config,
                        userService,
                    );
                }
                break;
            default:
                throw new Error(
                    'No IAuthService defined for ' + this.config.type,
                );
        }
        const storedUser = this.getUser();
        if (storedUser) {
            this.reLogIn(storedUser)
                .then((user) => {
                    if (user) {
                        UserContext.setLoggedInUser(user);
                    } else {
                        this.logIn();
                    }
                })
                .catch((e) => {
                    this.logIn();
                });
        } else {
            this.logIn();
        }
    }

    reLogIn = async (
        storedUser: LoggedInUser,
    ): Promise<LoggedInUser | null> => {
        const user = await this.userService.get(storedUser.user?.id);
        return user == null
            ? null
            : new LoggedInUser(
                  user,
                  storedUser.accessToken,
                  storedUser.configuration,
              );
    };

    logIn = async (): Promise<void> => {
        try {
            const user = await this.authService.logIn();
            if (user) {
                this.setUser(user);
            }
        } catch (e) {
            const errorMessage = 'Failed to log in, please try again: ';
            message.error(errorMessage, e);
            console.error(errorMessage, e);
        }
    };

    logout = async (): Promise<void> => {
        this.clearAccessToken();
        await this.authService.logout();
    };

    getUser = (): LoggedInUser | null => {
        const value = localStorage.getItem(this.userKey);
        return value ? JSON.parse(value) : null;
    };

    private setUser = (user: LoggedInUser) => {
        localStorage.setItem(this.userKey, JSON.stringify(user));
        UserContext.setLoggedInUser(user);
    };

    private clearAccessToken = (): void => {
        localStorage.removeItem(this.userKey);
    };
}
