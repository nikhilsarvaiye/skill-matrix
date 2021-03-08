import { action, computed, makeObservable, observable } from 'mobx';
import { AppContext, ThemeType } from '@app';
import { LoggedInUser } from './user.types';

class UserContext {
    LoggedInUser: LoggedInUser = null as any;
    theme: ThemeType = ThemeType.Red;
    constructor() {
        this.theme = AppContext.theme;
        makeObservable(this, {
            LoggedInUser: observable,
            theme: observable,
            isLoggedIn: computed,
            setLoggedInUser: action,
            setTheme: action,
        });
    }

    get isLoggedIn(): boolean {
        return this.LoggedInUser != null;
    }

    setLoggedInUser = (user: LoggedInUser): void => {
        this.LoggedInUser = user;
    };

    setTheme = (theme: ThemeType) => {
        this.theme = theme;
    };
}

const userContext = new UserContext();
export { userContext as UserContext };
